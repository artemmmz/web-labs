import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProfile = useCallback(async (authToken) => {
    if (!authToken) {
      setLoading(false);
      return;
    }
    try {
      const data = await api.getProfile(authToken, setError);
      setProfile(data);
    } catch {
      logout();
      setError('Сессия истекла. Войдите снова.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      loadProfile(token);
    } else {
      localStorage.removeItem('token');
      setProfile(null);
      setLoading(false);
    }
  }, [token, loadProfile]);

  const login = async (credentials) => {
    const data = await api.login(credentials, setError);
    setToken(data.access_token);
    return data;
  };

  const register = async (data) => {
    const result = await api.register(data, setError);
    setToken(result.access_token);
    return result;
  };

  const logout = () => {
    setToken('');
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ token, profile, loading, error, login, register, logout, clearError: () => setError('') }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
