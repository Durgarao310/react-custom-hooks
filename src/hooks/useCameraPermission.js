import { useState, useEffect } from "react";

function useCameraPermission() {
  const [permission, setPermission] = useState("default");

  useEffect(() => {
    if (!navigator.permissions) {
      console.warn("Permissions API is not supported by this browser.");
      return;
    }

    const handlePermissionChange = (status) => {
      setPermission(status.state);
    };

    navigator.permissions.query({ name: "camera" }).then((status) => {
      setPermission(status.state);
      status.addEventListener("change", () => handlePermissionChange(status));
    });

    return () => {
      // Cleanup listeners if needed
    };
  }, []);

  return permission;
}

export default useCameraPermission;
