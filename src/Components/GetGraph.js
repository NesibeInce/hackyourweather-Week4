import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const GetGraph = () => {
  const { cityId } = useParams();
  const history = useHistory();
  const back = () => history.goBack();

  const [loading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const [graphData, setGraphData] = useState({});
  function fetchGraphData() {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`,
    )
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        setGraphData(data);
      })
      .catch(err => {
        setLoading(false);
        setError(true);
      });
  }
  useEffect(fetchGraphData, []);

  if (loading) return <h4>Loading</h4>;

  return (
    <div className="graph">
      <h3>
        {graphData.city && graphData.city.name}, {graphData.city && graphData.city.country} - 5 Days
        Forecast
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={graphData.list} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="dt_txt" />
          <YAxis dataKey="main.temp" />
          <Tooltip />
          <Area
            type="monotone "
            dataKey="main.temp"
            name="main temperature"
            stroke="#3ab672"
            fill="#354cd8"
          />
        </AreaChart>
      </ResponsiveContainer>
      <button onClick={back}>Back</button>
    </div>
  );
};

export default GetGraph;
