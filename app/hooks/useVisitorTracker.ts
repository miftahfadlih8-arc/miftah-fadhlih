import { useEffect } from "react";

export const useVisitorTracker = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      // Check if already tracked in this session to avoid spamming
      if (sessionStorage.getItem("visitor_tracked")) return;

      try {
        // Get basic IP info
        const ipRes = await fetch("https://ipapi.co/json/");
        const ipData = await ipRes.json();

        const visitorData = {
          timestamp: new Date().toISOString(),
          ip: ipData.ip,
          location: `${ipData.city}, ${ipData.country_name}`,
          device: /Mobi|Android/i.test(navigator.userAgent)
            ? "Mobile"
            : "Desktop",
          browser: getBrowserName(navigator.userAgent),
          referrer: document.referrer || "Direct",
          page: window.location.pathname,
        };

        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(visitorData),
        });

        sessionStorage.setItem("visitor_tracked", "true");
      } catch (error) {
        console.error("Failed to track visitor:", error);
      }
    };

    trackVisitor();
  }, []);
};

function getBrowserName(userAgent: string) {
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("SamsungBrowser")) return "Samsung Browser";
  if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
  if (userAgent.includes("Trident")) return "Internet Explorer";
  if (userAgent.includes("Edge")) return "Edge";
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Safari")) return "Safari";
  return "Unknown";
}
