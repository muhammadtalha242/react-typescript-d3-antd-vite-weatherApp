import styled from "styled-components";
const { Content } = Layout;

import { Layout } from "antd";
import { BLACK, GREY_CULTURED, WHITE } from "../../styles/colors";

export const ContentContainer = styled.div`
  height: 100vh;
  background: ${WHITE};
  display:flex;
  width: 100%;

  .left-col{
    width: 75%;
    padding: 36px;

  }
  .right-col{
    width: 25%;

  }
`;

export const MetricContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
`;

export const ChartContainer = styled.div`
  border: 1px solid red;
  margin-top: 36px;
  
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title{
      
    }
    
    .buttons{
      button{
        border-bottom: 1px solid;
        border-radius: 0px;
        margin: 4px;
        padding: 0px;
      }
    }
  }
  
`;
