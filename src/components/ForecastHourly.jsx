import "../styles/ForecastHourly.css"
function ForecastHourly({ forecastData  }) {
    if (!forecastData || !forecastData.list) return null;

  // Get first 12 hours (3-hour intervals from API)
  const hourlyData = forecastData.list.slice(0, 12);
  return (
    <div className="hourly-forecast-panel">
      <h2>Hourly Forecast</h2>
      <div className="hourly-list">
        {hourlyData.map((hour, index) => (
          <div key={index} className="hourly-card">
            <p className="hourly-time">
              {new Date(hour.dt_txt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
              alt={hour.weather[0].description}
              className="hourly-icon"
            />
            <p className="hourly-temp">{Math.round(hour.main.temp)}°C</p>
            <p className="hourly-wind">💨 {hour.wind.speed} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ForecastHourly;
