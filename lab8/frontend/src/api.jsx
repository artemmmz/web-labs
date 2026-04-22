const API = 'http://localhost:8000/api/v1';

export const api = {
  async request(endpoint, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (options.token) headers.Authorization = `Bearer ${options.token}`;
    
    const res = await fetch(`${API}${endpoint}`, { ...options, headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Ошибка сервера');
    return data;
  },
  
  login: (data) => api.request('/auth/login/', { method: 'POST', body: JSON.stringify(data) }),
  register: (data) => api.request('/auth/register/', { method: 'POST', body: JSON.stringify(data) }),
  getProfile: (token) => api.request('/user/profile/', { token }),
};
