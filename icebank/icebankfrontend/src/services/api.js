import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8091/api",  // ← PUERTO REAL DEL BACKEND
    withCredentials: false
});

// Interceptor para enviar el token si existe
api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
