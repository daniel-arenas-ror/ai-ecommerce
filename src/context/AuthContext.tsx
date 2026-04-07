import React, { createContext, useState, useContext } from 'react';

interface AuthContextType {
  lead: LeadType | undefined;
  token: string | null;
  login: (token: string, lead: LeadType) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

interface LeadType {
  id: number,
  email: string,
  phone: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lead, setLead] = useState<LeadType>(() => {
    const saved = localStorage.getItem('lead');
    return saved ? JSON.parse(saved) : undefined;
  });
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const login = (newToken: string, lead: LeadType) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('lead', JSON.stringify(lead));

    setToken(newToken);
    setLead(lead)
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('lead');
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, lead, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
