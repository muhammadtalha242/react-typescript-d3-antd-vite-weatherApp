import React, { createContext, useReducer } from "react";

const initialState = {
  cityName: "",
  coord: { lat: "", lon: "" },
  currentWeather: {},
  forcastWeather: {},
};

export type IState = typeof initialState;

type IAction = {
  type: string;
  payload?: any;
};

const weatherReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CITY_DETAILS: {
      return {
        ...state,
        cityName: action.payload.name,
        coord: { ...action.payload.coord },
      };
    }
    case ACTION_TYPES.SET_CURRENT_WEATHER: {
      return {
        ...state,
        currentWeather: { ...action.payload },
      };
    }
    case ACTION_TYPES.SET_FORCAT_WEATHER: {
      return {
        ...state,
        forcastWeather: { ...action.payload },
      };
    }

    default:
      return { ...state };
  }
};

const ACTION_TYPES = {
  SET_CITY_DETAILS: "SET_CITY_DETAILS",
  SET_CURRENT_WEATHER: "SET_CURRENT_WEATHER",
  SET_FORCAT_WEATHER: "SET_FORCAT_WEATHER",
};

export const setCityDetails =
  (dispatch: React.Dispatch<IAction> | undefined) =>
  ({ name, coord }: { name: string; coord: { lat: string; lon: string } }) => {
    if (dispatch)
      dispatch({
        type: ACTION_TYPES.SET_CITY_DETAILS,
        payload: { name, coord },
      });
  };

export const setCurrentWeather =
  (dispatch: React.Dispatch<IAction> | undefined) => (weather: any) => {
    if (dispatch)
      dispatch({ type: ACTION_TYPES.SET_CURRENT_WEATHER, payload: weather });
  };

export const setForcastWeather =
  (dispatch: React.Dispatch<IAction> | undefined) => (weather: any) => {
    if (dispatch)
      dispatch({ type: ACTION_TYPES.SET_FORCAT_WEATHER, payload: weather });
  };

const Context = () => {
  const WeatherContext = createContext<{
    state: IState;
    dispatch?: React.Dispatch<IAction>;
  }>(null!);
  const Provider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(weatherReducer, initialState);
    return (
      <WeatherContext.Provider value={{ state, dispatch }}>
        {children}
      </WeatherContext.Provider>
    );
  };
  return { WeatherContext, Provider };
};

export const { WeatherContext, Provider } = Context();
