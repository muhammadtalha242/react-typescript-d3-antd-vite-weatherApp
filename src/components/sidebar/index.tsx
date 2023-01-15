import { useState } from "react";
import { BsHouse, BsMap, BsFillPinMapFill, BsCalendar3 } from "react-icons/bs";
import { Layout, Menu } from "antd";
import { redirect, useNavigate } from "react-router-dom";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { Sider } = Layout;
  const navigate = useNavigate();
  const onItemSelect = ({
    item,
    key,
    keyPath,
    selectedKeys,
    domEvent,
  }: {
    item: any;
    key: any;
    keyPath: any;
    selectedKeys: any;
    domEvent: any;
  }) => {
    console.log("🚀 ~ file: index.tsx:43 ~ SideBar ~ key", key);
    return navigate(`/${key}`);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ background: "#EEF2F3" }}
    >
      <div className="logo"> TEST</div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        style={{ background: "#EEF2F3" }}
        onSelect={onItemSelect}
        items={[
          {
            key: "dashboard",
            label: "Dashboard",
            icon: <BsHouse />,
          },
          {
            key: "map",
            label: "Map",
            icon: <BsMap />,
          },
          {
            key: "saved-locations",
            label: "Saved locations",
            icon: <BsFillPinMapFill />,
          },
          {
            key: "calendar",
            label: "Calendar",
            icon: <BsCalendar3 />,
          },
        ]}
      />
    </Sider>
  );
};

export default SideBar;
