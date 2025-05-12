import { useState, useEffect } from "react";

function useBatteryStatus() {
  const [batteryStatus, setBatteryStatus] = useState({
    charging: false,
    level: 1,
  });

  useEffect(() => {
    let battery;

    const updateBatteryStatus = () => {
      setBatteryStatus({
        charging: battery.charging,
        level: battery.level,
      });
    };

    navigator.getBattery().then((bat) => {
      battery = bat;
      updateBatteryStatus();
      battery.addEventListener("chargingchange", updateBatteryStatus);
      battery.addEventListener("levelchange", updateBatteryStatus);
    });

    return () => {
      if (battery) {
        battery.removeEventListener("chargingchange", updateBatteryStatus);
        battery.removeEventListener("levelchange", updateBatteryStatus);
      }
    };
  }, []);

  return batteryStatus;
}

export default useBatteryStatus;
