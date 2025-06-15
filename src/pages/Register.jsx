import React, { useState } from "react";
import "../styles/register.css";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { UseAuth } from "../firebase/AuthContext";

const Register = () => {
  const { user } = UseAuth();
  const [form, setForm] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "",
    diet: "",
    goal: "",
    condition: "",
    activity: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await setDoc(doc(db, "user_profiles", user.uid), form);
      // alert("Profile saved!");
      alert("Form submitted successfully!");

      // Reset form
      setForm({
        age: "",
        height: "",
        weight: "",
        gender: "",
        diet: "",
        goal: "",
        condition: "",
        activity: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <h2 className="form-title">Complete the Form</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-row">
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={form.height}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={form.weight}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">-- Gender --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <select
            name="diet"
            value={form.diet}
            onChange={handleChange}
            required
          >
            <option value="">-- Diet Preference --</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
          </select>

          <select
            name="goal"
            value={form.goal}
            onChange={handleChange}
            required
          >
            <option value="">-- Goal --</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="weight-gain">Weight Gain</option>
            <option value="muscle-gain">Muscle Gain</option>
            <option value="stay-fit">Stay Fit</option>
          </select>
        </div>

        <div className="form-row">
          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
            required
          >
            <option value="">-- Health Condition --</option>
            <option value="none">None</option>
            <option value="diabetes">Diabetes</option>
            <option value="food-allergy">Food Allergy</option>
            <option value="cholesterol">Cholesterol</option>
          </select>

          <select
            name="activity"
            value={form.activity}
            onChange={handleChange}
            required
          >
            <option value="">-- Daily Activity --</option>
            <option value="office-desk">Office Work</option>
            <option value="gym">Gym</option>
            <option value="field-work">Field Work</option>
            <option value="student">Student</option>
            <option value="homemaker">Homemaker</option>
            <option value="retired">Retired</option>
            <option value="manual-labor">Manual Labor</option>
          </select>
        </div>

        <div className="form-action">
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
