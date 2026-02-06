import { useEffect, useState } from "react";

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault(); // Prevent automatic prompt
      setDeferredPrompt(e);
      setCanInstall(true); // Show our install button
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt(); // Show browser install dialog
    const choice = await deferredPrompt.userChoice;
    console.log("User choice:", choice.outcome);
    setDeferredPrompt(null);
    setCanInstall(false);
  };

  return { canInstall, promptInstall };
}
