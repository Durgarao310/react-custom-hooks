import { useState } from "react";

function useCheckbox(initialChecked = false) {
  const [checked, setChecked] = useState(initialChecked);

  const toggle = () => {
    setChecked((prev) => !prev);
  };

  return { checked, toggle };
}

export default useCheckbox;
