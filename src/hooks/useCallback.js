import { useCallback } from "react";

function useCallbackExample(callback, dependencies) {
  return useCallback(callback, dependencies);
}

export default useCallbackExample;
