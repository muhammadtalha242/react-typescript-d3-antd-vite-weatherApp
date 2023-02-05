import React, { useCallback, useState, useContext, useEffect } from "react";
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

  useEffect(() => {
    let coords: {
      lat: string | number;
      lon: string | number;
    } = { lat: 52.5170365, lon: 13.3888599 };
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        console.log("🚀 ~ file: index.tsx:34 ~ position", position);
        coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        console.log("🚀 ~ file: index.tsx:35 ~ coords", coords);
      });
    }
    getCityNameFromCoords(coords);
    console.log("🚀 ~ file: index.tsx:41 ~ useEffect ~ coords", coords);
  }, []);

  const getCityNameFromCoords = async (position: {
    lat: string | number;
    lon: string | number;
  }) => {
    const res = await GeoCodingService.getCityName({ ...position });
    console.log(
      "🚀 ~ file: index.tsx:41 ~ getCityNameFromCoords ~ res",
      res[0].name
    );

    handleSelectedValue({
      label: res[0].name,
      value: res[0].name,
      coordinates: { ...position },
    });
  };

  const handleInput = async ({ value }: { value: string }) => {
    const currentState = { ...options };
    setOptions({
      searchTerm: value,
      searchedOptions: currentState.searchedOptions,
    });

    getCityName(value);
    console.log("🚀 ~ file: index.tsx:51 ~ handleInput ~ value", value);
  };

  const getCityName = useCallback(
    debounce(async (value: string) => {
      try {
        const res = await GeoCodingService.getCities(value);
        // console.log("🚀 ~ file: index.tsx:34 ~ debounce ~ res", res);
        const citiesArray: {
          value: string;
          label: string;
          coordinates: { lat: string; lon: string };
        }[] = res.map((ele: any, index: number) => {
          const v_ = `${ele.name}, ${ele.state ? ele.state : ""}`;
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
