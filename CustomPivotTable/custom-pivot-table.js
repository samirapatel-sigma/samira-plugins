(function(){
  // ---- Configuration ----
  const pos = {
    x: 1, // left in grid units
    y: 1, // top in grid units
    w: 12, // width units
    h: 20 // height units
  };
  // Set cell size (arbitrary, in px)
  const CELL = 48;
  const tableContainerId = 'pivot-table-plugin-KkOQSqVjFr';

  // ---- Dummy Data ----
  const dummyData = [
    { region: 'West',  state: 'CA',  productType: 'Gadget', productFamily: 'Pro',   price: 219, cost: 119 },
    { region: 'West',  state: 'CA',  productType: 'Gadget', productFamily: 'Std',   price: 194, cost: 83 },
    { region: 'West',  state: 'NV',  productType: 'Gadget', productFamily: 'Std',   price: 203, cost: 91 },
    { region: 'West',  state: 'NV',  productType: 'Widget', productFamily: 'Pro',   price: 482, cost: 392 },
    { region: 'East',  state: 'NY',  productType: 'Widget', productFamily: 'Std',   price: 284, cost: 175 },
    { region: 'East',  state: 'NY',  productType: 'Gadget', productFamily: 'Std',   price: 160, cost: 70 },
    { region: 'East',  state: 'FL',  productType: 'Widget', productFamily: 'Std',   price: 315, cost: 201 },
    { region: 'East',  state: 'FL',  productType: 'Widget', productFamily: 'Pro',   price: 414, cost: 310 },
    { region: 'South', state: 'TX',  productType: 'Gadget', productFamily: 'Std',   price: 98,  cost: 47 },
    { region: 'South', state: 'TX',  productType: 'Widget', productFamily: 'Std',   price: 122, cost: 61 },
    { region: 'South', state: 'GA',  productType: 'Widget', productFamily: 'Pro',   price: 310, cost: 197 },
    { region: 'South', state: 'GA',  productType: 'Gadget', productFamily: 'Pro',   price: 141, cost: 59 },
    { region: 'North', state: 'IL',  productType: 'Widget', productFamily: 'Std',   price: 154, cost: 81 },
    { region: 'North', state: 'OH',  productType: 'Gadget', productFamily: 'Std',   price: 134, cost: 53 },
    { region: 'North', state: 'IL',  productType: 'Gadget', productFamily: 'Pro',   price: 154, cost: 76 },
    { region: 'North', state: 'OH',  productType: 'Widget', productFamily: 'Pro',   price: 174, cost: 101 }
  ];

  // ---- Pivot setup ----
  const rowFields = ['region', 'state'];
  const colFields = ['productType', 'productFamily'];
  const valueFields = [
    { name: 'Sum of price', accessor: d => d.price },
    { name: 'Sum of cost', accessor: d => d.cost }
  ];

  // Utility for deduplication
  function unique(arr) {
    return Array.from(new Set(arr));
  }
  
  // Build row header value arrays
  function buildHeaderHierarchy(data, fields) {
    if (fields.length === 0) return [];
    const results = {};
    data.forEach(row => {
      let node = results;
      for (let f = 0; f < fields.length; f++) {
        const val = row[fields[f]];
        if (!node[val]) node[val] = (f === fields.length - 1 ? true : {});
        node = node[val];
      }
    });
    // Convert nested object to array tree
    function flattenTree(obj) {
      return Object.keys(obj).map(k => {
        if (obj[k] === true) return { value: k };
        return { value: k, children: flattenTree(obj[k]) };
      });
    }
    return flattenTree(results);
  }

  // Build all headers (flattened code)
  function getHeaderPaths(headerArr, depth = 0, prefix = []) {
    if (!headerArr) return [];
    let out = [];
    if (headerArr.length === 0) return [prefix];
    headerArr.forEach(row => {
      if (row.children) {
        out = out.concat(getHeaderPaths(row.children, depth + 1, [...prefix, row.value]));
      } else {
        out.push([...prefix, row.value]);
      }
    });
    return out;
  }

  // All row/col keys
  const rowHeaders = buildHeaderHierarchy(dummyData, rowFields);
  const rowHeaderPaths = getHeaderPaths(rowHeaders); // e.g. [['West','CA'], ...]
  const colHeaders = buildHeaderHierarchy(dummyData, colFields);
  const colHeaderPaths = getHeaderPaths(colHeaders); // e.g. [['Gadget','Pro'], ...]

  // ---- Pivot Aggregation ----
  // Map: {rowKey,colKey}:{sumPrice, sumCost}
  const cellMap = {};
  rowHeaderPaths.forEach(rk => {
    colHeaderPaths.forEach(ck => {
      // filter rows matching these keys
      const values = dummyData.filter(row => (
        rowFields.every((f, i) => row[f] === rk[i]) &&
        colFields.every((f, i) => row[f] === ck[i])
      ));
      cellMap[rk.join('|') + '::' + ck.join('|')] = valueFields.map(field => (
        values.reduce((sum, row) => sum + field.accessor(row), 0)
      ));
    });
  });

  // Totals
  const grandTotals = valueFields.map((field, i) => (
    dummyData.reduce((sum, row) => sum + field.accessor(row), 0)
  ));

  // ---- Render Functions ----
  const table = document.createElement('table');
  table.style.borderCollapse = 'collapse';
  table.style.width = '100%';
  table.style.background = 'white';
  table.style.fontFamily = 'sans-serif';
  table.style.fontSize = '14px';
  table.style.boxShadow = '0 2px 10px #2222';

  // -- Column Headers (2 levels, plus value columns as innermost)
  const thead = document.createElement('thead');

  // First col header row (Product type, spanning families and value fields)
  const tr1 = document.createElement('tr');
  // Empty corner for row headers:
  for (let i = 0; i < rowFields.length; i++) {
    const th = document.createElement('th');
    if (i === 0) th.rowSpan = 2;
    else th.style.display = 'none';
    th.style.border = '1px solid #ccc';
    th.style.background = '#f8f8f8';
    th.style.padding = '6px 10px';
    if (i === 0) th.textContent = rowFields[0].replace(/./,c=>c.toUpperCase());
    tr1.appendChild(th);
  }
  // Product type headers
  let lastType = null;
  colHeaders.forEach(typeNode => {
    const countFamilies = typeNode.children.length;
    const th = document.createElement('th');
    th.colSpan = countFamilies * valueFields.length;
    th.style.border = '1px solid #ccc';
    th.style.background = '#f0f0ff';
    th.style.padding = '6px 7px';
    th.textContent = typeNode.value;
    tr1.appendChild(th);
  });
  thead.appendChild(tr1);

  // Second header row (Product family * valueFields)
  const tr2 = document.createElement('tr');
  for (let i = 1; i < rowFields.length; i++) {
    const th = document.createElement('th');
    th.style.border = '1px solid #ccc';
    th.style.background = '#f8f8f8';
    th.style.padding = '6px 10px';
    th.textContent = rowFields[i].replace(/./,c=>c.toUpperCase());
    tr2.appendChild(th);
  }
  colHeaders.forEach(typeNode => {
    typeNode.children.forEach(famNode => {
      valueFields.forEach(fld => {
        const th = document.createElement('th');
        th.style.border = '1px solid #ccc';
        th.style.background = '#e0e0f8';
        th.style.padding = '6px 8px';
        th.textContent = famNode.value + "\n" + fld.name.replace('Sum of ','');
        th.title = `${famNode.value} - ${fld.name}`;
        tr2.appendChild(th);
      });
    });
  });
  thead.appendChild(tr2);

  table.appendChild(thead);

  // --- Table Body ---
  const tbody = document.createElement('tbody');
  rowHeaderPaths.forEach(rk => {
    const tr = document.createElement('tr');
    rk.forEach((cell, i) => {
      // Only render row header if it's the first row for its value
      let show = true;
      if (i > 0) {
        let prevKeys = rk.slice(0, i+1).join('|');
        let alreadyShown = false;
        for (let j = 0; j < tbody.childNodes.length; j++) {
          let prevRk = rowHeaderPaths[j];
          if (prevRk.slice(0,i+1).join('|') === prevKeys && j !== rowHeaderPaths.indexOf(rk)) {
            alreadyShown = true;
            break;
          }
        }
        if (alreadyShown) show = false;
      }
      if (show) {
        const th = document.createElement('th');
        th.style.border = '1px solid #ccc';
        th.style.background = '#f8f8f8';
        th.style.padding = '6px 10px';
        th.style.textAlign = 'left';
        th.rowSpan = 1; // At this scale only one row per combo
        th.textContent = cell;
        tr.appendChild(th);
      } else {
        // Don't render (handled semantically for accessibility)
      }
    });
    colHeaderPaths.forEach(ck => {
      const key = rk.join('|') + '::' + ck.join('|');
      const vals = cellMap[key];
      valueFields.forEach((fld, idx) => {
        const td = document.createElement('td');
        td.style.border = '1px solid #ddd';
        td.style.padding = '5px 8px';
        td.style.textAlign = 'right';
        td.textContent = vals[idx] ? vals[idx].toLocaleString() : '';
        td.style.background = idx%2===0?'#fff':'#f8faff';
        tr.appendChild(td);
      });
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  // --- Totals Row ---
  const tfoot = document.createElement('tfoot');
  const trf = document.createElement('tr');
  const thf = document.createElement('th');
  thf.colSpan = rowFields.length;
  thf.textContent = 'Grand total';
  thf.style.textAlign = 'center';
  thf.style.border = '1px solid #ccc';
  thf.style.background = '#e8e8ff';
  trf.appendChild(thf);
  colHeaderPaths.forEach(ck => {
    // For each value field, sum across all row keys
    valueFields.forEach((fld, idx) => {
      let sum = 0;
      rowHeaderPaths.forEach(rk => {
        const vals = cellMap[rk.join('|') + '::' + ck.join('|')];
        sum += vals[idx];
      });
      const tdf = document.createElement('td');
      tdf.style.border = '1px solid #aaa';
      tdf.style.fontWeight = 'bold';
      tdf.style.background = '#eaf2ea';
      tdf.style.textAlign = 'right';
      tdf.textContent = sum ? sum.toLocaleString() : '';
      trf.appendChild(tdf);
    });
  });
  tfoot.appendChild(trf);
  table.appendChild(tfoot);

  // --- Layout (absolute placement and sizing) ---
  let container = document.getElementById(tableContainerId);
  if (!container) {
    container = document.createElement('div');
    container.id = tableContainerId;
    container.style.position = 'absolute';
    container.style.left = (pos.x * CELL) + 'px';
    container.style.top = (pos.y * CELL) + 'px';
    container.style.width = (pos.w * CELL) + 'px';
    container.style.height = (pos.h * CELL) + 'px';
    container.style.overflow = 'auto';
    container.style.boxSizing = 'border-box';
    container.style.background = '#f6f8fa';
    document.body.appendChild(container);
  } else {
    container.innerHTML = '';
  }
  container.appendChild(table);

  // --- End plugin ---
})();

// Usage: <script src="custom-pivot-table.js"></script> in the <body> of your HTML