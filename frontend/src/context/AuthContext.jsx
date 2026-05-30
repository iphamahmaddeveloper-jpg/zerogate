import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Simple base64 decode for mock JWT payload (no library needed)
const decodeToken = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    // Pad base64 string
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
    const decoded = JSON.parse(atob(padded));
    return decoded;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('zg_token') || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      if (!decoded) {
        logout();
        return;
      }
      // Check expiry
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        logout();
        return;
      }
      setUser({
        id: decoded.id,
        email: decoded.sub,
        name: decoded.name,
        role: decoded.role,
      });
      localStorage.setItem('zg_token', token);
    } else {
      setUser(null);
      localStorage.removeItem('zg_token');
    }
    setLoading(false);
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
