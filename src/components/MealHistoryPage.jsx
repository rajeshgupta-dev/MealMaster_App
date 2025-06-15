import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../styles/mealHistoryPage.css";

const MealHistoryPage = () => {
  const [allMealDocs, setAllMealDocs] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const calorieGoal = 2000;

  const userId = auth.currentUser?.uid;

  const fetchAllMeals = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const dailyRef = collection(db, "userMeals", userId, "daily");
      const snapshot = await getDocs(dailyRef);

      const mealEntries = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        const date = docSnap.id;
        const allFoods = [
          ...(data.breakfast || []),
          ...(data.lunch || []),
          ...(data.dinner || []),
        ];
        const totals = allFoods.reduce(
          (acc, food) => ({
            calories: acc.calories + Number(food.calories || 0),
            protein: acc.protein + Number(food.protein || 0),
            carbs: acc.carbs + Number(food.carbs || 0),
            fat: acc.fat + Number(food.fat || 0),
          }),
          { calories: 0, protein: 0, carbs: 0, fat: 0 }
        );
        return { date, meals: data, totals };
      });

      setAllMealDocs(mealEntries.sort((a, b) => b.date.localeCompare(a.date)));
    } catch (err) {
      console.error("Error loading meal history:", err);
      setStatus("Error loading meal history.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllMeals();
  }, []);

  const formatTime = (timestamp) => {
    if (!timestamp) return "—";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const filteredMeals = selectedDate
    ? allMealDocs.filter((entry) => entry.date === selectedDate)
    : allMealDocs;

  return (
    <div className="tracker-page">
      <h2 className="title">Meal History Tracker</h2>

      <div className="date-control">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button onClick={() => setSelectedDate("")} className="fetch-btn">
          Clear Filter
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {status && <p className="error">{status}</p>}

      {filteredMeals.map((entry, idx) => (
        <div key={idx} className={`meal-history-card gradient-${idx % 5}`}>
          <h3>{entry.date}</h3>
          <div className="summary-box">
            <p><strong>Calories:</strong> {entry.totals.calories} kcal</p>
            <p><strong>Protein:</strong> {entry.totals.protein} g</p>
            <p><strong>Carbs:</strong> {entry.totals.carbs} g</p>
            <p><strong>Fat:</strong> {entry.totals.fat} g</p>
            <p>
              <strong>Status:</strong>{" "}
              {entry.totals.calories > calorieGoal
                ? `Surplus +${entry.totals.calories - calorieGoal}`
                : entry.totals.calories < calorieGoal
                ? `Deficit ${calorieGoal - entry.totals.calories}`
                : "Goal Met"}
            </p>
          </div>

          {["breakfast", "lunch", "dinner"].map((meal) => (
            <div
              key={meal}
              className={`meal-section meal-${meal}`}
            >
              <h4>
                {meal.toUpperCase()}{" "}
                <span className="meal-time">
                  ({formatTime(entry.meals[meal + "Time"])})
                </span>
              </h4>

              {entry.meals[meal]?.length ? (
                <div className="meal-grid">
                  {entry.meals[meal].map((item, index) => (
                    <div className="food-card" key={index}>
                      {item.imageURL && (
                        <img
                          src={item.imageURL}
                          alt={item.name}
                          className="food-img"
                        />
                      )}
                      <h4>{item.name}</h4>
                      <p>Calories: {item.calories}</p>
                      <p>Protein: {item.protein}g</p>
                      <p>Carbs: {item.carbs}g</p>
                      <p>Fat: {item.fat}g</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No items logged for {meal}.</p>
              )}
            </div>
          ))}
        </div>
      ))}

      {!filteredMeals.length && <p>No meal history available.</p>}
    </div>
  );
};

export default MealHistoryPage;
