import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { UseAuth } from "../context/AuthContext";

const RegisterForm = () => {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in first");
      return;
    }

    try {
      await setDoc(doc(db, "user_profiles", user.uid), form);
      alert("Profile saved!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="age" value={form.age} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default RegisterForm;
