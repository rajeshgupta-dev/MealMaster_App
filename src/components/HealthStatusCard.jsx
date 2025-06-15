import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import "../styles/healthStatusCard.css";

const HealthStatusCard = () => {
  const [userData, setUserData] = useState(null);
  const [calories, setCalories] = useState(0);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0];
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const userDoc = await getDoc(doc(db, "user_profiles", userId));
        if (userDoc.exists()) {
          const profile = userDoc.data();
          setUserData(profile);

          const mealsSnap = await getDoc(doc(db, "userMeals", userId, "daily", today));
          if (mealsSnap.exists()) {
            const meals = mealsSnap.data();
            const all = [...(meals.breakfast || []), ...(meals.lunch || []), ...(meals.dinner || [])];
            const total = all.reduce((sum, item) => sum + (item.calories || 0), 0);
            setCalories(total);
          }
        }
      } catch (err) {
        console.error("Failed to fetch health data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const calculateBMI = ({ height, weight }) => {
    const h = (height * 30.48) / 100;
    const bmi = (weight / (h * h)).toFixed(1);
    let label = "";
    if (bmi < 18.5) label = "Underweight";
    else if (bmi <= 24.9) label = "Fit";
    else label = "Overweight";
    return { bmi, label };
  };

  const getTargetCalories = ({ age, weight, height }) => {
    const bmr = 10 * weight + 6.25 * (height * 30.48) - 5 * age + 5;
    return Math.round(bmr * 1.2);
  };

  if (loading) return <div className="health-card">Loading...</div>;
  if (!userData) return <div className="health-card">No data found.</div>;

  const { bmi, label } = calculateBMI(userData);
  const target = getTargetCalories(userData);

  return (
    <div className={`health-card health-${label.toLowerCase()}`}>
      <h3>Health Overview</h3>
      <p><strong>BMI:</strong> {bmi} ({label})</p>
      <p><strong>Calories Today:</strong> {calories} / {target} kcal</p>
      <p>
        <strong>Status:</strong>{" "}
        {calories >= target ? "Target Reached 🎯" : "Keep Going 💪"}
      </p>
    </div>
  );
};

export default HealthStatusCard;
