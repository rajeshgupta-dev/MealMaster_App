import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const NutrientCircle = ({ label, value, target, color }) => {
  const percentage = Math.min((value / target) * 100, 100);

  return (
    <div style={{ width: 120, textAlign: "center" }}>
      <CircularProgressbar
        value={percentage}
        text={`${Math.round(percentage)}%`}
        styles={buildStyles({
          pathColor: color,
          textColor: "#333",
          trailColor: "#eee",
          strokeLinecap: "round",
        })}
      />
      <p style={{ marginTop: 8, fontWeight: 600 }}>{label}</p>
      <p style={{ fontSize: 12 }}>{value} / {target}g</p>
    </div>
  );
};

const CalorieTracker = () => {
  const [nutrients, setNutrients] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [targets, setTargets] = useState({ calories: 2000, protein: 60, carbs: 250, fat: 70 });
  const [loading, setLoading] = useState(true);

  const userId = auth.currentUser?.uid;
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const mealDoc = await getDoc(doc(db, "userMeals", userId, "daily", today));
        if (mealDoc.exists()) {
          const meals = mealDoc.data();
          const allMeals = [...(meals.breakfast || []), ...(meals.lunch || []), ...(meals.dinner || [])];

          const totals = allMeals.reduce(
            (sum, item) => {
              return {
                calories: sum.calories + (item.calories || 0),
                protein: sum.protein + (item.protein || 0),
                carbs: sum.carbs + (item.carbs || 0),
                fat: sum.fat + (item.fat || 0),
              };
            },
            { calories: 0, protein: 0, carbs: 0, fat: 0 }
          );

          setNutrients(totals);
        }
      } catch (err) {
        console.error("Error fetching nutrients:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  if (loading) return <p>Loading daily nutrition summary...</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        gap: "20px",
        padding: "20px",
        background: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <NutrientCircle label="Calories" value={nutrients.calories} target={targets.calories} color="#f97316" />
      <NutrientCircle label="Protein" value={nutrients.protein} target={targets.protein} color="#3b82f6" />
      <NutrientCircle label="Carbs" value={nutrients.carbs} target={targets.carbs} color="#10b981" />
      <NutrientCircle label="Fat" value={nutrients.fat} target={targets.fat} color="#ef4444" />
    </div>
  );
};

export default CalorieTracker;
