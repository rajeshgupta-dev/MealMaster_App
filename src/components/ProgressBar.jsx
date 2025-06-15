import React from "react";
const ProgressBar = () => {
  return (
    <div className="card">
      <h3>Nutrition Goals</h3>
      <p>Calories: 1200 / 2000</p>
      <div className="progress-bar">
        <div className="progress" style={{ width: "60%" }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
