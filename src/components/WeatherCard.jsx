import { useState } from "react";
import axios from "axios";

const API_KEY = "c78dedcede9ef9721acb2cc99b7cde52";

function WeatherCard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (e) => {
    e.preventDefault();
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        trimmedCity
      )}&appid=${API_KEY}&units=metric`;

      const response = await axios.get(url);
      setWeather(response.data);
    } catch (err) {
      setWeather(null);
      if (err.response && err.response.status === 404) {
        setError("City not found. Please check the spelling and try again.");
      } else if (err.response && err.response.status === 401) {
        setError("Invalid or inactive API key. Please verify your OpenWeatherMap key.");
      } else {
        setError("Unable to fetch weather data right now. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="weather-panel" aria-label="Weather search and report">
      <form className="search-form" onSubmit={fetchWeather}>
        <label htmlFor="city-input" className="visually-hidden">
          City Name
        </label>
        <input
          id="city-input"
          type="text"
          className="city-input"
          placeholder="Enter city name (e.g., Chennai, London)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="search-btn" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <p className="status-msg error-msg" role="alert">
          {error}
        </p>
      )}

      {loading && <p className="status-msg">Fetching live weather data...</p>}

      {weather && !loading && (
        <article className="weather-card">
          <div className="weather-top">
            <div>
              <h2 className="city-heading">
                {weather.name}, {weather.sys?.country}
              </h2>
              <p className="weather-condition">
                {weather.weather?.[0]?.description}
              </p>
            </div>
            <p className="temp-display">{Math.round(weather.main?.temp)}°C</p>
          </div>

          <dl className="weather-details">
            <div className="detail-item">
              <dt>Feels Like</dt>
              <dd>{Math.round(weather.main?.feels_like)}°C</dd>
            </div>
            <div className="detail-item">
              <dt>Humidity</dt>
              <dd>{weather.main?.humidity}%</dd>
            </div>
            <div className="detail-item">
              <dt>Wind Speed</dt>
              <dd>{weather.wind?.speed} m/s</dd>
            </div>
            <div className="detail-item">
              <dt>Pressure</dt>
              <dd>{weather.main?.pressure} hPa</dd>
            </div>
          </dl>
        </article>
      )}
    </section>
  );
}

export default WeatherCard;