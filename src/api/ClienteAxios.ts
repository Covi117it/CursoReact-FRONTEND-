import axios from "axios";
import { obtenerToken } from "../utilidades/ManejadorJWT";


const clienteAPI = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});


clienteAPI.interceptors.request.use((config) => {

    if (!(config.data instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json';
    }

    const token = obtenerToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default clienteAPI;