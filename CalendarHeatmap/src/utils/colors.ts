// Returns a color based on value position between min and max (5 shade scale green)
export function getColorForValue(
  value: number,
  min: number,
  max: number
): string {
  if (max === min) return '#9be9a8';
  const percent = (value - min) / (max - min);
  if (percent === 0) return '#ebedf0';
  if (percent < 0.25) return '#c6e48b';
  if (percent < 0.5) return '#7bc96f';
  if (percent < 0.75) return '#239a3b';
  return '#196127';
}