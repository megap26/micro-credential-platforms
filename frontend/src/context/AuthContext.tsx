import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LearnerProfile } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  profile: LearnerProfile | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateProfileState: (updatedProfile: LearnerProfile) => void;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('skillpulse_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshUserData = async () => {
    const storedToken = localStorage.getItem('skillpulse_token');
    if (!storedToken) {
      setUser(null);
      setProfile(null);
      setIsLoading(false);
      return;
    }

    try {
      const data = await api.getMe();
      if (data.success) {
        setUser(data.user);
        setProfile(data.profile);
      } else {
        logout();
      }
    } catch (err) {
      console.warn('Session verification failed, logging out.');
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, [token]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await api.login({ email, password });
      if (data.success && data.token) {
        localStorage.setItem('skillpulse_token', data.token);
        setToken(data.token);
        setUser(data.user);
        setProfile(data.profile);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (formData: any) => {
    setIsLoading(true);
    try {
      const data = await api.register(formData);
      if (data.success && data.token) {
        localStorage.setItem('skillpulse_token', data.token);
        setToken(data.token);
        setUser(data.user);
        setProfile(data.profile);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('skillpulse_token');
    setToken(null);
    setUser(null);
    setProfile(null);
  };

  const updateProfileState = (updatedProfile: LearnerProfile) => {
    setProfile(updatedProfile);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        token,
        isLoading,
        login,
        register,
        logout,
        updateProfileState,
        refreshUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
