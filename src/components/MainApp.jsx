import React, { useState, useEffect } from "react";
import WeatherHub from "./WeatherHub";
import SearchBar from "./SearchBar";
import "../styles/main.css";

function MainApp({ weatherData, onSearch, searchValue, onInputChange, onWeatherFetched, onError}) {

  // const now = new Date();
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval on unmount
    return () => clearInterval(timer);
  }, []);
  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  return (
    <div className="weather-container">
      {/* LEFT PANEL */}
      <div className="left-panel">
        {/* <div className="search-bar">
          <input
            type="text"
            placeholder="Enter city"
            value={searchValue}
            onChange={onInputChange}
          />
          <button onClick={onSearch}>Get Weather</button>
        </div> */}
        {/* <SearchBar
          onWeatherFetched={onWeatherFetched}
          onError={onError}
        /> */}
        <div className="date-time">
          <h2>{formatDate(currentTime)}</h2>
          {/* <p>{formatTime(now)}</p> */}
          <h1 className="live-clock">{formatTime(currentTime)}</h1>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
            className="small-weather-icon"
          />
          <p className="condition">{weatherData.weather[0].main}</p>
        </div>
        
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <WeatherHub weatherData={weatherData} />
      </div>
    </div>
  );
}

export default MainApp;
