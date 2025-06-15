import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";
import "../styles/navbar.css";

const Navbar = () => {
  const items = [
    {
      key: "contactUs",
      label: <Link to="/MealMaster/contactUs">Contact Us</Link>,
    },

    {
      key: "about",
      label: <Link to="/MealMaster/about">About</Link>,
    },
    {
      key: "home",
      label: <Link to="/MealMaster/dashboard">Home</Link>,
    },
  ];

  return (
    <div className="nav-container">
      <Menu mode="horizontal" items={items} className="menu" />
      <div className="nav-left">
        <UserProfile />
      </div>
    </div>
  );
};

export default Navbar;
