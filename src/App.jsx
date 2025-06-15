import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import HealthSuggestion from "./components/My_Meals";
import MainLayout from "./components/MainLayout";
import PrivateRoute from "./firebase/PrivateRoute";
import Register from "./pages/Register";
import HealthReport from "./components/HealthReport";
import AddFoodForm from "./pages/AddFoodForm";
import AddMeals from "./pages/AddMeals";
import My_Meals from "./components/My_Meals";
import MealHistoryPage from "./components/MealHistoryPage";
import MealPlanner from "./pages/MealPlanner";
import ContactUs from "./pages/ContactUs";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/signUp" element={<Auth />} />

      {/* Protected Routes */}
      <Route
        path="/MealMaster"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="meals" element={<My_Meals />} />
        <Route path="addMeals" element={<AddMeals />} />
        <Route path="addFood" element={<AddFoodForm />} />
        <Route path="HealthReport" element={<HealthReport />} />
        <Route path="mealHistory" element={<MealHistoryPage />} />
        <Route path="mealPlaner" element={<MealPlanner />} />
        <Route path="contactUs" element={<ContactUs />} />
        <Route path="about" element={<About />} />
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
