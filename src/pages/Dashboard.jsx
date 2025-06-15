import React from "react";
import { UseAuth } from "../firebase/AuthContext";
import WeeklyPlanStatus from "../components/WeeklyPlanStatus";
import HealthStatusCard from "../components/HealthStatusCard";
import CalorieTracker from "../components/CalorieTracker";
import "../styles/dashboard.css"; // Make sure styles are defined here

const Dashboard = () => {
  const { user, profile } = UseAuth();
  const lockForm = !profile; // blur if profile not filled

  return (
    <div className="dashboard-container">
      <div className={`dashboard-content ${lockForm ? "blurred" : ""}`}>
        <header className="dashboard-header">
          <h1 className="dashboard-title">Welcome to MealMaster</h1>
          <p className="dashboard-subtitle">
            Hello, {user?.displayName || user?.email}
          </p>
        </header>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <WeeklyPlanStatus />
          </div>

          <div className="dashboard-card">
            <HealthStatusCard />
          </div>

          <div className="dashboard-card wide">
            <CalorieTracker />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
