import { useContext, useState, useEffect } from "react";
import { BsWind } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineWaves } from "react-icons/md";
import { TbTemperatureCelsius } from "react-icons/tb";

import { WeatherContext } from "../../context/weather-api.context";
import {
  BLUE_SECONDARY,
  BLUE_TERTIARY,
  GREEN_SECONDARY,
  ORANGE_PRIMARY,
} from "../../styles/colors";
import { ContentContainer, MetricsContentContainer } from "./container";
import Metric, { IMetric } from "./metric";
import { ValidatorChart } from "./temperature-chart";
import AreaChart from "../common/graphs/area-chart";
import moment from "moment";

const METRICS = {
  temperature: {
    title: "Temperature",
    value: "23°C",
    change: "change",
    icon: (
      <TbTemperatureCelsius
        style={{ width: 32, height: 32, color: ORANGE_PRIMARY }}
      />
    ),
  },
  windSpeed: {
    title: "Wind Speed",
    value: "12Km/h",
    change: "change",
    icon: <BsWind style={{ width: 32, height: 32, color: BLUE_SECONDARY }} />,
  },
  humidity: {
    title: "Humidity",
    value: "24%",
    change: "change",
    icon: (
      <WiHumidity style={{ width: 32, height: 32, color: GREEN_SECONDARY }} />
    ),
  },
  pressure: {
    title: "Pressure",
    value: "720hpa",
    change: "change",
    icon: (
      <MdOutlineWaves style={{ width: 32, height: 32, color: BLUE_TERTIARY }} />
    ),
  },
  humidityX: {
    title: "Humidity",
    value: "24%",
    change: "change",
    icon: (
      <WiHumidity style={{ width: 32, height: 32, color: GREEN_SECONDARY }} />
    ),
  },
  pressureX: {
    title: "Pressure",
    value: "720hpa",
    change: "change",
    icon: (
      <MdOutlineWaves style={{ width: 32, height: 32, color: BLUE_TERTIARY }} />
    ),
  },
};

type IMetricRes = typeof METRICS;

const Dashboard = () => {
  const [metrics, setMetrics] = useState<IMetricRes>(METRICS);
  const { state: weatherState } = useContext(WeatherContext);
  console.log(
    "🚀 ~ file: index.tsx:35 ~ Dashboard ~ weatherState",
    weatherState
  );
  const { currentWeather }: any = weatherState;

  useEffect(() => {
    const isObjectEmpty =
      currentWeather && // 👈 null and undefined check
      Object.keys(currentWeather).length === 0 &&
      Object.getPrototypeOf(currentWeather) === Object.prototype;

    if (!isObjectEmpty) {
      const updatedMetrics = { ...metrics };
      updatedMetrics.temperature.value = `${currentWeather.main.temp} °C`;
      updatedMetrics.windSpeed.value = `${currentWeather.wind.speed} Km/h`;
      updatedMetrics.pressure.value = `${currentWeather.main.pressure} hpa`;
      updatedMetrics.humidity.value = `${currentWeather.main.humidity} %`;
      setMetrics({ ...updatedMetrics });
    }
  }, [weatherState, currentWeather]);

  return (
    <ContentContainer>
      Today Oveerview HERE
      <MetricsContentContainer>
        {Object.values(metrics).map((metric: IMetric, index: number) => {
          return <Metric {...metric} key={index} />;
        })}
      </MetricsContentContainer>
      <AreaChart
        id={1}
        data={[
          { x: moment(), y: 19 },
          { x: moment().add(1, "hour"), y: 20 },
          { x: moment().add(2, "hour"), y: 19.5 },
          { x: moment().add(3, "hour"), y: 20 },
          { x: moment().add(4, "hour"), y: 19 },
          { x: moment().add(5, "hour"), y: 20 },
          { x: moment().add(6, "hour"), y: 19 },
        ]}
      />
    </ContentContainer>
  );
};

export default Dashboard;
