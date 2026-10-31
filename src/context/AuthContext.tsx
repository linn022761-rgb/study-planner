import { createContext, useContext, useState, type ReactNode } from 'react';

import type { User } from '@/services/authApi';

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  signup: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Login
  function login(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }

  // Signup
  function signup(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }

  // Logout
  function logout() {
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
