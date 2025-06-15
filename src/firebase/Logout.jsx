import React from "react";
import { UseAuth } from "../firebase/AuthContext"; 
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = UseAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    let isConfirmed = window.confirm("Are you sure you want to logout?");
    if (isConfirmed == false) return;
    try {
      await logout();
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <button onClick={handleLogout} style={styles.button}>
      Logout
    </button>
  );
};

const styles = {
  button: {
    backgroundColor: "#ef4444",
    color: "#fff",
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default LogoutButton;
