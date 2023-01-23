import React from "react";

// to get api key: https://openweathermap.org/appid
const API_KEY = "a29f99dcbac59c75b7db05f248685411";

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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    fetch(url)
      .then((r) => r.json())
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
          Descripiton: {weatherResult && weatherResult.weather[0].description}
        </div>
      </div>
    );
  }
}

function KtoF(tempKevlin: number) {
  return ((tempKevlin - 273.15) * 9) / 5 + 32;
}
