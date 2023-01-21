import axios from "axios";
import WEATHER_API_KEY from "../constants/api";

interface ICoord {
  lat: string;
  lon: string;
}

const getCurrentWeather = async ({ lat, lon }: ICoord) => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  );
  return res.data;
};
const getForecastWeather = async ({ lat, lon }: ICoord) => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  );
  return res.data;
};

const exports = {
  getForecastWeather,
  getCurrentWeather,
};

export default exports;
