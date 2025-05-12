import { useEffect, useRef } from "react";

function useWhyDidYouUpdate(name, props) {
  const previousProps = useRef(props);

  useEffect(() => {
    if (previousProps.current) {
      const changes = {};
      for (const key in props) {
        if (props[key] !== previousProps.current[key]) {
          changes[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      }
      if (Object.keys(changes).length > 0) {
        console.log(`[${name}] props changed:`, changes);
      }
    }
    previousProps.current = props;
  });
}

export default useWhyDidYouUpdate;
