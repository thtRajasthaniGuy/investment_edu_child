import { useNavigate } from "react-router-dom";
import { useChildStore, type Child } from "../../store/childStore";
import { calcInvestment } from "../../utils/calculations";
import { useState } from "react";
import ConfirmModal from "../../components/ConfirmModal";

interface Props {
  child: Child;
  index?: number;
}

export default function ChildCard({ child, index = 0 }: Props) {
  const navigate = useNavigate();
  const removeChild = useChildStore((s) => s.removeChild);
  const [showConfirm, setShowConfirm] = useState(false);

  const stats = calcInvestment(child.amount, child.rate, child.startDate);
  const gainPct = child.amount > 0 ? (stats.gained / child.amount) * 100 : 0;

  const handleDelete = () => {
    removeChild(child.id);
    setShowConfirm(false);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/child/${child.id}/edit`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const handleView = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigate(`/child/${child.id}`);
  };

  return (
    <>
      <div
        className="bg-white rounded-[20px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_4px_12px_rgba(0,0,0,0.10)] transition-shadow duration-200 cursor-pointer"
        style={{
          animation: `cardIn 0.35s cubic-bezier(.34,1.2,.64,1) ${index * 0.06}s both`,
        }}
        onClick={handleView}
      >
        {/* Top row: avatar + name + badge */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-[46px] h-[46px] rounded-[14px] bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center text-[22px]">
              {child.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800 m-0">
                {child.name}
              </h3>
              <p className="text-xs text-gray-400 m-0">
                Age {child.age || "N/A"} · {child.rate}% annually
              </p>
            </div>
          </div>
          <span className="bg-green-50 text-green-600 text-[11.5px] font-semibold px-2.5 py-1 rounded-full border border-green-100">
            +{gainPct.toFixed(1)}%
          </span>
        </div>

        {/* Amount row */}
        <div className="flex justify-between items-end mb-4 py-3 border-t border-b border-gray-100">
          <div>
            <p className="text-[11px] text-gray-400 m-0 uppercase tracking-wider">
              Current Value
            </p>
            <p
              className="text-[22px] font-normal text-gray-800 mt-[3px] mb-0"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {child.currency}
              {stats.total.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-gray-400 m-0 uppercase tracking-wider">
              Invested
            </p>
            <p className="text-[15px] font-semibold text-gray-600 mt-[3px] mb-0">
              {child.currency}
              {child.amount.toLocaleString("en-US")}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleView}
            className="flex-[2] py-[9px] px-0 rounded-[11px] border-[1.5px] border-green-200 bg-green-50 text-green-600 text-[13px] font-semibold hover:bg-green-100 transition-all duration-150 cursor-pointer"
          >
            📈 View
          </button>
          <button
            onClick={handleEdit}
            className="flex-1 py-[9px] px-0 rounded-[11px] border-[1.5px] border-gray-200 bg-white text-gray-600 text-[13px] font-semibold hover:bg-gray-100 transition-all duration-150 cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteClick}
            aria-label={`Delete ${child.name}`}
            className="w-10 py-[9px] rounded-[11px] border-[1.5px] border-red-400/[0.13] bg-red-400/[0.03] text-red-400 text-[15px] hover:bg-red-400/[0.09] transition-all duration-150 cursor-pointer"
          >
            🗑
          </button>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {showConfirm && (
        <ConfirmModal
          message={`Are you sure you want to delete "${child.name}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
