import styled from "styled-components";
import { GREY_CULTURED, GREY_SPANISH, WHITE } from "../../styles/colors";

export const HeaderContainer = styled.header`
  border: 1px solid;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 94px;
  background-color: ${WHITE};

  .left {
    width: 25%;

    .date-month-year {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .date-full {
      font-size: 14px;
      color: ${GREY_SPANISH};
    }
  }

  .right {
    width: 75%;
    display: flex;
    align-items: center;

    .notifications {
      padding: 8px;
      margin: 0 6px;
      background-color: ${GREY_CULTURED};
      cursor: pointer;
    }

    .user {
      padding: 8px;
      margin: 0 6px;
      background-color: ${GREY_CULTURED};
      cursor: pointer;
    }
  }
`;
