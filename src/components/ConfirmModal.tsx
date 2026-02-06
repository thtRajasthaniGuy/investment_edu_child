interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/[0.38] z-[8888] flex items-center justify-center p-5"
      style={{ animation: "fadeIn 0.2s ease" }}
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-[20px] px-7 py-8 max-w-[380px] w-full text-center"
        style={{
          boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
          animation: "scaleIn 0.25s cubic-bezier(.34,1.56,.64,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-[40px] mb-3">🗑️</div>
        <p className="text-[15px] text-gray-600 mb-6 leading-[1.5]">
          {message}
        </p>
        <div className="flex gap-2.5">
          <button
            onClick={onCancel}
            className="flex-1 py-[11px] rounded-xl border-[1.5px] border-gray-200 bg-white text-gray-600 text-sm font-semibold hover:bg-gray-100 transition-all duration-150 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-[11px] rounded-xl border-none bg-[#d04040] text-white text-sm font-semibold hover:bg-[#b83333] transition-all duration-150 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
