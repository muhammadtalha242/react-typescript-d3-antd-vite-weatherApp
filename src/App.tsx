import { Layout } from "antd";
import styled from "styled-components";
import TopBar from "./components/topbar";
import SideBar from "./components/sidebar";
import Dashboard from "./components/dashboard";

const LayoutContainer = styled(Layout)``;

const App = () => {
  return (
    <LayoutContainer>
      <SideBar />
      <Layout className="site-layout">
        <TopBar />
        <Dashboard />
      </Layout>
    </LayoutContainer>
  );
};

export default App;
