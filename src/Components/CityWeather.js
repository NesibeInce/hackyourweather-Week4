import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CityInfo from './CityInfo';
import SearchButton from './SearchButton';
import GetGraph from './GetGraph';

const CityWeather = () => {
  const [cityWeather, setCityWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const [entry, setEntry] = useState('Enter the city name to get the weather');

  function getCity(city) {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`,
    )
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        const cities = cityWeather.filter(city => city.id !== data.id);
        if (data.cod === 200) {
          setCityWeather([data, ...cities]);
        }
        if (data.cod !== 200) setEntry(`City Not Found, check the spelling for " ${city} "`);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
      });
  }

  function removeCity(id) {
    const cities = cityWeather.filter(city => city.id !== id);
    setCityWeather(cities);
  }
  if (loading) {
    return <h3>Loading...</h3>;
  } else {
    return (
      <Router>
        <Route exact path="/">
          <div>
            <h4>{entry}</h4>
            <SearchButton getCity={getCity} />
            {cityWeather && <CityInfo cityWeather={cityWeather} remove={removeCity} />}
          </div>
        </Route>
        <Route exact path="/:cityId">
          <GetGraph />
        </Route>
      </Router>
    );
  }
};

export default CityWeather;
