import { useChildStore } from "../../store/childStore";
import { useNavigate } from "react-router-dom";
import EmptyState from "./EmptyState";
import ChildCard from "./ChildCard";
import { usePWAInstall } from "../../hooks/usePWAInstall";
import Header from "../../components/Header";

export default function DashboardPage() {
  const children = useChildStore((state) => state.children);
  const navigate = useNavigate();
  const { canInstall, promptInstall } = usePWAInstall();

  return (
    <div className="min-h-screen pb-24 px-5 pt-7 bg-[#f0f4f3]">
      <Header title="Dashboard" />

      <div className="max-w-[680px] mx-auto">
        {/* Top bar: heading + Add Child button */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1
              className="text-2xl font-normal text-gray-800 mb-0.5"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              My Children
            </h1>
            <p className="text-[13px] text-gray-400 m-0">
              {children.length} investment{children.length !== 1 ? "s" : ""}{" "}
              tracked
            </p>
          </div>

          <button
            onClick={() => navigate("/child/new")}
            className="flex items-center gap-1.5 bg-gradient-to-br from-green-600 to-blue-500 text-white text-sm font-semibold px-[18px] py-2.5 rounded-[14px] shadow-[0_3px_12px_rgba(56,160,92,0.30)] hover:shadow-[0_5px_18px_rgba(56,160,92,0.40)] hover:-translate-y-px active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <span className="text-lg leading-none">+</span> Add Child
          </button>
        </div>

        {/* View Investments link bar */}
        <button
          onClick={() => navigate("/child/investments")}
          className="w-full flex items-center justify-between bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-blue-600 mb-6 transition-colors duration-150 cursor-pointer text-left"
        >
          <span>📊 View All Investments</span>
          <span className="opacity-60">→</span>
        </button>

        {/* Content: empty state or child cards */}
        {children.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-3.5">
            {children.map((child, i) => (
              <ChildCard key={child.id} child={child} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* PWA Install FAB */}
      {canInstall && (
        <button
          onClick={promptInstall}
          className="fixed bottom-4 right-4 z-[200] bg-gradient-to-r from-green-600 to-blue-500 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-transform duration-150 cursor-pointer"
        >
          📱 Install App
        </button>
      )}
    </div>
  );
}
