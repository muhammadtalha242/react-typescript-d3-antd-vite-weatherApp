import { useContext } from 'react'
import { WeatherContext } from '../../context/weather-api.context'
import { WeatherContainer } from './container'

const Weather = () => {
    const { state: weatherState } = useContext(WeatherContext)
    const { currentWeather }: any = weatherState
    const { weather } = currentWeather
    return (
        <WeatherContainer>{
            weather ?
                <>
                    <div className="temp">
                        <div className="img">
                            <img src={`http://openweathermap.org/img/w/${weather[0].icon}.png`} alt={`${weather[0].description}`} />
                        </div>
                        <div className="">{currentWeather.main.temp} °C</div>
                    </div>
                    <div className="description">{weather[0].description}</div>
                </>
                : null
        }</WeatherContainer>)

}

export default Weather