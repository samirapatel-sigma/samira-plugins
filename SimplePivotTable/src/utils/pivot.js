export function buildPivot(dataRows, rowKey, colKey, valueKey) {
  // Build:
  // { [row]: { [col]: sum } }
  const pivot = {};
  for (const row of dataRows) {
    const prod = row[rowKey];
    const reg = row[colKey];
    const val = row[valueKey];
    if (!pivot[prod]) pivot[prod] = {};
    pivot[prod][reg] = (pivot[prod][reg] || 0) + val;
  }
  return pivot;
}