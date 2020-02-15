import React from 'react';
import RemoveCity from './RemoveCity';
import { Link } from 'react-router-dom';

const CityInfo = ({ cityWeather, remove }) => {
  return cityWeather.map(city => {
    return (
      <div className="container">
        <RemoveCity removeCity={remove} city={city} />
        <Link to={'/' + city.id} className="link-to-graph">
          5 Day Forecast
        </Link>
        <div>
          <h1 className="cityName">
            {city.name}, {city.sys.country}
          </h1>

          <div className="main">
            <h3>{city.weather[0].main}</h3>
            <p>{city.weather[0].description}</p>
          </div>
          <div className="details">
            <p>min temp: {(city.main.temp_min - 273.15).toFixed(2)} °C</p>
            <p>max temp: {(city.main.temp_max - 273.15).toFixed(2)} °C</p>
            <p>
              location: {city.coord.lon}, {city.coord.lat}
            </p>
          </div>
        </div>
      </div>
    );
  });
};
export default CityInfo;
