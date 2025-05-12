import { useState, useEffect } from "react";

function useScript(src) {
  const [status, setStatus] = useState(src ? "loading" : "idle");

  useEffect(() => {
    if (!src) {
      setStatus("idle");
      return;
    }

    let script = document.querySelector(`script[src="${src}"]`);

    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.setAttribute("data-status", "loading");
      document.body.appendChild(script);

      const setAttributeFromEvent = (event) => {
        script.setAttribute(
          "data-status",
          event.type === "load" ? "ready" : "error"
        );
      };

      script.addEventListener("load", setAttributeFromEvent);
      script.addEventListener("error", setAttributeFromEvent);
    }

    const setStateFromAttribute = () => {
      setStatus(script.getAttribute("data-status"));
    };

    setStateFromAttribute();

    script.addEventListener("load", setStateFromAttribute);
    script.addEventListener("error", setStateFromAttribute);

    return () => {
      if (script) {
        script.removeEventListener("load", setStateFromAttribute);
        script.removeEventListener("error", setStateFromAttribute);
      }
    };
  }, [src]);

  return status;
}

export default useScript;
