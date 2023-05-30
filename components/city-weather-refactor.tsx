import React, {useEffect, useState} from "react";
import { DataLoading } from "./data-loading";
import { ErrorMessage } from "./error-message";
import GetWeather from "../services/get-weather";

import { CityWeatherProps, CityWeatherState } from "./city-weather.types";
import { CityWeatherTile } from "./city-weather-tile";

const CityWeatherRefactor = ({city}: CityWeatherProps) => {
    const [state, setState] =
        useState<CityWeatherState>({weatherResult: null});

    useEffect(() => {
        setState({weatherResult: null, loading: true, error: null});
        GetWeather(city)
            .then(result => {
                setState({weatherResult: result, loading: false})
            }).catch(error => {
                const message = error.cause && error.cause.message ? ` - ${error.cause.message}` : ""
                setState({weatherResult: null, loading: false, error: `Cannot load weather for "${city}"${message}`});
            });
    }, [city]);

    const { weatherResult, loading, error } = state;

    if(weatherResult === null) {
        if(loading) {
            return (<DataLoading message={`Loading weather for ${city}...`}/>);
        }

        if(error) {
            return (<ErrorMessage message={error}/>);
        }

        return null
    }

    const { icon, description } = weatherResult.weather[0];
    const temperature = weatherResult.main.temp;
    const cityWeatherProps = {city, icon, description, temperature};

    return (
        <CityWeatherTile {...cityWeatherProps} />
    );
}

export { CityWeatherRefactor };

