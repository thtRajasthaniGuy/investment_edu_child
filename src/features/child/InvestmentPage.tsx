import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useChildStore } from "../../store/childStore";
import { calcInvestment } from "../../utils/calculations";

export default function InvestmentsPage() {
  const navigate = useNavigate();
  const children = useChildStore((s) => s.children);

  const totalInvested = children.reduce((s, c) => s + c.amount, 0);
  const totalNow = children.reduce((s, c) => {
    const stats = calcInvestment(c.amount, c.rate, c.startDate);
    return s + stats.total;
  }, 0);
  const totalGain = totalNow - totalInvested;

  return (
    <div className="min-h-screen px-5 pt-7 pb-24 bg-[#f0f4f3]">
      <Header title="Investments" />

      <div className="max-w-[680px] mx-auto">
        <h1
          className="text-2xl font-normal text-gray-800 mb-1"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Investments
        </h1>
        <p className="text-[13px] text-gray-400 mb-5">
          Overview of all children's portfolios
        </p>

        {children.length === 0 ? (
          <div className="bg-white rounded-[18px] p-10 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <p className="text-gray-400 text-sm">No investments to show yet.</p>
          </div>
        ) : (
          <>
            {/* Summary card */}
            <div className="bg-gradient-to-br from-[#2d8a4e] to-[#3a7ab4] rounded-[20px] px-6 py-[22px] text-white mb-[22px] shadow-[0_6px_20px_rgba(45,138,78,0.3)]">
              <p className="text-[11.5px] opacity-75 uppercase tracking-wide m-0">
                Total Portfolio Value
              </p>
              <p
                className="text-[28px] font-normal my-1.5"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                $
                {totalNow.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-[13px] opacity-85 m-0">
                +$
                {totalGain.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                gained · {children.length} child
                {children.length !== 1 ? "ren" : ""}
              </p>
            </div>

            {/* Individual cards */}
            <div className="flex flex-col gap-3">
              {children.map((child, i) => {
                const s = calcInvestment(
                  child.amount,
                  child.rate,
                  child.startDate,
                );
                return (
                  <div
                    key={child.id}
                    className="bg-white rounded-[18px] px-5 py-[18px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_4px_12px_rgba(0,0,0,0.10)] transition-shadow duration-200 cursor-pointer"
                    style={{
                      animation: `cardIn 0.3s ease ${i * 0.07}s both`,
                    }}
                    onClick={() => navigate(`/child/${child.id}`)}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-[38px] h-[38px] rounded-[11px] bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center text-[17px] font-bold text-green-600">
                          {child.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[15px] font-semibold text-gray-800 m-0">
                            {child.name}
                          </p>
                          <p className="text-[11.5px] text-gray-400 m-0">
                            {s.daysElapsed} days · {child.rate}%/yr
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-blue-500 font-semibold">
                        View →
                      </span>
                    </div>

                    {/* Mini stats row */}
                    <div className="flex gap-3 justify-between pt-2.5 border-t border-gray-100">
                      {[
                        {
                          label: "Invested",
                          val: `${child.currency}${child.amount.toLocaleString()}`,
                        },
                        {
                          label: "Current",
                          val: `${child.currency}${s.total.toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            },
                          )}`,
                        },
                        {
                          label: "Gained",
                          val: `${child.currency}${s.gained.toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            },
                          )}`,
                          green: true,
                        },
                      ].map((item) => (
                        <div key={item.label} className="flex-1 text-center">
                          <p className="text-[10.5px] text-gray-400 m-0 uppercase tracking-wide">
                            {item.label}
                          </p>
                          <p
                            className={`text-[13px] font-semibold mt-0.5 m-0 ${
                              item.green ? "text-green-600" : "text-gray-700"
                            }`}
                          >
                            {item.val}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-transparent border-[1.5px] border-gray-200 rounded-xl py-2.5 text-gray-500 text-[13px] font-semibold hover:bg-gray-100 transition-all duration-150 cursor-pointer"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
