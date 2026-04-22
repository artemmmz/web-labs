import { useAuth } from './AuthContext';

export default function Dashboard() {
  const { profile, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Загрузка профиля...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Личный кабинет студента</h1>
          <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer">
            Выйти
          </button>
        </header>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <p className="text-gray-600 mb-4">Добро пожаловать в систему!</p>
          <div className="space-y-2 text-sm text-gray-500">
            <p><span className="font-semibold">Пользователь:</span> {profile?.firstname || profile?.login} {profile?.lastname}</p>
            <p><span className="font-semibold">Email:</span> {profile?.email || 'Не указан'}</p>
            <p><span className="font-semibold">Статус:</span> Авторизован</p>
          </div>
        </div>
      </div>
    </div>
  );
}
