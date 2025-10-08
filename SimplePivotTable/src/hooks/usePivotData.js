import { useState, useEffect } from 'react';
import { buildPivot } from '../utils/pivot';

const DUMMY_DATA = [
  { Product: 'Widget', Region: 'North', Sales: 120 },
  { Product: 'Widget', Region: 'South', Sales: 85 },
  { Product: 'Widget', Region: 'East',  Sales: 70 },
  { Product: 'Gadget', Region: 'North', Sales: 100 },
  { Product: 'Gadget', Region: 'East',  Sales: 56 },
  { Product: 'Gadget', Region: 'West',  Sales: 178 },
  { Product: 'Doohickey', Region: 'South', Sales: 49 },
  { Product: 'Doohickey', Region: 'East',  Sales: 37 },
  { Product: 'Doohickey', Region: 'West',  Sales: 142 },
  { Product: 'Widget', Region: 'West', Sales: 132 },
];

export default function usePivotData() {
  const [pivot, setPivot] = useState({});
  const [products, setProducts] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Simulate async fetch
      setTimeout(() => {
        const uniqueProducts = Array.from(new Set(DUMMY_DATA.map(row => row.Product)));
        const uniqueRegions = Array.from(new Set(DUMMY_DATA.map(row => row.Region)));
        setProducts(uniqueProducts);
        setRegions(uniqueRegions);
        setPivot(buildPivot(DUMMY_DATA, 'Product', 'Region', 'Sales'));
        setLoading(false);
      }, 400);
    } catch (e) {
      setError('Failed to prepare data');
      setLoading(false);
    }
  }, []);

  return { pivot, products, regions, loading, error };
}