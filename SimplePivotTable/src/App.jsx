import React from 'react';
import PivotTable from './components/PivotTable';
import usePivotData from './hooks/usePivotData';

export default function App() {
  const { pivot, products, regions, loading, error } = usePivotData();

  if (loading) return <div>Loading pivot table...</div>;
  if (error) return <div style={{color:'red'}}>Error: {error}</div>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', background: '#fafbfc', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '1rem' }}>Sales Pivot Table (Product x Region)</h2>
      <PivotTable data={pivot} rowLabels={products} colLabels={regions} />
    </div>
  );
}