import "../styles/Forecast5Day.css";

function Forecast5Day({ forecastData }) {
  if (!forecastData || !forecastData.list) return null;

  const dailyData = {};

  // Group readings by date
  forecastData.list.forEach((reading) => {
    const date = reading.dt_txt.split(" ")[0]; // Get YYYY-MM-DD
    if (!dailyData[date]) {
      dailyData[date] = [];
    }
    dailyData[date].push(reading);
  });

  // Map through each day and calculate min/max
  const dailyForecast = Object.entries(dailyData).map(([date, readings]) => {
    const temps = readings.map((r) => r.main.temp);
    const icons = readings.map((r) => r.weather[0].icon);

    return {
      date,
      temp_min: Math.min(...temps).toFixed(1),
      temp_max: Math.max(...temps).toFixed(1),
      icon: icons[Math.floor(icons.length / 2)], // pick middle icon
    };
  });

  return (
    <div className="forecast-panel">
      <h2>5-Day Forecast</h2>
      <div className="forecast-list">
        {dailyForecast.map((day, index) => (
          <div key={index} className="forecast-item">
            <p>
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt="Weather icon"
              className="forecast-icon"
            />
            <p>
              {day.temp_max}°C / {day.temp_min}°C
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast5Day;
