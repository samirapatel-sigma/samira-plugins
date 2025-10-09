import React from 'react';
import Legend from './Legend.jsx';
import { pieColors } from '../utils/pieColors.js';

const PieChart = ({ data }) => {
  // chart dimensions
  const width = 340, height = 340;
  const cx = width / 2, cy = height / 2, radius = 120;

  // Value sum
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Calculate SVG path for each segment
  let cumulative = 0;
  const segments = data.map((segment, i) => {
    const valuePercent = segment.value / total;
    const startAngle = cumulative * 2 * Math.PI;
    const endAngle = (cumulative + valuePercent) * 2 * Math.PI;
    cumulative += valuePercent;

    // convert angle to x,y on circle
    const x1 = cx + radius * Math.cos(startAngle - Math.PI/2);
    const y1 = cy + radius * Math.sin(startAngle - Math.PI/2);
    const x2 = cx + radius * Math.cos(endAngle - Math.PI/2);
    const y2 = cy + radius * Math.sin(endAngle - Math.PI/2);
    // large arc flag
    const largeArcFlag = valuePercent > 0.5 ? 1 : 0;

    const d = [
      `M ${cx} ${cy}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z',
    ].join(' ');

    return (
      <path
        key={segment.label}
        d={d}
        fill={pieColors[i % pieColors.length]}
        stroke="#fff"
        strokeWidth="2"
      >
        <title>{segment.label}: {segment.value}</title>
      </path>
    );
  });

  return (
    <div className="pie-chart-wrapper">
      <svg width={width} height={height} className="pie-chart">
        {segments}
      </svg>
      <Legend data={data} />
    </div>
  );
};

export default PieChart;