import React, { useState, useEffect } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { UseAuth } from "../firebase/AuthContext";
import { Link } from "react-router-dom";

const getWeekDates = () => {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday
  return Array.from({ length: 7 }, (_, i) =>
    format(addDays(start, i), "yyyy-MM-dd")
  );
};

const WeeklyPlanStatus = () => {
  const { user } = UseAuth();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const checkMealPlan = async () => {
      try {
        const weekId = format(new Date(), "yyyy-MM-dd");
        const weekDates = getWeekDates();
        const ref = doc(db, "users", user.uid, "mealPlans", weekId);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          const allDaysFilled = weekDates.every(
            (day) => data[day] && data[day].length > 0
          );
          setStatus(allDaysFilled ? "complete" : "incomplete");
        } else {
          setStatus("incomplete");
        }
      } catch (err) {
        console.error("Error checking plan:", err);
        setStatus("incomplete");
      } finally {
        setLoading(false);
      }
    };

    checkMealPlan();
  }, [user]);

  if (loading) return <p>Checking your weekly meal plan...</p>;

  return (
    <div
      className="weekly-status-box"
      style={{
        marginTop: "20px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#fff",
      }}
    >
      {status === "complete" ? (
        <p style={{ color: "green", fontWeight: "bold" }}>
          ✅ Great! You've planned your entire week's meals.
          <br />
          Keep up the good work!
          <br />
          👍
        </p>
      ) : (
        <p style={{ color: "red", fontWeight: "bold" }}>
          ⚠️ You haven't planned all days yet.
          {/* <br /> */}
          <Link
            to="/MealMaster/mealPlaner"
            style={{
              color: "red",
              textDecoration: "underline",
              marginLeft: "6px",
            }}
          >
            Go to Meal Planner
          </Link>
        </p>
      )}
    </div>
  );
};

export default WeeklyPlanStatus;
