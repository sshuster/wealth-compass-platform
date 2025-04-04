
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

// Mock users for frontend testing
const MOCK_USERS = [
  { id: 1, username: 'muser', password: 'muser', role: 'user' },
  { id: 2, username: 'mvc', password: 'mvc', role: 'admin' }
];

type User = {
  id: number;
  username: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, password: string) => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for user in localStorage on initial load
    const storedUser = localStorage.getItem('wealthUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // For mock testing without backend
      const mockUser = MOCK_USERS.find(
        u => u.username === username && u.password === password
      );
      
      if (mockUser) {
        const userData = {
          id: mockUser.id,
          username: mockUser.username,
          role: mockUser.role
        };
        setUser(userData);
        localStorage.setItem('wealthUser', JSON.stringify(userData));
        toast.success(`Welcome back, ${userData.username}!`);
        return true;
      }

      // TODO: For actual backend
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, password }),
      // });
      // if (response.ok) {
      //   const userData = await response.json();
      //   setUser(userData);
      //   localStorage.setItem('wealthUser', JSON.stringify(userData));
      //   toast.success(`Welcome back, ${userData.username}!`);
      //   return true;
      // }
      
      toast.error('Invalid username or password');
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wealthUser');
    toast.info('You have been logged out');
  };

  const register = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // TODO: Actual backend implementation
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, password }),
      // });
      
      // if (response.ok) {
      //   toast.success('Registration successful! Please log in.');
      //   return true;
      // }
      
      // For now, just simulate registration success
      if (MOCK_USERS.some(u => u.username === username)) {
        toast.error('Username already exists');
        return false;
      }
      
      toast.success('Registration successful! Please log in.');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
