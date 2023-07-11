import { FormEvent, useState } from "react";
import { CityWeatherRefactor } from "../components/city-weather-refactor/city-weather-refactor";

export default function IndexPage() {
  const [city, setCity] = useState<string | null>(null);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      let city = formData.get("city");
      city = typeof city === "string" && city.trim().length > 0 ? city : null;
      setCity(city);
  }

  return (
    <div className="py-2 bg-slate-200 max-h-full min-h-screen">
      <form
        className="flex items-center justify-center my-12"
        onSubmit={handleSubmit}
      >
        <label className="font-medium text-lg" htmlFor="city">Weather Search:</label>{" "}
        <div className="ml-2 flex">
            <input
              className="px-2 py-2 rounded-l-md border border-r-0 border-gray-300"
              type="text"
              name="city"
              id="city"
            />
            <button className="px-3 py-2 bg-[#4583C7] text-white uppercase font-extrabold rounded-r-md text-sm" type="submit">
              Submit
            </button>
        </div>
      </form>

      {city && (
        <div className="mt-4 flex justify-center items-center" aria-live="assertive">
          <CityWeatherRefactor city={city} />
        </div>
      )}
    </div>
  );
}
