import { useState, useEffect } from "react";

function useWebAuthn() {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(!!window.PublicKeyCredential);
  }, []);

  const register = async (options) => {
    if (!isSupported) {
      throw new Error("WebAuthn is not supported on this browser.");
    }

    try {
      const credential = await navigator.credentials.create({ publicKey: options });
      return credential;
    } catch (error) {
      console.error("Error during WebAuthn registration:", error);
      throw error;
    }
  };

  const authenticate = async (options) => {
    if (!isSupported) {
      throw new Error("WebAuthn is not supported on this browser.");
    }

    try {
      const assertion = await navigator.credentials.get({ publicKey: options });
      return assertion;
    } catch (error) {
      console.error("Error during WebAuthn authentication:", error);
      throw error;
    }
  };

  return { isSupported, register, authenticate };
}

export default useWebAuthn;
