import React from 'react';
import { pieColors } from '../utils/pieColors.js';

const Legend = ({ data }) => (
  <ul className="legend">
    {data.map((seg, idx) => (
      <li key={seg.label} className="legend-item">
        <span
          className="legend-color"
          style={{ backgroundColor: pieColors[idx % pieColors.length] }}
        />
        <span className="legend-label">{seg.label}</span> (<span className="legend-value">{seg.value}</span>)
      </li>
    ))}
  </ul>
);

export default Legend;