import { Layout, theme } from "antd";
import styled from "styled-components";
import TopBar from "./components/topbar";
import SideBar from "./components/sidebar";

const LayoutContainer = styled(Layout)``;

const { Content } = Layout;

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
            padding: 36,
            background: colorBgContainer,
          }}
        >
          Today Overview
        </Content>
      </Layout>
    </LayoutContainer>
  );
};

export default App;
