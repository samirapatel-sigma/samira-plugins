import React from 'react';
import PropTypes from 'prop-types';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';

/**
 * PivotTableDemo renders a pivot table from dummy data.
 * Props:
 *   data: Array of objects, where each object has keys:
 *     region, state, productType, productFamily, price, cost
 */
const PivotTableDemo = ({ data }) => {
  const [pivotState, setPivotState] = React.useState({
    data: data.map(row => [
      row.region,
      row.state,
      row.productType,
      row.productFamily,
      row.price,
      row.cost
    ]),
    rows: ['Store Region', 'Store State'],
    cols: ['Product Type', 'Product Family'],
    aggregatorName: 'Sum',
    vals: ['Price', 'Cost'],
    valueFilter: {},
    rendererName: 'Table',
    unusedOrientationCutoff: 100,
    sorters: {},
    hiddenAttributes: [],
    hiddenFromAggregators: [],
    hiddenFromDragDrop: [],
    menuLimit: 500
  });

  // react-pivottable expects array-of-arrays for raw data, and a header row for columns
  const allRows = [
    ['Store Region', 'Store State', 'Product Type', 'Product Family', 'Price', 'Cost'],
    ...pivotState.data
  ];

  return (
    <div className="max-w-full overflow-x-auto bg-white p-6 rounded shadow mt-6">
      <PivotTableUI
        data={allRows}
        rows={['Store Region', 'Store State']}
        cols={['Product Type', 'Product Family']}
        vals={['Price', 'Cost']}
        aggregatorName="Sum"
        renderers={{...PivotTableUI.renderers}}
        rendererName="Table"
        onChange={()=>{}} // UI is locked since structure is fixed
        unusedOrientationCutoff={100}
        menuLimit={500}
        {...pivotState}
        onChange={() => {}} // prevent changing config through UI
      />
    </div>
  );
};

PivotTableDemo.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      region: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      productType: PropTypes.string.isRequired,
      productFamily: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      cost: PropTypes.number.isRequired
    })
  ).isRequired
};

export default PivotTableDemo;