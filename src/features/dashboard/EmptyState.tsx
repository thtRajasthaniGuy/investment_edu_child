import { useNavigate } from "react-router-dom";

export default function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[22px] px-7 py-14 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-[1.5px] border-dashed border-gray-200">
      {/* Illustration */}
      <div className="text-[52px] mb-4">🌿</div>

      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        No children added yet
      </h2>

      <p className="text-sm text-gray-400 leading-[1.5] mb-5 max-w-[280px] mx-auto">
        Start by adding a child to begin tracking their investment journey.
      </p>

      <button
        onClick={() => navigate("/child/new")}
        className="bg-green-500 text-white border-none rounded-xl px-6 py-2.5 text-sm font-semibold hover:bg-green-600 transition-colors duration-150 cursor-pointer"
      >
        + Add Child
      </button>
    </div>
  );
}
