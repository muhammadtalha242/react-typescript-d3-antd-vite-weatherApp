import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AiOutlineBell, AiOutlineUser } from "react-icons/ai";

import InputSearch from "../common/input-search";
import { HeaderContainer } from "./container";
import GeoCodingService from "../../services/geocodeing-api";

const TopBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [city, setCity] = useState("");

  const handleInput = async ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    setCity(value);
    if (value.length > 4) {
      const res = await GeoCodingService.getName(value);
      console.log("res: ", res);
    }
  };

  return (
    <HeaderContainer>
      <div className="left">
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          }
        )}
      </div>
      <div className="right">
        <InputSearch value={city} setValue={handleInput} name="search" />
        <AiOutlineBell />
        <AiOutlineUser />
      </div>
    </HeaderContainer>
  );
};

export default TopBar;
