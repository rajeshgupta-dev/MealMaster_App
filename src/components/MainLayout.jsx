import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [showSiderbar, setSidebar] = useState(false);

  const toggleCollapsed = () => {
    setSidebar(!showSiderbar);
  };

  return (
    <Layout>
      {/* Collapsible Sidebar */}
      <Sider
        collapsible
        collapsed={showSiderbar}
        trigger={null} 
        width={200}
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          overflow: "auto",
          zIndex: 100,
        }}
      >
        <Sidebar collapsed={showSiderbar} />
      </Sider>

      {/* Main Layout */}
      <Layout style={{ marginLeft: showSiderbar ? 80 : 200 }}>
        {/* Fixed Header */}
        <Header
          style={{
            position: "fixed",
            top: 0,
            left: showSiderbar ? 80 : 200,
            right: 0,
            height: 64,
            zIndex: 99,
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #e8e8e8",
          }}
        >
          {/* Toggle Button */}
          <div onClick={toggleCollapsed} style={{ cursor: "pointer", fontSize: "18px"}}>
            {showSiderbar ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>

          {/* Navbar content */}
          <Navbar />
        </Header>

        {/* Scrollable Content */}
        <Content
          style={{
            marginTop: 64,
            padding: "24px",
            // minHeight: "100vh",
            overflowY: "auto",
            background: "#f0f2f5",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
