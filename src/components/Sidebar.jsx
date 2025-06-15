import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  HeartOutlined,
  HeatMapOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";


const Sidebar = ({ collapsed }) => {
  const items = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/MealMaster/dashboard">Dashboard</Link>,
    },
    {
      key: "meals",
      icon: <HeartOutlined />,
      label: <Link to="/MealMaster/meals">My Meals</Link>,
    },
    {
      key: "addMeals",
      icon: <InfoCircleOutlined />,
      label: <Link to="/MealMaster/addMeals">Add Meals</Link>,
    },
    {
      key: "addFood",
      icon: <HeartOutlined />,
      label: <Link to="/MealMaster/addFood">Add Food</Link>,
    },
    
    {
      key: "healthReport",
      icon: <HeatMapOutlined />,
      label: <Link to="/MealMaster/HealthReport">HelathReport</Link>,
    },
    {
      key: "mealHistory",
      icon: <PhoneOutlined />,
      label: <Link to="/MealMaster/mealHistory">Meals History</Link>,
    },
    {
      key: "mealPlaner",
      icon: <PhoneOutlined />,
      label: <Link to="/MealMaster/mealPlaner">Plan Meals</Link>,
    },
    {
      key: "register",
      icon: <UserOutlined />,
      label: <Link to="/MealMaster/register">Register</Link>,
    },
  ];

  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        inlineCollapsed={collapsed}
        items={items}
      />
      {/* <UserDetails/> */}
    </>
  );
};

export default Sidebar;
