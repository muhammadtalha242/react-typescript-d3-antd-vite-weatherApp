import axios from "axios";
import WEATHER_API_KEY from "../constants/api";

const getCurrentWeather = async ({
  lat,
  lon,
}: {
  lat: string;
  lon: string;
}) => {
  const res = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
  );
  return res.data;
};
const getForecastWeather = async ({
  lat,
  lon,
}: {
  lat: string;
  lon: string;
}) => {
  const res = await axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
  );
  return res.data;
};

const exports = {
  getForecastWeather,
  getCurrentWeather,
};

export default exports;
