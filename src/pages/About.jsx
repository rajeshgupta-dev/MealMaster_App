import React from "react";
import "../styles/about.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About MealMaster</h1>
        <p>Your Personalized Health & Meal Tracking Companion</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>🍽️ What is MealMaster?</h2>
          <p>
            MealMaster is an intelligent and easy-to-use health and nutrition
            tracking application. It helps users maintain a healthy lifestyle by
            allowing them to plan meals, track food intake, monitor calories,
            generate health reports, and get food suggestions based on their BMI
            and fitness goals.
          </p>
        </section>

        <section className="about-section">
          <h2>🔑 Key Features</h2>
          <ul>
            <li>✔️ Smart meal planning: breakfast, lunch, dinner logging</li>
            <li>✔️ Automatic calorie tracking with food suggestions</li>
            <li>✔️ Personalized health report with BMI analysis</li>
            <li>
              ✔️ Profile-based diet customization (vegan, vegetarian, etc.)
            </li>
            <li>✔️ Daily and historical meal tracking with download options</li>
            <li>✔️ PDF & Excel reports for meals and health data</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>💡 Why Choose MealMaster?</h2>
          <p>
            Whether you're aiming to lose weight, gain muscle, maintain a
            healthy lifestyle, or just want to eat better, MealMaster is built
            to support your journey. With personalized recommendations,
            easy-to-use meal logs, and real-time calorie analysis, you stay in
            control of your health every day.
          </p>
        </section>

        <section className="about-section">
          <h2>📈 Built With Modern Technology</h2>
          <ul>
            <li>⚛️ React.js for fast, responsive UI</li>
            <li>🔥 Firebase for authentication & real-time database</li>
            <li>📄 HTML2PDF & XLSX.js for downloadable reports</li>
            <li>🎯 Secure & personalized user experience</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>🌱 Our Mission</h2>
          <p>
            At MealMaster, our mission is to make healthy living simple,
            enjoyable, and accessible to everyone. We believe that a small step
            towards better eating can make a big difference in life.
          </p>
        </section>
      </div>

      <footer className="about-footer">
        <p>
          © {new Date().getFullYear()} MealMaster | Made with ❤️ for your health
        </p>
      </footer>
    </div>
  );
};

export default About;
