import { useState } from 'react';
import { useAuth } from './AuthContext';

export default function Register({ onSwitchToLogin }) {
  const { register, error, clearError } = useAuth();
  const [form, setForm] = useState({ 
    login: '', email: '', firstname: '', lastname: '', password1: '', password2: '' 
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    if (form.password1 !== form.password2) {
      clearError();
      alert('Пароли не совпадают');
      return;
    }
    setLoading(true);
    try {
      await register(form);
      setForm({ login: '', email: '', firstname: '', lastname: '', password1: '', password2: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Регистрация</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['firstname', 'lastname', 'email', 'login'].map((field) => (
            <input key={field} name={field} placeholder={field === 'firstname' ? 'Имя' : field === 'lastname' ? 'Фамилия' : field === 'email' ? 'Email' : 'Логин'} 
              value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} required 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          ))}
          <input name="password1" type="password" placeholder="Пароль" value={form.password1} 
            onChange={(e) => setForm({ ...form, password1: e.target.value })} required 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="password2" type="password" placeholder="Подтвердите пароль" value={form.password2} 
            onChange={(e) => setForm({ ...form, password2: e.target.value })} required 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" disabled={loading} 
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer">
            {loading ? 'Загрузка...' : 'Зарегистрироваться'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button onClick={onSwitchToLogin} className="text-blue-600 hover:underline text-sm cursor-pointer">
            Уже есть аккаунт? Войти
          </button>
        </div>
      </div>
    </div>
  );
}
