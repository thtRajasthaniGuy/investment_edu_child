import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import OnboardingPage from "../features/onboarding/OnboardingPage";
import DashboardPage from "../features/dashboard/DashboardPage";
import ChildForm from "../features/child/ChildForm";
import InvestmentPage from "../features/child/InvestmentPage";
import { useAppStore } from "../store/appStore";

export default function RoutesComponent() {
  const onboardingCompleted = useAppStore((state) => state.onboardingCompleted);

  if (!onboardingCompleted) {
    return (
      <Routes>
        <Route path="*" element={<OnboardingPage />} />
      </Routes>
    );
  }
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/child/new" element={<ChildForm />} />
        <Route path="/child/:id/edit" element={<ChildForm />} />
        <Route path="/child/investments" element={<InvestmentPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}
