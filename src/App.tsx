import React, { useState } from "react";
import { Layout, theme } from "antd";
import styled from "styled-components";
import TopBar from "./components/topbar";
import SideBar from "./components/sidebar";

const LayoutContainer = styled(Layout)`
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
