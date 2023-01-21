import { useContext, useState, useEffect, useRef } from "react";
import { BsWind } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineWaves } from "react-icons/md";
import { TbTemperatureCelsius } from "react-icons/tb";
import { Button } from "antd";
import moment from "moment";

import useWindowResize from "../../custom-hooks/useWindowResize";
import { WeatherContext } from "../../context/weather-api.context";
import {
  BLUE_SECONDARY,
  BLUE_TERTIARY,
  GREEN_SECONDARY,
  ORANGE_PRIMARY,
} from "../../styles/colors";
import {
  ChartContainer,
  ContentContainer,
  MetricsContentContainer,
} from "./container";
import Metric, { IMetric } from "./metric";
import AreaChart from "../common/graphs/area-chart";

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
  const [chartData, setChartData] = useState([]);
  const { state: weatherState } = useContext(WeatherContext);
  const [width, height] = useWindowResize()
  const { currentWeather, forcastWeather }: any = weatherState;

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
      getChartData('temp')();
    }
  }, [weatherState, currentWeather]);


  const getChartData = (metricType: string) => () => {

    const data = forcastWeather.list.map((e: any) => {
      const { main, wind } = e;
      const climate = { ...main, ...wind }
      return { x: moment(e.dt_txt), y: climate[metricType] };
    });
    setChartData(data);
  };



  return (
    <ContentContainer>
      Today Oveerview HERE
      <MetricsContentContainer>
        {Object.values(metrics).map((metric: IMetric, index: number) => {
          return <Metric {...metric} key={index} />;
        })}
      </MetricsContentContainer>
      {chartData.length > 0 ? <ChartContainer  >
        <div className="header">

          <div className="title">Temperature</div>
          <div className="buttons">
            <Button type="text" onClick={getChartData('temp')} >Temp</Button>
            <Button type="text" onClick={getChartData('humidity')} >humidity</Button>
            <Button type="text" onClick={getChartData('pressure')} >pressure</Button>
            <Button type="text" onClick={getChartData('speed')} >Wind speed</Button>

          </div>
        </div>
        <AreaChart id={1} data={chartData} dimesnsions={{ width, height }} />
      </ChartContainer> : null}
    </ContentContainer>
  );
};

export default Dashboard;
