import { useReducer, useEffect } from "react";

function useReducerWithLocalStorage(key, reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
}

export default useReducerWithLocalStorage;
