import axios from "axios";

const base = "http://localhost:3001";

class AuthService {
  async validateSession() {
    try {
      const token = window.localStorage.getItem("user");
      if (token) {
        await axios.get(`${base}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async loginService(data) {
    return await axios.post(`${base}/api/auth/login`, data);
  }
}

export const authService = new AuthService();
