import React, { useState, useEffect } from 'react';
import PieChart from './components/PieChart.jsx';
import { usePieChartData } from './hooks/usePieChartData.js';

const App = () => {
  const { data, loading, error } = usePieChartData();

  return (
    <div className="app-container">
      <h1>Radial Pie Chart</h1>
      {loading && <div className="loader">Loading chart...</div>}
      {error && <div className="error">{error}</div>}
      {data && <PieChart data={data} />}
    </div>
  );
};

export default App;