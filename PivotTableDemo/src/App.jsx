import React from 'react';
import PivotTableDemo from './components/PivotTableDemo.jsx';
import dummyData from './data/dummyData.js';

export default function App() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Pivot Table Demo</h1>
      <p className="mb-4 text-gray-600">Rows: Store region, Store state; Columns: Product type, Product family; Values: Sum of price, Sum of cost.</p>
      <PivotTableDemo data={dummyData} />
    </main>
  );
}