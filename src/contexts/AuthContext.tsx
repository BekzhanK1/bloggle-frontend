// src/contexts/AuthContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface User {
  _id: string;
  username: string;
  // Add other user properties as needed
}
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: any) => void; // Replace 'any' with your actual User type
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null); // Add user state

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
      setUser(JSON.parse(user)); // Parse and set the user object
    }
  }, []);

  const login = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(true);
    setUser(user); // Set the user state
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null); // Reset the user state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
