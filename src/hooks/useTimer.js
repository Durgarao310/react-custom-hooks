import { useState, useEffect } from "react";

function useTimer(initialTime = 0, interval = 1000) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return time;
}

export default useTimer;
