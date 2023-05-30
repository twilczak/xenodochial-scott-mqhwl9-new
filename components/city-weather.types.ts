export interface CityWeatherProps {
    city: string;
}

export interface CityWeatherState {
    weatherResult: any;
    loading?: boolean;
    error?: any;
}
