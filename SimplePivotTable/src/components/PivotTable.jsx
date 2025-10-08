import React from 'react';
import PropTypes from 'prop-types';
import './PivotTable.css';

export default function PivotTable({ data, rowLabels, colLabels }) {
  // data: { [product]: { [region]: salesNumber } }

  // Totals per product
  const rowTotals = rowLabels.map(product =>
    colLabels.reduce((acc, region) => acc + (data[product]?.[region] ?? 0), 0)
  );
  // Totals per region
  const colTotals = colLabels.map(region =>
    rowLabels.reduce((acc, product) => acc + (data[product]?.[region] ?? 0), 0)
  );
  const grandTotal = rowTotals.reduce((a, b) => a + b, 0);

  return (
    <table className="pivot-table">
      <thead>
        <tr>
          <th>Product \ Region</th>
          {colLabels.map(region => <th key={region}>{region}</th>)}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {rowLabels.map((product, idx) => (
          <tr key={product}>
            <td><b>{product}</b></td>
            {colLabels.map(region => (
              <td key={region}>
                {data[product]?.[region] ?? 0}
              </td>
            ))}
            <td><b>{rowTotals[idx]}</b></td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td><b>Total</b></td>
          {colTotals.map((total, idx) => (
            <td key={colLabels[idx]}><b>{total}</b></td>
          ))}
          <td><b>{grandTotal}</b></td>
        </tr>
      </tfoot>
    </table>
  );
}

PivotTable.propTypes = {
  data: PropTypes.object.isRequired,
  rowLabels: PropTypes.array.isRequired,
  colLabels: PropTypes.array.isRequired
};