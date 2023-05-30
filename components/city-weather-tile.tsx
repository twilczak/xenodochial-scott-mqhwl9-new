import React from "react";

export interface CityWeatherTileProps {
    city: string,
    icon: string,
    description: string,
    temperature: number
}

export const CityWeatherTile = ({city, icon, description, temperature}: CityWeatherTileProps) => {
    return (
        <div className="flex flex-col items-center justify-center flex-wrap bg-white py-4 px-5 rounded-md border border-slate-200 drop-shadow-md">
            <h1 className="uppercase font-bold text-slate-600 text-2xl">{city}</h1>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                 alt=""/>
            <div className="capitalize text-slate-400 pb-2">
                {description}
            </div>
            <div className="text-slate-400 text-sm">
                Temperature: <span className="text-black text-3xl pl-2">{KtoF(temperature).toFixed(0)}&#8457;</span>
            </div>
        </div>
    );
};

function KtoF(tempKelvin: number) {
    return ((tempKelvin - 273.15) * 9) / 5 + 32;
}
