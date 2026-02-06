// Investment calculation utility functions

export interface InvestmentStats {
  total: number;
  gained: number;
  dailyGain: number;
  weeklyGain: number;
  monthlyGain: number;
  daysElapsed: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  day: number;
}

/**
 * Calculate compound interest investment stats
 */
export function calcInvestment(
  amount: number,
  rate: number,
  startDate: string,
): InvestmentStats {
  const start = new Date(startDate);
  const now = new Date();
  const days = Math.max(
    0,
    Math.floor((now.getTime() - start.getTime()) / 86400000),
  );
  const years = days / 365;

  const total = amount * Math.pow(1 + rate / 100, years);
  const dailyGain = amount * Math.pow(1 + rate / 100, (days - 1) / 365);
  const weeklyGain =
    amount * Math.pow(1 + rate / 100, Math.max(0, days - 7) / 365);
  const monthlyGain =
    amount * Math.pow(1 + rate / 100, Math.max(0, days - 30) / 365);

  return {
    total,
    gained: total - amount,
    dailyGain: total - dailyGain,
    weeklyGain: total - weeklyGain,
    monthlyGain: total - monthlyGain,
    daysElapsed: days,
  };
}

/**
 * Generate chart data points for investment growth
 */
export function genChartData(
  amount: number,
  rate: number,
  startDate: string,
): ChartDataPoint[] {
  const start = new Date(startDate);
  const now = new Date();
  const totalDays = Math.max(
    1,
    Math.floor((now.getTime() - start.getTime()) / 86400000),
  );
  const points = Math.min(totalDays, 60);
  const step = Math.max(1, Math.floor(totalDays / points));
  const data: ChartDataPoint[] = [];

  for (let i = 0; i <= points; i++) {
    const d = i * step;
    const val = amount * Math.pow(1 + rate / 100, d / 365);
    const date = new Date(start.getTime() + d * 86400000);
    data.push({
      label: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      value: parseFloat(val.toFixed(2)),
      day: d,
    });
  }

  return data;
}
