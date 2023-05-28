// to get api key: https://openweathermap.org/appid
const API_KEY = "a29f99dcbac59c75b7db05f248685411";

export default function GetWeather(city: string): Promise<any> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    return fetch(url)
        .then((r) => r.json());
}
