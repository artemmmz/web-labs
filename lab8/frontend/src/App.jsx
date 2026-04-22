import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function AppContent() {
  const { token, profile, loading } = useAuth();
  const [view, setView] = useState('login');

  useEffect(() => {
    if (!loading && token && profile) {
      setView('dashboard');
    } else if (!loading && !token) {
      setView('login');
    }
  }, [loading, token, profile]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Инициализация...</p>
      </div>
    );
  }

  if (view === 'dashboard' && profile) return <Dashboard />;
  if (view === 'register') return <Register onSwitchToLogin={() => setView('login')} />;
  return <Login onSwitchToRegister={() => setView('register')} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
