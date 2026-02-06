import { create } from "zustand";

interface AppState {
  onboardingCompleted: boolean;
  completeOnboarding: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  onboardingCompleted: localStorage.getItem("onboardingCompleted") === "true",

  completeOnboarding: () => {
    localStorage.setItem("onboardingCompleted", "true");
    set({ onboardingCompleted: true });
  },
}));
