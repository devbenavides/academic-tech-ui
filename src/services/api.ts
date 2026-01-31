import axios, { AxiosHeaders, type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type':'application/json'
    },
});

// Interceptor de request: agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // o desde tu store global

    // Forzar que headers sea de tipo AxiosHeaders para TS
    if (!config.headers) {
      config.headers = {} as AxiosHeaders;
    }

    if (token) {
      (config.headers as AxiosHeaders)["Authorization"] = `Bearer ${token}`;
    }
    //console.log('Token =>> ',localStorage.getItem("token"));
    

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response: manejo de errores y 204 No Content
api.interceptors.response.use(
  (response) => response, // Siempre devolver AxiosResponse
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 400 && data.fieldErrors) {
        // Error de validación → lanzamos con campos
        return Promise.reject({ type: "validation", fieldErrors: data.fieldErrors, message: data.message });
      }

      if (status === 400) {
        // Otros BadRequest
        return Promise.reject({ type: "badRequest", message: data || error.message });
      }

      if (status === 401) {
        return Promise.reject({ type: "unauthorized", message: "No autorizado" });
      }

      if (status === 403) {
        return Promise.reject({ type: "forbidden", message: "Acceso denegado" });
      }

      if (status === 404) {
        return Promise.reject(error);
      }

      if (status === 500) {
        return Promise.reject({ type: "server", message: "Error en el servidor" });
      }

      return Promise.reject({ type: "unknown", message: data?.message || error.message });
    } else if (error.request) {
      return Promise.reject({ type: "network", message: "No se recibió respuesta del servidor" });
    } else {
      return Promise.reject({ type: "unknown", message: error.message });
    }
  }
);

export default api;