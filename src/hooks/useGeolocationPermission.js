import { useState, useEffect } from "react";

function useGeolocationPermission() {
  const [permission, setPermission] = useState("default");

  useEffect(() => {
    if (!navigator.permissions) {
      console.warn("Permissions API is not supported by this browser.");
      return;
    }

    const handlePermissionChange = (status) => {
      setPermission(status.state);
    };

    navigator.permissions.query({ name: "geolocation" }).then((status) => {
      setPermission(status.state);
      status.addEventListener("change", () => handlePermissionChange(status));
    });

    return () => {
      // Cleanup listeners if needed
    };
  }, []);

  return permission;
}

export default useGeolocationPermission;
