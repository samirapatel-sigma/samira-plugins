import React from 'react';
import PropTypes from 'prop-types';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';

/**
 * Wrapper component for Pivot Table
 * @param {Array} data - The array of records
 */
const PivotTableDemo = ({ data }) => {
  const [state, setState] = React.useState({
    data,
    rows: ['Store Region', 'Store State'],
    cols: ['Product Type', 'Product Family'],
    aggregatorName: 'Sum',
    vals: ['Price', 'Cost'],
    rendererName: 'Table',
  });

  return (
    <div className="px-2 md:px-6 py-6 bg-white rounded shadow-lg">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Pivot Table Demo</h1>
      <PivotTableUI
        data={data}
        {...state}
        onChange={s => setState(s)}
        renderers={PivotTableUI.renderers}
      />
      <p className="mt-4 text-gray-600 text-sm">
        <strong>Rows:</strong> Store Region, Store State. <strong>Columns:</strong> Product Type, Product Family.<br/>
        <strong>Values:</strong> Sum of Price, Sum of Cost.
      </p>
    </div>
  );
};

PivotTableDemo.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PivotTableDemo;