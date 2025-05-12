import { useState, useEffect } from "react";

function usePersistentState(key, initialValue, storage = localStorage) {
  const [state, setState] = useState(() => {
    try {
      const storedValue = storage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Error accessing storage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      storage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Error saving to storage:", error);
    }
  }, [key, state, storage]);

  return [state, setState];
}

export default usePersistentState;
