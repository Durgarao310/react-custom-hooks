import { useState } from "react";

function useAuth() {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("authToken");
    return token ? { isAuthenticated: true, token } : { isAuthenticated: false, token: null };
  });

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setAuth({ isAuthenticated: true, token });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuth({ isAuthenticated: false, token: null });
  };

  return { auth, login, logout };
}

export default useAuth;
