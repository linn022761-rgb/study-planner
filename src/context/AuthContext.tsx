import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useState, type ReactNode } from 'react';

export type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const queryClient = useQueryClient();
  // Login
  function setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  // Logout
  function logout() {
    localStorage.removeItem('accessToken');
    setUser(null);
    queryClient.invalidateQueries({
      queryKey: ['userInfo'],
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setToken,
        logout,
        setUser,
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
