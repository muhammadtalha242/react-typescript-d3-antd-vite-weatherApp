import React from "react";
import { MetricContainer } from "./container";

export interface IMetric {
  icon: string;
  title: string;
  value: string;
  change?: string;
}


const Metric = ({ icon, title, value, change }: IMetric) => {
  return (
    <MetricContainer>
      <div className="left">
        <div className="icon">
          <img src="icons8-weather-96.png" width={64} height={64} />
        </div>
      </div>
      <div className="center">
        <div className="title">{title}</div>
        <div className="value"> {value}</div>
      </div>
      <div className="right">{change}</div>
    </MetricContainer>
  );
};

export default Metric;
