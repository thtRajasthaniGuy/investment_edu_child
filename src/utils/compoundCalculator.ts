export function calculateCompound(
  principal: number,
  rate: number,
  years: number,
) {
  const n = 365; // daily compounding
  return principal * Math.pow(1 + rate / 100 / n, n * years);
}
