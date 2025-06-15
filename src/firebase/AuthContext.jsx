import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

// Create context
const AuthContext = createContext();

// Hook to use auth context
export const UseAuth = () => useContext(AuthContext);

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [foods, setFoods] = useState([]);
  const [bmi, setBmi] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const docRef = doc(db, "user_profiles", firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);

          // BMI calculation
          const height = parseFloat(data.height); // in cm
          const weight = parseFloat(data.weight); // in kg

          if (height && weight) {
            const heightInMeters = height / 100;
            const calculatedBmi = weight / (heightInMeters * heightInMeters);
            setBmi(parseFloat(calculatedBmi.toFixed(2)));
          } else {
            setBmi(null);
          }
        } else {
          setUserData(null);
          setBmi(null);
        }
      } else {
        setUserData(null);
        setBmi(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch food list
  useEffect(() => {
    const fetchFoods = async () => {
      const snapshot = await getDocs(collection(db, "foods"));
      const foodList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFoods(foodList);
    };

    fetchFoods();
  }, []);

  // Auth functions
  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const contextValue = {
    user,
    userData,
    foods,
    bmi,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
