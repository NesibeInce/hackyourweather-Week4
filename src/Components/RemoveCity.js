import React from 'react';

function RemoveCity({ removeCity, city }) {
  return (
    <div className="cross">
      <p onClick={() => removeCity(city.id)}>
        <span>&#10060;</span>
      </p>
    </div>
  );
}

export default RemoveCity;
