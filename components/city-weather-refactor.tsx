import React, {useEffect, useState} from "react";
import { DataLoading } from "./data-loading";
import GetWeather from "../services/get-weather";

import { CityWeatherProps, CityWeatherState } from "./city-weather.types";
import {ErrorMessage} from "./error-message";

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
                setState({weatherResult: null, loading: false, error: `Cannot load data for "${city}"${message}`});
            });
    }, [city]);

    const { weatherResult, loading, error } = state;

    if(weatherResult === null) {
        if(loading) {
            return (<DataLoading message={`Loading weather for ${city}...`}/>);
        } else if(error) {
            return (<ErrorMessage message={error}/>);
        } else {
            return null
        }
    }

    return (
        <div className="flex flex-col items-center justify-center flex-wrap bg-white py-4 px-5 rounded-md border border-slate-200 drop-shadow-md">
            <h1 className="uppercase font-bold text-slate-600 text-2xl">{city}</h1>
            <img src={`https://openweathermap.org/img/wn/${weatherResult.weather[0].icon}@2x.png`}
                 alt=""/>
            <div className="capitalize text-slate-400 pb-2">
                {weatherResult.weather[0].description}
            </div>
            <div className="text-slate-400 text-sm">
                Temperature: <span className="text-black text-3xl pl-2">{KtoF(weatherResult.main.temp).toFixed(0)}&#8457;</span>
            </div>
        </div>
    );
}

export { CityWeatherRefactor };

function KtoF(tempKelvin: number) {
    return ((tempKelvin - 273.15) * 9) / 5 + 32;
}
