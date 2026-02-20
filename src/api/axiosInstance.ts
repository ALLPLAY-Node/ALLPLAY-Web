import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL
  // Add timeout/default headers if needed.
});

// Attach access token to every request.
axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    const token = accessToken ?? localStorage.getItem("accessToken");

    if (token) {
      const authorization = token.toLowerCase().startsWith("bearer ")
        ? token
        : `Bearer ${token}`;

      config.headers = config.headers ?? {};
      config.headers.Authorization = authorization;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Retry once after refreshing token on 401.
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken, setTokens, clearAuth } = useAuthStore.getState();

        if (!refreshToken) {
          clearAuth();
          return Promise.reject(error);
        }

        const res = await axios.post(`${baseURL}/api/auth/refresh`, {
          refreshToken
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          res.data;

        setTokens(newAccessToken, newRefreshToken ?? refreshToken);

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        useAuthStore.getState().clearAuth();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
