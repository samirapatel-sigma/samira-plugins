import React from 'react';
import PropTypes from 'prop-types';
import 'pivottable/pivot.css';
import { PivotTableUI } from 'react-pivottable';

/**
 * A wrapper for react-pivottable to display a preconfigured pivot table.
 */
const PivotTable = ({ data }) => {
  const [pivotState, setPivotState] = React.useState({
    data,
    rows: ['Store region', 'Store state'],
    cols: ['Product type', 'Product family'],
    aggregatorName: 'Sum over Sum',
    vals: ['price', 'cost'],
    rendererName: 'Table',
    rendererOptions: {
      table: { clickCallback: null }
    }
  });

  // Hide unused options, lock rows, cols, aggregator, renderer
  return (
    <div className="pivot-table-wrap">
      <PivotTableUI
        data={data}
        {...pivotState}
        onChange={() => {}}
        rows={pivotState.rows}
        cols={pivotState.cols}
        aggregatorName={pivotState.aggregatorName}
        vals={pivotState.vals}
        rendererName={pivotState.rendererName}
        renderers={{}}
        hiddenFromDragDrop={["Store region", "Store state", "Product type", "Product family", "price", "cost"]} // disables changing axes
      />
    </div>
  );
};

PivotTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PivotTable;