import { create } from "zustand";

interface ChildProfile {
  id: string;
  name: string;
  age: number;
}

interface InvestmentPlan {
  initialAmount: number;
  interestRate: number;
  startDate: string;
  targetAge: number;
}

interface InvestmentState {
  child?: ChildProfile;
  investment?: InvestmentPlan;
  setChild: (child: ChildProfile) => void;
  setInvestment: (investment: InvestmentPlan) => void;
}

export const useInvestmentStore = create<InvestmentState>((set) => ({
  child: undefined,
  investment: undefined,
  setChild: (child) => set({ child }),
  setInvestment: (investment) => set({ investment }),
}));
