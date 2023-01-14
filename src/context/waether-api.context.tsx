import React, { createContext, useContext, useReducer } from "react";

interface IState {
  cityName: string;
}

export const initialState: IState = {
  cityName: "",
};

type IAction = {
  type: string;
  payload?: any;
};

const weatherReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    default:
      return { ...state };
  }
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
