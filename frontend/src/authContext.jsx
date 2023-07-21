import axios from "axios";
import { createContext, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post("http://localhost:8005/auth/login", inputs);
      setCurrentUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:8005/auth/logout");
      setCurrentUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const contextValue = useMemo(
    () => ({ currentUser, login, logout }),
    [currentUser]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// Validation des props
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
