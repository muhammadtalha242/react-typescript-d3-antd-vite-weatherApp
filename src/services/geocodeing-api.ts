import axios from "axios";
import WEATHER_API_KEY from "../constants/api";

const getCities = async (name: string) => {
  const res = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${WEATHER_API_KEY}`
  );
  return res.data;
};

const getCityName = async ({
  lat,
  lon,
}: {
  lat: string | number;
  lon: string | number;
}) => {
  const res = await axios.get(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${WEATHER_API_KEY}`
  );
  return res.data;
};

const exports = {
  getCities,
  getCityName,
};

export default exports;
