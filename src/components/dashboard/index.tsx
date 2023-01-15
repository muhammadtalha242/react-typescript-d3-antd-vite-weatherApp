import { useContext, useState, useEffect } from "react";
import { BsWind } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineWaves } from "react-icons/md";
import { TbTemperatureCelsius } from "react-icons/tb";

import { WeatherContext } from "../../context/weather-api.context";
import { BLUE_SECONDARY } from "../../styles/colors";
import { ContentContainer, MetricsContentContainer } from "./container";
import Metric, { IMetric } from "./metric";

const METRICS = {
  temperature: {
    title: "Temperature",
    value: "2,3",
    change: "change",
    icon: (
      <TbTemperatureCelsius
        style={{ width: 32, height: 32, color: BLUE_SECONDARY }}
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
      <WiHumidity style={{ width: 32, height: 32, color: BLUE_SECONDARY }} />
    ),
  },
  pressure: {
    title: "Pressure",
    value: "720hpa",
    change: "change",
    icon: (
      <MdOutlineWaves
        style={{ width: 32, height: 32, color: BLUE_SECONDARY }}
      />
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
      console.log("currentWeather: ", currentWeather);

      updatedMetrics.temperature.value = `${currentWeather.main.temp} C`;
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
    </ContentContainer>
  );
};

export default Dashboard;
