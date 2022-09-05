import axios from "axios";

const API_URL = "https://itp-be-deploy.herokuapp.com";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "/api/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data.token));
          localStorage.setItem("firstLogin", JSON.stringify(response.data.firstLogin));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getFirstLogin() {
    return JSON.parse(localStorage.getItem("firstLogin"));
  }
}

export default new AuthService();
