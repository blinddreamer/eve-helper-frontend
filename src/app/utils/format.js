// One place for number formatting, so every table agrees.

const whole = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const cents = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const upTo2 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

/** ISK: cents only where they matter (under 1,000), e.g. 3.79, 196.90, 147,000,000 */
export function formatIsk(value) {
  if (value == null || Number.isNaN(Number(value))) return "—";
  return Math.abs(value) >= 1000 ? whole.format(value) : cents.format(value);
}

/** Plain quantity/volume with grouping and at most 2 decimals, e.g. 470,000 or 0.02 */
export function formatNumber(value) {
  if (value == null || Number.isNaN(Number(value))) return "—";
  return upTo2.format(value);
}

/** Compact form for summary cards and chart axes: 1.4M, 941.9M, 2.1B */
export function formatCompact(value, digits = 1) {
  if (value == null || Number.isNaN(Number(value))) return "—";
  const abs = Math.abs(value);
  if (abs >= 1e12) return (value / 1e12).toFixed(digits) + "T";
  if (abs >= 1e9) return (value / 1e9).toFixed(digits) + "B";
  if (abs >= 1e6) return (value / 1e6).toFixed(digits) + "M";
  if (abs >= 1e3) return (value / 1e3).toFixed(digits) + "K";
  return upTo2.format(value);
}
