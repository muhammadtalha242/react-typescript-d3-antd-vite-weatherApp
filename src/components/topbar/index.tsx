import React, { useCallback, useState, useContext } from "react";
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
import { GREY_SPANISH } from "../../styles/colors";

const TopBar = () => {
  const { dispatch: WeatherDispatch } = useContext(WeatherContext);
  const [city, setCity] = useState({ name: "", lat: "", lon: "" });
  const [options, setOptions] = useState<ISearch>({
    searchTerm: "",
    searchedOptions: [],
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
        // console.log("🚀 ~ file: index.tsx:34 ~ debounce ~ res", res);
        const citiesArray: {
          value: string;
          label: string;
          coordinates: { lat: string; lon: string };
        }[] = res.map((ele: any, index: number) => {
          const v_ = `${ele.name}, ${ele.state ? ele.state : ''}`
          return {
            label: v_,
            value: v_,
            coordinates: { lat: ele.lat, lon: ele.lon },
          };
        });
        setOptions({ searchTerm: value, searchedOptions: citiesArray });
      } catch (e: any) {
        // console.log("🚀 ~ file: index.tsx:49 ~ debounce ~ e", e);
      }
    }, 500),
    []
  );

  const handleSelectedValue = async (selectedOption: any) => {
    // console.log(
    // "🚀 ~ file: index.tsx:56 ~ handleSelectedValue ~ selectedOption",
    // selectedOption
    // );
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
        <div className="date-month-year">{moment().format("MMMM YYYY")}</div>
        <div className="date-full">{moment().format("dddd, MMM Do, YYYY")}</div>
      </div>
      <div className="right">
        <InputSearch
          handleSelectedValue={handleSelectedValue}
          displayOptions={options}
          setValue={handleInput}
        />
        <div className="notifications">
          <AiOutlineBell
            style={{ width: 28, height: 28, color: GREY_SPANISH }}
          />
        </div>
        <div className="user">
          <AiOutlineUser
            style={{ width: 28, height: 28, color: GREY_SPANISH }}
          />
        </div>
      </div>
    </HeaderContainer>
  );
};

export default TopBar;
