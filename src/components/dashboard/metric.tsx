import React from "react";
import { MetricContainer } from "./container";

export interface IMetric {
  icon?: React.ReactElement;
  title: string;
  value: string;
  change?: string;
}

const Metric = ({ icon, title, value, change }: IMetric) => {
  return (
    <MetricContainer>
      <div className="left">
        <div className="icon">
            {icon}
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
