import React, {useEffect, useState} from "react";
import GetWeather from "../services/get-weather";

import { CityWeatherProps, CityWeatherState } from "./city-weather.types";

const CityWeatherRefactor = ({city}: CityWeatherProps) => {
    const [state, setState] =
        useState<CityWeatherState>({weatherResult: null});

    useEffect(() => {
        GetWeather(city)
            .then(result => setState({weatherResult: result}));
    }, [city]);

    const { weatherResult } = state;

    return !weatherResult ? null : (
        <div>
            <h1>{city}</h1>
            <div>
                Temperature: {KtoF(weatherResult.main.temp).toFixed(0)} &#8457;
            </div>
            <div>
                Description: {weatherResult.weather[0].description}
            </div>
        </div>
    );
}

export { CityWeatherRefactor };

function KtoF(tempKelvin: number) {
    return ((tempKelvin - 273.15) * 9) / 5 + 32;
}
