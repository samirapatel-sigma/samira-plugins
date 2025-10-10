import React, { useMemo } from "react";
import PropTypes from "prop-types";
import PivotTableUI from "react-pivottable/PivotTableUI";
import PivotTable from "react-pivottable/PivotTable";
import "react-pivottable/pivottable.css";
// Use local Tailwind + override
import "../index.css";
import data from "../data/dummyData.json";

// Custom aggregator: Sum of price and sum of cost
function makeSumPriceCostAggregator() {
  return function () {
    return {
      sumPrice: 0,
      sumCost: 0,
      push(record) {
        // Defensive: try number conversion
        const p = Number(record.price);
        const c = Number(record.cost);
        this.sumPrice += isNaN(p) ? 0 : p;
        this.sumCost += isNaN(c) ? 0 : c;
      },
      value() {
        return { sumPrice: this.sumPrice, sumCost: this.sumCost };
      },
      format(val) {
        return (
          <>
            <span className="font-semibold text-blue-700">${val.sumPrice}</span>
            <br />
            <span className="text-gray-500 text-xs">Cost:</span> <span className="text-green-600">${val.sumCost}</span>
          </>
        );
      },
      numInputs: 0,
    };
  };
}

const aggregatorTemplates = {
  "Sum of Price & Cost": makeSumPriceCostAggregator,
};

const PivotTableDemo = () => {
  // Keep controls simple and hidden, show static pivot
  // Memoize config to avoid rerendering
  const pivotState = useMemo(
    () => ({
      data,
      rows: ["store_region", "store_state"],
      cols: ["product_type", "product_family"],
      aggregatorName: "Sum of Price & Cost",
      aggregator: makeSumPriceCostAggregator(),
      vals: [],
    }),
    []
  );

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <PivotTable
        data={pivotState.data}
        rows={pivotState.rows}
        cols={pivotState.cols}
        aggregatorName={pivotState.aggregatorName}
        aggregator={pivotState.aggregator}
        rendererName="Table"
      />
      <p className="mt-4 text-gray-700 text-sm">
        <b>Rows:</b> Store Region, Store State &nbsp; |&nbsp;&nbsp;<b>Columns:</b> Product Type, Product Family &nbsp; |&nbsp;&nbsp;<b>Values:</b> Sum of Price &amp; Sum of Cost
      </p>
    </div>
  );
};

PivotTableDemo.propTypes = {};

export default PivotTableDemo;