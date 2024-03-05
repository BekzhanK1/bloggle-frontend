// src/services/AuthService.ts

import axios from "axios";

const API_URL = "http://localhost:3000/api/users"; // Adjust based on your backend API endpoint

class AuthService {
  async login(email: string, password: string) {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("userId", JSON.stringify(response.data.user._id));
    }
    return response.data;
  }
  async register(username: string, email: string, password: string) {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("userId", JSON.stringify(response.data.user._id));
    }
    return response.data;
  }
}

export default new AuthService();
