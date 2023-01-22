import moment from "moment"
import { useContext } from "react"
import { WeatherContext } from "../../context/weather-api.context"
import { LocationDetailsContainer } from "./container"

const LocationDetails = () => {
    const { state: weatherState } = useContext(WeatherContext)
    const { currentWeather }: any = weatherState
    console.log("🚀 ~ file: location-details.tsx:8 ~ LocationDetails ~ currentWeather", currentWeather)
    const time = moment(currentWeather.dt * 1000).format('hh:mm A');
    console.log("🚀 ~ file: location-details.tsx:9 ~ LocationDetails ~ time", time)

    return (
        <LocationDetailsContainer>
            <div className="city-name">
                <div className="name">{weatherState.cityName}</div>
                <div className="country">{weatherState.cityName} {currentWeather.sys ? currentWeather.sys.country : ''}</div>
            </div>
            <div className="city-time">{currentWeather.sys ? time : ''}</div>
        </LocationDetailsContainer>
    )
}

export default LocationDetails