import React, { useState, useEffect } from 'react';
import PivotTable from './components/PivotTable';
import './App.css';

function App() {
  // Simulate loading state
  const [loading, setLoading] = useState(true);
  // In a real use, error could be set on fetch failure
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="center-container">
      <div className="hello-pinkbox">
        <h2 className="hello-title">Simple Pivot Table</h2>
        {loading ? (
          <div className="pivot-loading">Loading data...</div>
        ) : error ? (
          <div className="pivot-error">Error: {error}</div>
        ) : (
          <PivotTable />
        )}
      </div>
    </div>
  );
}

export default App;