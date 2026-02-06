import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Detect if running as PWA
  const isPWA =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true;

  // Hide header entirely if not PWA
  if (!isPWA) return null;

  return (
    <div className="sticky top-0 z-[100] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] px-5 py-3 flex items-center justify-between">
      {/* Left: back arrow + title */}
      <div className="flex items-center gap-2.5">
        {location.pathname !== "/" && (
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="bg-transparent border-none text-blue-500 text-[22px] cursor-pointer p-1 leading-none"
          >
            ←
          </button>
        )}
        <h1 className="text-base font-semibold text-gray-700">{title}</h1>
      </div>

      {/* Right: Home button */}
      {location.pathname !== "/" && (
        <button
          onClick={() => navigate("/")}
          aria-label="Go to home"
          className="bg-transparent border-none text-blue-500 text-[13px] font-semibold cursor-pointer flex items-center gap-1"
        >
          🏠 Home
        </button>
      )}
    </div>
  );
}
