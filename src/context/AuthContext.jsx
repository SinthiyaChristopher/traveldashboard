import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);   // store signed-up accounts
  const [currentUser, setCurrentUser] = useState(null);

  const signup = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
  };

  const login = (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ users, currentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);