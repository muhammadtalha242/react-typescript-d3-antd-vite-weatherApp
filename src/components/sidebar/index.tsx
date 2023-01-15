import { useState } from "react";
import { BsHouse, BsMap, BsFillPinMapFill, BsCalendar3 } from "react-icons/bs";
import { Layout, Menu } from "antd";
import { redirect, useNavigate } from "react-router-dom";
import { WHITE_ANTI_FLASH } from "../../styles/colors";
import { SiderContainer } from "./container";

const SideBar = () => {
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
    <SiderContainer
      trigger={null}
      style={{ background: WHITE_ANTI_FLASH }}
    >
      <div className="logo">
        <img src="icons8-weather-96.png" alt="logo"  />
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        style={{ background: WHITE_ANTI_FLASH, marginTop: 16 }}
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
            key: "savedLocations",
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
    </SiderContainer>
  );
};

export default SideBar;
