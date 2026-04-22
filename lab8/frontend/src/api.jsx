const API = 'http://localhost:8000/api/v1';

export const api = {
  async request(endpoint, setError, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (options.token) headers.Authorization = `Bearer ${options.token}`;
    
    const res = await fetch(`${API}${endpoint}`, { ...options, headers });
    const data = await res.json();
    if (!res.ok) {
      console.log(setError)
      setError(data.detail[0].msg || data.detail || "Ошибка сервера!")
      throw new Error(data.detail);
    }
    return data;
  },
  
  login: (data, setError) => api.request('/auth/login/', setError, { method: 'POST', body: JSON.stringify(data) }),
  register: (data, setError) => api.request('/auth/register/', setError, { method: 'POST', body: JSON.stringify(data) }),
  getProfile: (token, setError) => api.request('/user/profile/', setError, { token }),
};
