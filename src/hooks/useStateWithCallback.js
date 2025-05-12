import { useState, useRef, useEffect } from "react";

function useStateWithCallback(initialState) {
  const [state, setState] = useState(initialState);
  const callbackRef = useRef(null);

  const setStateWithCallback = (newState, callback) => {
    callbackRef.current = callback;
    setState(newState);
  };

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state);
      callbackRef.current = null;
    }
  }, [state]);

  return [state, setStateWithCallback];
}

export default useStateWithCallback;
