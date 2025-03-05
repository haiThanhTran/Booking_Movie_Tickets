import axios from "axios";

const API_SEVER = "http://localhost:5000";
const axiosInstance = axios.create({
  baseURL: API_SEVER,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor request: Gắn Access Token vào header Authorization
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken")?.replace(/"/g, ""); // Lấy Access Token từ localStorage
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Gắn token vào header Authorization
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response: Làm mới Access Token khi gặp lỗi 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log("error", error);
      const originalRequest = error.config;
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        console.log("originalRequest", originalRequest);
        try {
          const response = await axios.post(
            `${API_SEVER}/user/token`,
            {},
            { withCredentials: true }
          );
          const newAccessToken = response.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Refresh Token thất bại:", refreshError);
        //   window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
