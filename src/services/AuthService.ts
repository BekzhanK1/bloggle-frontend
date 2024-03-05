// src/services/AuthService.ts

import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  async logout() {
    const navigate = useNavigate();
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    navigate("/login");
  }
}

export default new AuthService();
