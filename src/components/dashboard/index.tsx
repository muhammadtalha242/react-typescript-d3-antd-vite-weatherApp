import { useContext, useState } from "react";
import { WeatherContext } from "../../context/weather-api.context";
import { ContentContainer, MetricsContentContainer } from "./container";
import Metric, { IMetric } from "./metric";

const METRICS: IMetric[] = [
  {
    title: "Wind Speed",
    value: "12Km/h",
    change: "change",
    icon: "wind-speed",
  },
  {
    title: "Rain Chances",
    value: "24%",
    change: "change",
    icon: "rain-chances",
  },
  {
    title: "Pressure",
    value: "720hpa",
    change: "change",
    icon: "pressure",
  },
  {
    title: "UV index",
    value: "2,3",
    change: "change",
    icon: "uv-index",
  },
];

const Dashboard = () => {
  const { state: weatherState } = useContext(WeatherContext);
  console.log("🚀 ~ file: index.tsx:35 ~ Dashboard ~ weatherState", weatherState)
  return (
    <ContentContainer>
      Today Oveerview HERE
      <MetricsContentContainer>
        {METRICS.map((metric: IMetric, index: number) => {
          return <Metric {...metric} />;
        })}
      </MetricsContentContainer>
    </ContentContainer>
  );
};

export default Dashboard;
