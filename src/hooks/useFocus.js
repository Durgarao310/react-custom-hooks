import { useState, useRef, useEffect } from "react";

function useFocus() {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const node = ref.current;
    if (node) {
      node.addEventListener("focus", handleFocus);
      node.addEventListener("blur", handleBlur);
    }

    return () => {
      if (node) {
        node.removeEventListener("focus", handleFocus);
        node.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  return [ref, isFocused];
}

export default useFocus;
