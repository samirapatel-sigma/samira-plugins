import React from 'react';
import PivotTable from './components/PivotTable.jsx';
import data from './data/dummydata.json';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-center mt-6">Store Sales Pivot Table Demo</h1>
      <p className="text-gray-600 mb-4 text-center max-w-2xl">
        Pivot table summarizes store sales data by Region/State and Product Type/Family,<br />
        showing both the <b>Sum of Price</b> and <b>Sum of Cost</b> for each combination.
      </p>
      <PivotTable data={data} />
      <div className="mt-8 text-xs text-center text-gray-400">Powered by react-pivottable</div>
    </div>
  );
}