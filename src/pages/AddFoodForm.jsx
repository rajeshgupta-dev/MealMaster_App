// import React, { useState } from "react";
// import { db } from "../firebase/firebaseConfig";
// import { addDoc, collection } from "firebase/firestore";
// import "../styles/addFood.css";

// // tag options
// const TAG_OPTIONS = [
//   "Healthy",
//   "Fat",
//   "Low_Fat",
//   "Fast_Food",
//   "High_Fat",
//   "Homemade",
//   "Drink",
//   "Dessert",
//   "High_Carb",
//   "Simple Meal",
//   "High_Protein",
// ];

// const AddFoodForm = () => {
//   const [form, setForm] = useState({
//     name: "",
//     type: "",
//     calories: "",
//     protein: "",
//     carbs: "",
//     fat: "",
//     servingSize: "",
//     imageURL: "",
//     tags: [],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleTagChange = (tag) => {
//     setForm((prevForm) => {
//       const tags = prevForm.tags.includes(tag)
//         ? prevForm.tags.filter((t) => t !== tag)
//         : [...prevForm.tags, tag];
//       return { ...prevForm, tags };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addDoc(collection(db, "foods"), form);
//       alert("Food added!");
//       setForm({
//         name: "",
//         type: "",
//         calories: "",
//         protein: "",
//         carbs: "",
//         fat: "",
//         servingSize: "",
//         imageURL: "",
//         tags: [],
//       });
//     } catch (error) {
//       alert("Error adding food");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="add-food-page">
//       <h2 className="form-title">Add Food</h2>
//       <form className="add-food-form" onSubmit={handleSubmit}>
//         <input
//           name="name"
//           placeholder="Food Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />

//         <select name="type" value={form.type} onChange={handleChange} required>
//           <option value="">-- Meal Type --</option>
//           <option value="Vegetarian">Vegetarian</option>
//           <option value="lunch">Non-Vegetarian</option>
//         </select>

//         <input
//           name="calories"
//           placeholder="Calories"
//           type="number"
//           value={form.calories}
//           onChange={handleChange}
//         />
//         <input
//           name="protein"
//           placeholder="Protein (g)"
//           type="number"
//           value={form.protein}
//           onChange={handleChange}
//         />
//         <input
//           name="carbs"
//           placeholder="Carbs (g)"
//           type="number"
//           value={form.carbs}
//           onChange={handleChange}
//         />
//         <input
//           name="fat"
//           placeholder="Fat (g)"
//           type="number"
//           value={form.fat}
//           onChange={handleChange}
//         />
//         <input
//           name="servingSize"
//           placeholder="Serving Size"
//           value={form.servingSize}
//           onChange={handleChange}
//         />
//         <input
//           name="imageURL"
//           placeholder="Image URL"
//           value={form.imageURL}
//           onChange={handleChange}
//         />

//         <select>
//           <option value="Vej">Vej</option>
//           <option value="Non-Vej">Non-Vej</option>
//           <option value="Both">Both</option>
//           <option value="Drink">Drink</option>
//         </select>

//         <label style={{ gridColumn: "span 3" }}>
//           <strong>Select Tags:</strong>
//         </label>
//         <div className="tags-checkboxes">
//           {TAG_OPTIONS.map((tag) => (
//             <label key={tag}>
//               <input
//                 type="checkbox"
//                 value={tag}
//                 checked={form.tags.includes(tag)}
//                 onChange={() => handleTagChange(tag)}
//               />
//               {tag}
//             </label>
//           ))}
//         </div>

//         <button type="submit">Add Food</button>
//       </form>
//     </div>
//   );
// };

// export default AddFoodForm;

import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import "../styles/addFood.css";

const TAG_OPTIONS = [
  "Healthy",
  "Fat",
  "Low_Fat",
  "Fast_Food",
  "High_Fat",
  "Homemade",
  "Dessert",
  "High_Carb",
  "Simple Meal",
  "High_Protein",
];

const CATEGORY_OPTIONS = ["Veg", "Non-Veg", "Drink"];

const AddFoodForm = () => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    servingSize: "",
    imageURL: "",
    tags: [],
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleTagChange = (tag) => {
    setForm((prevForm) => {
      const tags = prevForm.tags.includes(tag)
        ? prevForm.tags.filter((t) => t !== tag)
        : [...prevForm.tags, tag];
      return { ...prevForm, tags };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        ...form,
        calories: Number(form.calories),
        protein: Number(form.protein),
        carbs: Number(form.carbs),
        fat: Number(form.fat),
        category: form.category.toLowerCase(),
      };

      await addDoc(collection(db, "foods"), formData);
      alert("Food added!");

      setForm({
        name: "",
        type: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        servingSize: "",
        imageURL: "",
        tags: [],
        category: "",
      });
    } catch (error) {
      alert("Error adding food");
      console.error(error);
    }
  };

  return (
    <div className="add-food-page">
      <h2 className="form-title">Add Food</h2>
      <form className="add-food-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Food Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="">-- Meal Type --</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>

        <input
          name="calories"
          placeholder="Calories"
          type="number"
          value={form.calories}
          onChange={handleChange}
          required
          min="0"
        />
        <input
          name="protein"
          placeholder="Protein (g)"
          type="number"
          value={form.protein}
          onChange={handleChange}
          required
          min="0"
        />
        <input
          name="carbs"
          placeholder="Carbs (g)"
          type="number"
          value={form.carbs}
          onChange={handleChange}
          required
          min="0"
        />
        <input
          name="fat"
          placeholder="Fat (g)"
          type="number"
          value={form.fat}
          onChange={handleChange}
          required
          min="0"
        />
        <input
          name="servingSize"
          placeholder="Serving Size"
          value={form.servingSize}
          onChange={handleChange}
        />
        <input
          name="imageURL"
          placeholder="Image URL"
          value={form.imageURL}
          onChange={handleChange}
          required
          pattern="https?://.+"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat} value={cat.toLowerCase()}>
              {cat}
            </option>
          ))}
        </select>

        <label style={{ gridColumn: "span 3" }}>
          <strong>Select Tags:</strong>
        </label>
        <div className="tags-checkboxes">
          {TAG_OPTIONS.map((tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                value={tag}
                checked={form.tags.includes(tag)}
                onChange={() => handleTagChange(tag)}
              />
              {tag}
            </label>
          ))}
        </div>

        <button type="submit">Add Food</button>
      </form>
    </div>
  );
};

export default AddFoodForm;
