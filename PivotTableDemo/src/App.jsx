import React from 'react';
import data from './data/dummydata.json';
import PivotTableDemo from './components/PivotTableDemo.jsx';

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <PivotTableDemo data={data} />
    </div>
  );
};

export default App;