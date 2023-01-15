import React, { useState } from "react";
import { Layout, theme } from "antd";
import styled from "styled-components";
import TopBar from "./components/topbar";
import SideBar from "./components/sidebar";

const LayoutContainer = styled(Layout)`
  border: 1px solid;
  height: 100vh;

  .trigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }

  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
`;

const {Content } = Layout;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <LayoutContainer>
      <SideBar />
      <Layout className="site-layout">
        <TopBar />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </LayoutContainer>
  );
};

export default App;
