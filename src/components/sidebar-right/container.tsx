import styled from "styled-components";

export const SideBarRightContainer = styled.div`
    border: 1px solid;
    background-image: linear-gradient(135deg, #445670, #102C52 );
    margin-left: 8px;
    padding: 36px 24px;
    height: 100vh;
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    color: #F7FFFF;
    `;

export const LocationDetailsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .city-name{
        .name{
            font-size: 1.2rem;
        }
        .country{
        }
    }
    .city-time{
        font-size: 1.1rem;
    }
`

export const WeatherContainer = styled.div`
    border-bottom: 1px solid #F7FFFF;
    padding: 24px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .temp{
        font-size: 1.7rem;
        
        
    }
    .description{
        font-size: 1.1rem;
        text-transform: capitalize;
    }
`;