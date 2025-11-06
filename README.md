# 🥗 MealMaster – Nutrition & Meal Planner

MealMaster is a web-based application designed to help users **plan their meals**, **track daily nutrition**, and **achieve fitness goals** through smart meal planning and calorie tracking.

This project was developed as part of **Masai School’s Build Week**, where I worked **solo** to design, develop, and deploy a complete end-to-end React application integrated with **Firebase Authentication**.

---

### 🌐 Live Demo

🔗 [View Live Project](https://rajeshgupta-dev.github.io/MealMaster_App/) *(Tip: right-click → Open in new tab)*




---

## 🔍 About the Project

MealMaster empowers users to:

- 🍽️ **Create personalized dietary profiles**
- 🧾 **Plan weekly meals** and organize recipes
- 🥦 **Track calories and macronutrients**
- 🛒 **Generate smart grocery lists**
- ⏰ **Set reminders for meal prep**
- 📊 **Monitor nutrition goals and progress**
- 📚 **Explore healthy recipes** with detailed nutritional information

This application promotes **healthier eating habits** through personalized meal planning and nutrition tracking.

---

## 🎯 Built During

- 🏫 **Masai School Build Week**  
- 👨‍💻 **Solo Project**  
- 📅 **June 2025**

---

## 🛠️ Tech Stack

- ⚛️ **React.js** – UI development  
- 🔥 **Firebase** – Authentication & database  
- 🎨 **CSS3** – Styling and layout  
- 🚀 **Vite** – Build tool for faster development  
- 📱 **Responsive Design** – Mobile-first approach  

---

## 📁 Folder Structure

```

src/
├── components/        # Reusable UI components (Navbar, MealCard, etc.)
├── firebase/          # Firebase configuration
├── pages/             # Page components (Home, Dashboard, Login, etc.)
├── styles/            # Custom CSS styles
├── App.jsx            # Main app component
├── main.jsx           # Application entry point
└── index.css          # Global styles

````

---

## 🔧 Setup Instructions

Follow these steps to run the project locally 👇

### 1. Clone the Repository

```bash
git clone https://github.com/rajeshgupta-dev/MealMaster_App.git
cd MealMaster_App
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

* Go to [Firebase Console](https://console.firebase.google.com/)
* Create a new project
* Enable **Email/Password Authentication**
* Get your Firebase config and replace it in `src/firebase/config.js`:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### 4. Start the Development Server

```bash
npm run dev
```

Visit 👉 **[http://localhost:5173](http://localhost:5173)**

---

## 🚀 Features

| Feature                    | Description                                         |
| -------------------------- | --------------------------------------------------- |
| 🔐 **User Authentication** | Login & signup via Firebase                         |
| 🧾 **Meal Planning**       | Create and edit daily or weekly meal plans          |
| 🥦 **Nutrition Tracking**  | Calorie and macro tracker for each meal             |
| 🛒 **Grocery List**        | Auto-generated shopping list based on planned meals |
| 🌓 **Dark/Light Mode**     | Theme toggle for better user experience             |
| 📱 **Responsive UI**       | Works seamlessly on mobile, tablet, and desktop     |

---

## 📸 Screenshots

| Dashboard View                                                                                                            | Meal Planner                                                                                                                 | Nutrition Stats                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| <img width="950" alt="Dashboard" src="https://github.com/user-attachments/assets/e4f3a060-5f48-4cc9-a6a2-112b5ac8b22f" /> | <img width="945" alt="Meal Planner" src="https://github.com/user-attachments/assets/74d142c6-0178-4fed-baf8-3598df997645" /> | <img width="941" alt="Nutrition Stats" src="https://github.com/user-attachments/assets/1a7303c4-dc3d-4583-8f22-59f00a1553d9" /> |

---

## ✨ Future Enhancements

* [ ] Integration with third-party recipe APIs
* [ ] User progress charts (calorie trends, BMI tracking)
* [ ] Multi-language support
* [ ] Google sign-in authentication

---

## 🙌 Contributor

👨‍💻 **Rajesh Kumar Gupta**
🎓 *Masai School — Full Stack Web Developer (MERN)*

---

## 🧾 Repository

📦 [GitHub Repository](https://github.com/rajeshgupta-dev/MealMaster_App)

---
