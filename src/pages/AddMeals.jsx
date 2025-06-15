import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { UseAuth } from "../firebase/AuthContext";
import "../styles/addMeals.css";

const AddMeals = () => {
  const { user, foods, bmi } = UseAuth();
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showRecommended, setShowRecommended] = useState(false);
  const [selectedFitOption, setSelectedFitOption] = useState("all");

  useEffect(() => {
    setFilteredFoods(foods);
  }, [foods]);

  useEffect(() => {
    if (showRecommended && bmi && foods.length) {
      let suggestedFoods = [];

      if (bmi < 18.5) {
        suggestedFoods = foods.filter(food =>
          food.tags?.includes("High_Fat") || food.tags?.includes("Fast_Food")
        );
      } else if (bmi >= 25) {
        suggestedFoods = foods.filter(food =>
          food.tags?.includes("Low_Fat") || food.tags?.includes("Healthy")
        );
      } else {
        suggestedFoods = foods.filter(food =>
          food.tags?.includes("Healthy") || food.tags?.includes("Homemade")
        );
      }

      if (selectedFitOption !== "all") {
        suggestedFoods = suggestedFoods.filter(food => food.category === selectedFitOption);
      }

      setFilteredFoods(suggestedFoods);
    }
  }, [showRecommended, bmi, foods, selectedFitOption]);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredFoods(foods);
    } else {
      const keyword = search.toLowerCase();
      const filtered = foods.filter(food =>
        food.name.toLowerCase().includes(keyword)
      );
      setFilteredFoods(filtered);
    }
  }, [search, foods]);

  const handleFilter = (type) => {
    setFilterType(type);
    if (type === "all") {
      setFilteredFoods(foods);
    } else {
      const filtered = foods.filter(food => food.tags?.includes(type));
      setFilteredFoods(filtered);
    }
  };

  const handleCategoryFilter = (category) => {
    const filtered = foods.filter(food => food.category === category);
    setFilteredFoods(filtered);
    setFilterType(category);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddToMeal = async (food, mealType) => {
    if (!user) {
      alert("Please login to add meals");
      return;
    }

    const userId = user.uid;
    const today = new Date().toISOString().split("T")[0];
    const mealRef = doc(db, "userMeals", userId, "daily", today);

    const confirm = window.confirm(`Add "${food.name}" to ${mealType}?`);
    if (!confirm) return;

    try {
      const mealSnap = await getDoc(mealRef);
      const existingData = mealSnap.exists() ? mealSnap.data() : {};
      const existingItems = existingData[mealType] || [];

      if (existingItems.some(item => item.name === food.name)) {
        alert(`"${food.name}" is already added to ${mealType}.`);
        return;
      }

      const updatedItems = [...existingItems, food];

      await setDoc(mealRef, {
        ...existingData,
        [mealType]: updatedItems,
        [mealType + "Time"]: new Date().toISOString(),
      });

      alert(`Added "${food.name}" to ${mealType}`);
    } catch (err) {
      console.error(err);
      alert("Failed to add food");
    }
  };

  const tagOptions = ["all", ...new Set(foods.flatMap(f => f.tags || []))];
  const categoryOptions = ["veg", "non-veg", "drink"];
  const fitOptions = ["all", "veg", "non-veg", "drink"];

  return (
    <div className="food-list-page">
      <h2 className="food-list-title">What you want to Eat Today</h2>

      <p className="bmi-info">Your BMI: <strong>{bmi ? bmi.toFixed(1) : "Calculating..."}</strong></p>

      <div className="filter-bar">
        <div className="fit-selector">
          <label htmlFor="fitOption">Diet Fit:</label>
          <select
            id="fitOption"
            value={selectedFitOption}
            onChange={(e) => setSelectedFitOption(e.target.value)}
          >
            {fitOptions.map(opt => (
              <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setShowRecommended(true)}
          className="recommend-btn"
        >
          Show Recommended Foods
        </button>

        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>

      <div className="filters">
        {tagOptions.map(tag => (
          <button
            key={tag}
            onClick={() => handleFilter(tag)}
            className={filterType === tag ? "active" : ""}
          >
            {tag.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="category-filters">
        {categoryOptions.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryFilter(category)}
            className={filterType === category ? "active" : ""}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="food-grid">
        {filteredFoods.map((food) => (
          <div className="food-card" key={food.id}>
            {food.imageURL && (
              <img src={food.imageURL} alt={food.name} className="food-image" />
            )}
            <h3>{food.name}</h3>
            <p><strong>Type:</strong> {food.type}</p>
            <p><strong>Calories:</strong> {food.calories}</p>
            <p><strong>Protein:</strong> {food.protein}</p>
            <p><strong>Carbs:</strong> {food.carbs}</p>
            <p><strong>Fat:</strong> {food.fat}</p>
            <p><strong>Tags:</strong> {food.tags?.join(", ")}</p>
            <p><strong>Category:</strong> {food.category}</p>
            <div className="meal-buttons">
              <button onClick={() => handleAddToMeal(food, "breakfast")}>Breakfast</button>
              <button onClick={() => handleAddToMeal(food, "lunch")}>Lunch</button>
              <button onClick={() => handleAddToMeal(food, "dinner")}>Dinner</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMeals;
