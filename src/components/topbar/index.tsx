import React, { useCallback, useState, useContext } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AiOutlineBell, AiOutlineUser } from "react-icons/ai";
import debounce from "lodash.debounce";
import moment from "moment";

import InputSearch, { ISearch } from "../common/input-search";
import { HeaderContainer } from "./container";
import GeoCodingService from "../../services/geocodeing-api";
import WeatherService from "../../services/weather-api";
import {
  WeatherContext,
  setCityDetails,
  setCurrentWeather,
  setForcastWeather,
} from "../../context/weather-api.context";

const TopBar = () => {
  const { state: WeatherState, dispatch: WeatherDispatch } =
    useContext(WeatherContext);
  const [collapsed, setCollapsed] = useState(false);
  const [city, setCity] = useState({ name: "", lat: "", lon: "" });
  const [options, setOptions] = useState<ISearch>({
    searchTerm: "",
    searchedOptions: [
      { value: "", label: "", coordinates: { lat: "", lon: "" } },
    ],
  });

  const handleInput = async ({ value }: { value: string }) => {
    const currentState = { ...options };
    setOptions({
      searchTerm: value,
      searchedOptions: currentState.searchedOptions,
    });
    getCityName(value);
  };

  const getCityName = useCallback(
    debounce(async (value: string) => {
      try {
        const res = await GeoCodingService.getName(value);
        console.log("🚀 ~ file: index.tsx:34 ~ debounce ~ res", res);
        const citiesArray: {
          value: string;
          label: string;
          coordinates: { lat: string; lon: string };
        }[] = res.map((ele: any, index: number) => {
          return {
            label: `${ele.name}, ${ele.state}`,
            value: `${ele.name}, ${ele.state}`,
            coordinates: { lat: ele.lat, lon: ele.lon },
          };
        });
        setOptions({ searchTerm: value, searchedOptions: citiesArray });
      } catch (e: any) {
        console.log("🚀 ~ file: index.tsx:49 ~ debounce ~ e", e);
      }
    }, 500),
    []
  );

  const handleSelectedValue = async (selectedOption: any) => {
    console.log(
      "🚀 ~ file: index.tsx:56 ~ handleSelectedValue ~ selectedOption",
      selectedOption
    );
    setOptions({ ...options, searchTerm: selectedOption.value });
    setCity({
      name: selectedOption.value,
      lat: selectedOption.coordinates.lat,
      lon: selectedOption.coordinates.lon,
    });
    const currentWeatherResp = await WeatherService.getCurrentWeather({
      ...selectedOption.coordinates,
    });
    const forcastWeatherResp = await WeatherService.getForecastWeather({
      ...selectedOption.coordinates,
    });
    setCityDetails(WeatherDispatch)({
      name: selectedOption.value,
      coord: {
        lat: selectedOption.coordinates.lat,
        lon: selectedOption.coordinates.lon,
      },
    });
    setCurrentWeather(WeatherDispatch)(currentWeatherResp);
    setForcastWeather(WeatherDispatch)(forcastWeatherResp);
  };

  return (
    <HeaderContainer>
      <div className="left">
        {/* {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          }
        )} */}
        
      </div>
      <div className="right">
        <InputSearch
          handleSelectedValue={handleSelectedValue}
          displayOptions={options}
          setValue={handleInput}
          name="search"
        />
        <AiOutlineBell />
        <AiOutlineUser />
      </div>
    </HeaderContainer>
  );
};

export default TopBar;
