import { useState, useEffect, useCallback } from "react";

function useAsync(asyncFunction, dependencies = []) {
  const [status, setStatus] = useState("idle");
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(() => {
    setStatus("pending");
    setValue(null);
    setError(null);

    return asyncFunction()
      .then((response) => {
        setValue(response);
        setStatus("success");
      })
      .catch((err) => {
        setError(err);
        setStatus("error");
      });
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  return { execute, status, value, error };
}

export default useAsync;
