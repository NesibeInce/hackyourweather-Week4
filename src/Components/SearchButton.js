import React, { useState } from 'react';

function SearchButton({ getCity }) {
  const [city, setCity] = useState();
  function onChange(e) {
    setCity(e.target.value);
  }
  function submitCity(e) {
    if (!city) {
    } else {
      e.preventDefault();
      getCity(city);
      setCity(' ');
    }
  }
  return (
    <div className="searchButton">
      <input
        placeholder="Search City"
        value={city}
        required
        onChange={onChange}
        className="search"
      />
      <button onClick={submitCity} className="button">
        Search
      </button>
    </div>
  );
}
export default SearchButton;
