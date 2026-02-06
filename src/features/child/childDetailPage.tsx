import { useParams, useNavigate } from "react-router-dom";
import { useChildStore } from "../../store/childStore";
import Header from "../../components/Header";
import { calcInvestment, genChartData } from "../../utils/calculations";
import { CURRENCIES } from "../../Constants/index";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChildDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const children = useChildStore((s) => s.children);

  const child = children.find((c) => c.id === id);

  if (!child) {
    return (
      <div className="min-h-screen px-5 pt-7 bg-[#f0f4f3]">
        <Header title="Child Not Found" />
        <div className="max-w-[680px] mx-auto">
          <p className="text-gray-500 text-center mt-10">Child not found.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 w-full bg-transparent border-[1.5px] border-gray-200 rounded-xl py-2.5 text-gray-500 text-[13px] font-semibold hover:bg-gray-100 transition-all duration-150 cursor-pointer"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const stats = calcInvestment(child.amount, child.rate, child.startDate);
  const chartData = genChartData(child.amount, child.rate, child.startDate);
  const gainPct = child.amount > 0 ? (stats.gained / child.amount) * 100 : 0;

  return (
    <div className="min-h-screen px-5 pt-7 pb-24 bg-[#f0f4f3]">
      <Header title={`${child.name}'s Portfolio`} />

      <div className="max-w-[680px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-14 h-14 rounded-[17px] bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center text-[26px] font-bold text-green-600">
            {child.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-[22px] font-bold text-gray-800 m-0">
              {child.name}'s Portfolio
            </h1>
            <p className="text-[13px] text-gray-400 m-0">
              Age {child.age || "N/A"} · Started{" "}
              {new Date(child.startDate).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Value banner */}
        <div className="bg-gradient-to-br from-[#2d8a4e] to-[#3a7ab4] rounded-[20px] px-6 py-6 text-white mb-5 shadow-[0_6px_20px_rgba(45,138,78,0.28)]">
          <p className="text-[11px] opacity-70 uppercase tracking-wide m-0">
            Current Value
          </p>
          <p
            className="text-[32px] font-normal my-1.5"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {child.currency}
            {stats.total.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <span className="inline-block bg-white/[0.18] rounded-2xl px-3 py-1 text-[13px] font-semibold">
            ▲ +{gainPct.toFixed(2)}% ({child.currency}
            {stats.gained.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            )
          </span>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-[20px] px-4 pt-5 pb-3 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-gray-100 mb-[18px]">
          <p className="text-[13px] font-semibold text-gray-600 mb-3 pl-1">
            Growth Over Time
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 5, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38a05c" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#38a05c" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#dde2e2"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10, fill: "#8c9898" }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#8c9898" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) =>
                  `${child.currency}${Number(v).toLocaleString()}`
                }
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #dde2e2",
                  fontSize: 13,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                formatter={(val: any) => [
                  `${child.currency}${Number(val).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}`,
                  "Value",
                ]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#38a05c"
                strokeWidth={2.5}
                fill="url(#colorVal)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#38a05c",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-[18px]">
          {[
            {
              label: "Initial Investment",
              val: `${child.currency}${child.amount.toLocaleString()}`,
              icon: "💵",
            },
            {
              label: "Total Gained",
              val: `${child.currency}${stats.gained.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`,
              icon: "📈",
            },
            {
              label: "Daily Gain",
              val: `${child.currency}${stats.dailyGain.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`,
              icon: "☀️",
            },
            {
              label: "Monthly Gain",
              val: `${child.currency}${stats.monthlyGain.toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )}`,
              icon: "📅",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-gray-100"
            >
              <p className="text-lg m-0 mb-1.5">{item.icon}</p>
              <p className="text-[10.5px] text-gray-400 m-0 uppercase tracking-wide">
                {item.label}
              </p>
              <p className="text-[15px] font-bold text-gray-800 mt-1 m-0">
                {item.val}
              </p>
            </div>
          ))}
        </div>

        {/* Extra info card */}
        <div className="bg-white rounded-2xl px-[18px] py-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-gray-100 mb-5">
          <div className="flex justify-between">
            <span className="text-[12.5px] text-gray-400">Days Elapsed</span>
            <span className="text-[13px] font-semibold text-gray-700">
              {stats.daysElapsed} days
            </span>
          </div>
          <div className="flex justify-between mt-2.5 pt-2.5 border-t border-gray-100">
            <span className="text-[12.5px] text-gray-400">Annual Rate</span>
            <span className="text-[13px] font-semibold text-green-600">
              {child.rate}%
            </span>
          </div>
          <div className="flex justify-between mt-2.5 pt-2.5 border-t border-gray-100">
            <span className="text-[12.5px] text-gray-400">Currency</span>
            <span className="text-[13px] font-semibold text-gray-700">
              {CURRENCIES.find((c) => c.symbol === child.currency)?.label ||
                child.currency}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-transparent border-[1.5px] border-gray-200 rounded-[13px] py-[11px] text-gray-500 text-[13px] font-semibold hover:bg-gray-100 transition-all duration-150 cursor-pointer"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
