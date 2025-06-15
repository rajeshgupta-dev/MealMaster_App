import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import html2pdf from "html2pdf.js";
import "../styles/healthReport.css";
import { UseAuth } from "../firebase/AuthContext";

const HealthReport = () => {
  const { user } = UseAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [caloriesEaten, setCaloriesEaten] = useState(0);
  const [yesterdayGroupedMeals, setYesterdayGroupedMeals] = useState({});
  const [yesterdayTotalCalories, setYesterdayTotalCalories] = useState(0);

  const userId = user?.uid;
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const userDoc = await getDoc(doc(db, "user_profiles", userId));
        if (userDoc.exists()) {
          const profileData = userDoc.data();
          setUserProfile({ id: userDoc.id, ...profileData });

          const todayDoc = await getDoc(doc(db, "userMeals", userId, "daily", today));
          if (todayDoc.exists()) {
            const meals = todayDoc.data();
            const allMeals = [...(meals.breakfast || []), ...(meals.lunch || []), ...(meals.dinner || [])];
            setCaloriesEaten(allMeals.reduce((sum, item) => sum + (item.calories || 0), 0));
          }

          const yestDoc = await getDoc(doc(db, "userMeals", userId, "daily", yesterday));
          if (yestDoc.exists()) {
            const data = yestDoc.data();
            const grouped = {};
            let total = 0;

            ["breakfast", "lunch", "dinner"].forEach(type => {
              const meals = data[type] || [];
              if (meals.length > 0) {
                grouped[type] = {
                  foods: meals.map(item => item.name).join(", "),
                  calories: meals.reduce((sum, item) => sum + (item.calories || 0), 0)
                };
                total += grouped[type].calories;
              }
            });

            setYesterdayGroupedMeals(grouped);
            setYesterdayTotalCalories(total);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const calculateBMI = (user) => {
    const heightMeters = (user.height * 30.48) / 100;
    const bmi = (user.weight / (heightMeters * heightMeters)).toFixed(1);
    let suggestion = "", status = "";

    if (bmi < 18.5) {
      const idealWeight = (18.5 * heightMeters * heightMeters).toFixed(1);
      suggestion = `Underweight. Gain ~${(idealWeight - user.weight).toFixed(1)} kg.`; status = "underweight";
    } else if (bmi <= 24.9) {
      suggestion = "Fit! Maintain your lifestyle."; status = "fit";
    } else {
      const idealWeight = (24.9 * heightMeters * heightMeters).toFixed(1);
      suggestion = `Overweight. Lose ~${(user.weight - idealWeight).toFixed(1)} kg.`; status = "overweight";
    }

    return { bmi, suggestion, status };
  };

  const getDailyCalorieTarget = (user) => {
    const bmr = 10 * user.weight + 6.25 * (user.height * 30.48) - 5 * user.age + 5;
    return Math.round(bmr * 1.2);
  };

  const downloadPDF = () => {
    const element = document.getElementById("health-report");
    const options = {
      margin: 0.3,
      filename: `Health_Report_${user?.displayName || user?.email}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(options).from(element).save();
  };

  if (loading) return <p className="bmi-page">Loading...</p>;
  if (!userProfile) return <p className="bmi-page">No profile found for this user.</p>;

  const { bmi, suggestion, status } = calculateBMI(userProfile);
  const calorieTarget = getDailyCalorieTarget(userProfile);

  return (
    <div className="bmi-page">
      <h2>Your Health Report</h2>
      <p className="user-name">👤 {user?.displayName || user?.email}</p>
      <button className="pdf-download-btn" onClick={downloadPDF}>📄 Download PDF</button>

      <div id="health-report">
        <div className="bmi-card">
          <p><strong>Name/Email:</strong> {user?.displayName || user?.email}</p>
          <p><strong>Age:</strong> {userProfile.age}</p>
          <p><strong>Height:</strong> {userProfile.height} ft</p>
          <p><strong>Weight:</strong> {userProfile.weight} kg</p>
          <p><strong>BMI:</strong> {bmi}</p>
          <p><strong>Suggestion:</strong> {suggestion}</p>
          <p><strong>Calories Consumed Today:</strong> {caloriesEaten} kcal</p>
          <p><strong>Daily Calorie Target:</strong> {calorieTarget} kcal</p>
          <p><strong>Status:</strong> {caloriesEaten >= calorieTarget ? 'Goal Reached 🎯' : 'Keep Going 💪'}</p>
        </div>

        <div className="bmi-card">
          <h3>Recommended Indian Foods:</h3>
          <ul>
            {status === "underweight" && (
              <>
                <li>Bananas, Chikki, Peanut Butter</li>
                <li>Paneer, Rice, Paratha with ghee</li>
                <li>Whole wheat roti, aloo sabji, khichdi</li>
              </>
            )}
            {status === "fit" && (
              <>
                <li>Dal, Roti, Sabji, Curd</li>
                <li>Brown rice, vegetables, sprouts</li>
                <li>Seasonal fruits, lassi, coconut water</li>
              </>
            )}
            {status === "overweight" && (
              <>
                <li>Boiled vegetables, salad, cucumber</li>
                <li>Grilled paneer/chicken, dal without tadka</li>
                <li>Fruits (apple, guava), lemon water</li>
              </>
            )}
          </ul>
        </div>

        <div className="bmi-card">
          <h3>🍽️ Yesterday's Food Summary</h3>
          {Object.keys(yesterdayGroupedMeals).length > 0 ? (
            <table className="food-history-table">
              <thead>
                <tr>
                  <th>Meal Type</th>
                  <th>Foods</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(yesterdayGroupedMeals).map(([type, data], index) => (
                  <tr key={index}>
                    <td>{type.charAt(0).toUpperCase() + type.slice(1)}</td>
                    <td>{data.foods}</td>
                    <td>{data.calories} kcal</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td colSpan="2"><strong>Total Calories Consumed</strong></td>
                  <td><strong>{yesterdayTotalCalories} kcal</strong></td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No meals recorded for yesterday.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthReport;
