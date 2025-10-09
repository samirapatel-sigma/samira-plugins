import { useEffect, useState } from 'react';

export function usePieChartData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // simulate fetch with setTimeout
    setLoading(true);
    setError(null);
    const t = setTimeout(() => {
      try {
        // DUMMY DATA
        setData([
          { label: 'Sales', value: 36 },
          { label: 'Marketing', value: 22 },
          { label: 'Development', value: 28 },
          { label: 'Support', value: 14 },
          { label: 'HR', value: 9 },
        ]);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data.');
        setLoading(false);
      }
    }, 700);
    return () => clearTimeout(t);
  }, []);

  return { data, loading, error };
}