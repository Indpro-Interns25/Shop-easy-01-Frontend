import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, userToken: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

// Admin emails list - moved outside component to avoid dependency issues
const ADMIN_EMAILS = ['tester@gmail.com', 'admin@shopeasy.com'];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const checkIsAdmin = useCallback((email: string): boolean => {
    return ADMIN_EMAILS.includes(email?.toLowerCase());
  }, []);

  useEffect(() => {
    // Check if user is already logged in on app start
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      try {
        const parsedUser = JSON.parse(savedUser);
        const userWithAdminFlag = {
          ...parsedUser,
          isAdmin: checkIsAdmin(parsedUser.email)
        };
        setUser(userWithAdminFlag);
        setToken(savedToken);
      } catch {
        // If there's an error parsing, clear the invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, [checkIsAdmin]);

  const login = (userData: User, userToken: string) => {
    const userWithAdminFlag = {
      ...userData,
      isAdmin: checkIsAdmin(userData.email)
    };
    
    setUser(userWithAdminFlag);
    setToken(userToken);
    localStorage.setItem('user', JSON.stringify(userWithAdminFlag));
    localStorage.setItem('token', userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user && !!token,
    isAdmin: user?.isAdmin || false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};