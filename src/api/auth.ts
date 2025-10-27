import axios from "axios";
const BASE_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post("/auth/login", {
      username,
      password,
      expiresInMins: 60,
    });

    return response.data; 
  } catch (err: any) {
    console.error("Login error:", err.response?.data || err.message);
    throw err;
  }
};

export const getMe = async (token: string) => {
  try {
    const response = await api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; 
  } catch (err: any) {
    console.error("GetMe error:", err.response?.data || err.message);
    throw err;
  }
};


export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await api.post("/auth/refresh", { refreshToken });
    return response.data;
  } catch (err: any) {
    console.error("Refresh token error:", err.response?.data || err.message);
    throw err;
  }
};
