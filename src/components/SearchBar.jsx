import { useState } from 'react'
// import '../App.css'
import "../styles/SearchBar.css"

// function SearchBar({ city, setCity, fetchWeather }) {
function SearchBar({ onWeatherFetched,onForecastFetched, onError }) {
  const [city, setCity] = useState("");
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchWeather = async () => {
    if (city.trim() === "") {
      onError("Please enter a city name");
      onWeatherFetched(null);
      onForecastFetched([]);
      return;
    }

    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!weatherResponse.ok) {
        throw new Error("City not found");
      }
      const weatherData  = await weatherResponse.json();
      console.log("weatherData",weatherData)

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!forecastResponse.ok) {
        throw new Error("Forecast not available");
      }
      const forecastData = await forecastResponse.json();
      console.log("forecast",forecastData)

      onWeatherFetched(weatherData );   // Pass data back up
      onForecastFetched(forecastData); 
      onError("");              // Clear any old errors
    } catch (err) {
      onError(err.message);     // Pass error back up
      onWeatherFetched(null);   // Clear old data
      onForecastFetched([]);  
    }
  };

  return (
    <div className="search-bar-wrapper">
      <input
        type="text"
        className="search-input"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        // style={{ padding: "10px", width: "200px" }}
      />
      <button
      className="search-button"
        onClick={fetchWeather}
        // style={{
        //   padding: "10px",
        //   marginLeft: "10px",
        //   backgroundColor: "#4facfe",
        //   color: "#fff",
        //   border: "none",
        //   borderRadius: "5px",
        // }}
      >
        Get Weather
      </button>
    </div>
  );
}

export default SearchBar;
