import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { UseAuth } from "../firebase/AuthContext"; 
import "../styles/dailyMealTracker.css";

const My_Meals = () => {
  const { user } = UseAuth();
  const [meals, setMeals] = useState({ breakfast: [], lunch: [], dinner: [] });
  const [totals, setTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchMeals = async () => {
      if (!user) return;

      try {
        // const docRef = doc(db, "userMeals", user.uid, "daily", today);
        const mealRef = doc(db, "userMeals", user.uid, "daily", today);

        const docSnap = await getDoc(mealRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          setMeals({
            breakfast: data.breakfast || [],
            lunch: data.lunch || [],
            dinner: data.dinner || [],
          });

          const allFoods = [
            ...(data.breakfast || []),
            ...(data.lunch || []),
            ...(data.dinner || []),
          ];
          const sum = allFoods.reduce(
            (acc, food) => ({
              calories: acc.calories + Number(food.calories || 0),
              protein: acc.protein + Number(food.protein || 0),
              carbs: acc.carbs + Number(food.carbs || 0),
              fat: acc.fat + Number(food.fat || 0),
            }),
            { calories: 0, protein: 0, carbs: 0, fat: 0 }
          );

          setTotals(sum);
        } else {
          setMeals({ breakfast: [], lunch: [], dinner: [] });
          setTotals({ calories: 0, protein: 0, carbs: 0, fat: 0 });
        }
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, [user, today]);

  return (
    <div className="tracker-page">
      <h2>Today Meal ({today})</h2>

      <div className="summary-box">
        <h3>Daily Total</h3>
        <p>Calories: {totals.calories} kcal</p>
        <p>Protein: {totals.protein} g</p>
        <p>Carbs: {totals.carbs} g</p>
        <p>Fat: {totals.fat} g</p>
      </div>

      {["breakfast", "lunch", "dinner"].map((meal) => (
        <div key={meal} className="meal-section">
          <h3 className="meal-title">{meal.toUpperCase()}</h3>
          {meals[meal].length === 0 ? (
            <p className="empty">No items added.</p>
          ) : (
            <div className="meal-grid">
              {meals[meal].map((item, index) => (
                <div className="food-card" key={index}>
                  {item.imageURL && (
                    <img
                      src={item.imageURL}
                      alt={item.name}
                      className="food-img"
                    />
                  )}
                  <h4>{item.name}</h4>
                  <p>
                    <strong>Calories:</strong> {item.calories}
                  </p>
                  <p>
                    <strong>Protein:</strong> {item.protein}g
                  </p>
                  <p>
                    <strong>Carbs:</strong> {item.carbs}g
                  </p>
                  <p>
                    <strong>Fat:</strong> {item.fat}g
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default My_Meals;
