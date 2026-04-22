import { useState } from 'react';
import { useAuth } from './AuthContext';

export default function Login({ onSwitchToRegister }) {
  const { login, error, clearError } = useAuth();
  const [form, setForm] = useState({ login: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setLoading(true);
    try {
      await login(form);
      setForm({ login: '', password: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Вход в систему</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="login" type="text" placeholder="Логин" value={form.login} 
            onChange={(e) => setForm({ ...form, login: e.target.value })} required 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="password" type="password" placeholder="Пароль" value={form.password} 
            onChange={(e) => setForm({ ...form, password: e.target.value })} required 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" disabled={loading} 
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer">
            {loading ? 'Загрузка...' : 'Войти'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button onClick={onSwitchToRegister} className="text-blue-600 hover:underline text-sm cursor-pointer">
            Нет аккаунта? Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
}
