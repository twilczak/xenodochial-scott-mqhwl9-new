import React from "react";
import GetWeather from "../services/get-weather";

interface CityWeatherProps {
  city: string;
}

interface CityWeatherState {
  weatherResult: any;
}

export default class CityWeather extends React.Component<
  CityWeatherProps,
  CityWeatherState
> {
  public constructor(props: CityWeatherProps) {
    super(props);
    this.state = {
      weatherResult: null,
    };
  }

  public componentDidMount() {
    const { city } = this.props;
    GetWeather(city)
        .then((result) => this.setState({ weatherResult: result }));
  }

  public render() {
    const { city } = this.props;
    const { weatherResult } = this.state;

    return (
      <div>
        <h1>{city}</h1>
        <div>
          Temperature:{" "}
          {weatherResult && KtoF(weatherResult.main.temp).toFixed(0)} &#8457;
        </div>
        <div>
          Description: {weatherResult && weatherResult.weather[0].description}
        </div>
      </div>
    );
  }
}

function KtoF(tempKevlin: number) {
  return ((tempKevlin - 273.15) * 9) / 5 + 32;
}
