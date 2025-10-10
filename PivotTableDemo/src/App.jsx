import React from 'react';
import PivotTableDemo from './components/PivotTableDemo.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Pivot Table Demo</h1>
      <div className="w-full max-w-6xl">
        <PivotTableDemo />
      </div>
    </div>
  );
}