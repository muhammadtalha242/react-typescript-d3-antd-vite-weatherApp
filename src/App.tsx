import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import styled from "styled-components";
import { BsHouse, BsMap, BsFillPinMapFill, BsCalendar3 } from "react-icons/bs";
import TopBar from "./components/topbar";

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

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <LayoutContainer>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#EEF2F3" }}
      >
        <div className="logo"> TEST</div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ background: "#EEF2F3" }}
          items={[
            {
              key: "1",
              icon: <BsHouse />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <BsMap />,
              label: "Map",
            },
            {
              key: "3",
              icon: <BsFillPinMapFill />,
              label: "Saved locations",
            },
            {
              key: "4",
              icon: <BsCalendar3 />,
              label: "Calendar",
            },
          ]}
        />
      </Sider>
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
