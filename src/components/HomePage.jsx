import React from "react";
import { Link } from "react-router-dom";
import "../styles/homePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>MealMaster</h1>
        <Link to="/login" className="login-button">
          Login
        </Link>
      </header>

      <section className="hero-section">
        <div className="hero-image-container">
          <img
            src="https://thumbs.dreamstime.com/z/healthy-food-design-182795840.jpg"
            className="hero-image"
          />
          <img
            src="https://cdn5.vectorstock.com/i/1000x1000/41/94/healthy-food-design-vector-25334194.jpg"
            alt="Healthy Meal 2"
            className="hero-image"
          />
          <img
            src="https://cdn3.vectorstock.com/i/1000x1000/41/82/healthy-food-design-vector-25334182.jpg"
            alt="Healthy Meal 3"
            className="hero-image"
          />

          <img
            src="https://th.bing.com/th/id/OIP.9wMUXaktR8byeLaD3J8MSgHaES?w=298&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
            alt="Healthy Meal 4"
            className="hero-image"

          />
        </div>
      </section>

      <section className="about-section">
        <h2>Welcome to Your Daily Meal Partner</h2>
        <p>
          MealMaster helps you track your daily nutrition, monitor your health
          condition, calculate your BMI, and suggest improvements based on your
          fitness goals.
        </p>
        <ul>
          <li>Track Meals (Breakfast, Lunch, Dinner)</li>
          <li>Monitor Daily Calories, Fat, Carbs, Sugar</li>
          <li>Calculate BMI and Get Health Feedback</li>
          <li>Choose Meals with Nutritional Value</li>
          <li>Visualize Your Meal History</li>
        </ul>
      </section>

      <section className="features-section">
        <h2>App Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Meal Tracking</h3>
            <p>Add and monitor all your meals per day.</p>
          </div>
          <div className="feature-card">
            <h3>Calorie Calculator</h3>
            <p>Track consumed calories and compare with your fitness goals.</p>
          </div>
          <div className="feature-card">
            <h3>BMI & Health Report</h3>
            <p>
              Get insights about your body condition and suggestions to improve.
            </p>
          </div>
          <div className="feature-card">
            <h3>Personalized Suggestions</h3>
            <p>Smart suggestions based on your health data and goals.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Start Your Health Journey Today</h2>
        <p>
          Sign up now and take control of your nutrition and fitness with
          MealMaster.
        </p>
        <Link to="/signUp">Get Started</Link>
      </section>

      <footer className="home-footer">
        <p>&copy; 2025 MealMaster. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
