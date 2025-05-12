import { useState, useEffect } from "react";

function useNetworkStatusDetailed() {
  const [networkStatus, setNetworkStatus] = useState({
    online: navigator.onLine,
    effectiveType: navigator.connection?.effectiveType || "unknown",
    downlink: navigator.connection?.downlink || 0,
    rtt: navigator.connection?.rtt || 0,
  });

  useEffect(() => {
    const updateStatus = () => {
      setNetworkStatus({
        online: navigator.onLine,
        effectiveType: navigator.connection?.effectiveType || "unknown",
        downlink: navigator.connection?.downlink || 0,
        rtt: navigator.connection?.rtt || 0,
      });
    };

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    navigator.connection?.addEventListener("change", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
      navigator.connection?.removeEventListener("change", updateStatus);
    };
  }, []);

  return networkStatus;
}

export default useNetworkStatusDetailed;
