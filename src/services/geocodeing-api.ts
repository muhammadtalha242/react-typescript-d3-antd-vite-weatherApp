import axios from "axios";
import WEATHER_API_KEY from "../constants/api";

const getName = async (name: string) => {
  const res = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${WEATHER_API_KEY}`
  );
  return res.data;
};

const exports = {
  getName,
};

export default exports;
