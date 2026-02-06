import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "warning";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2400);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "error" ? "#d04040" : type === "warning" ? "#e8a838" : "#38a05c";

  return (
    <div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] text-white px-7 py-3 rounded-xl text-sm font-semibold whitespace-nowrap"
      style={{
        background: bgColor,
        boxShadow: "0 8px 28px rgba(0,0,0,0.14)",
        animation: "toastSlide 0.3s cubic-bezier(.34,1.56,.64,1) forwards",
      }}
    >
      {type === "success" && "✓ "}
      {type === "error" && "✕ "}
      {message}
    </div>
  );
}
