import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);

  const handleGetStarted = () => {
    completeOnboarding();
    navigate("/");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-[#f0f4f3]">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-14 w-60 h-60 rounded-full bg-green-100 opacity-50 pointer-events-none" />
      <div className="absolute -bottom-10 -left-12 w-44 h-44 rounded-full bg-blue-100 opacity-45 pointer-events-none" />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-[420px] bg-white rounded-[28px] px-8 pt-12 pb-10"
        style={{
          boxShadow: "0 8px 28px rgba(0,0,0,0.14)",
          animation: "scaleIn 0.4s cubic-bezier(.34,1.56,.64,1) 0.1s both",
        }}
      >
        {/* Icon */}
        <div className="w-[88px] h-[88px] mx-auto mb-6 rounded-3xl bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center text-[42px]">
          🌱
        </div>

        {/* Heading */}
        <h1
          className="text-[30px] font-normal text-gray-800 text-center mb-3.5 leading-tight"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Grow Together
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-[15px] text-center leading-[1.65] max-w-[340px] mx-auto mb-3">
          Track and teach investment growth for your children. Add them, set
          goals, and watch their wealth blossom.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {["📈 Track Growth", "💰 Multi-Currency", "👨‍👧 Family Fun"].map(
            (f) => (
              <span
                key={f}
                className="bg-gray-50 border border-gray-100 rounded-full px-3.5 py-1.5 text-[12.5px] text-gray-600 font-medium"
              >
                {f}
              </span>
            ),
          )}
        </div>

        {/* CTA */}
        <button
          onClick={handleGetStarted}
          className="w-full py-[15px] rounded-2xl border-none bg-gradient-to-br from-green-600 to-blue-500 text-white text-base font-semibold tracking-wide shadow-[0_4px_16px_rgba(56,160,92,0.35)] hover:shadow-[0_6px_22px_rgba(56,160,92,0.45)] hover:-translate-y-px active:translate-y-0 transition-all duration-200 cursor-pointer"
        >
          Get Started →
        </button>
      </div>
    </div>
  );
}
