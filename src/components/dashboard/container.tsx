import styled from "styled-components";
const { Content } = Layout;

import { Layout } from "antd";
import { BLACK, GREY_CULTURED, WHITE } from "../../styles/colors";

export const ContentContainer = styled(Content)`
  padding: 36px;
  background: ${WHITE};
`;

export const MetricContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  height: 120px;
  border: 1px solid;
  background-color: ${GREY_CULTURED};
  padding: 16px;

  .center {
    .title {
      color: ${BLACK};
      margin-bottom: 16px;
    }
    .value {
      font-size: 2rem;
      font-weight: 500;
      color: ${BLACK};
    }
  }
`;

export const MetricsContentContainer = styled.div`
  width: 75%;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
`;

export const ChartContainer = styled.div`
  width: 75%;
  border: 1px solid red;
  margin-top: 36px;
`;
