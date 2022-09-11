import axios from "axios";

const API_URL = "http://localhost:10004/quizPractice/";

class AuthService {
  login(username, password) {
    return axios
    .post(API_URL + "api/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.token));
        localStorage.setItem(
            "firstLogin",
            JSON.stringify(response.data.firstLogin)
        );
      }

      return response.data;
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  headers = {'header': 'Access-Control-Allow-Origin'}

  register(username, email, password, firstName, lastName) {
    return axios.post(API_URL + "api/user/register", {
          username,
          email,
          password,
          firstName,
          lastName,
        }
    );
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getFirstLogin() {
    return JSON.parse(localStorage.getItem("firstLogin"));
  }
}

export default new AuthService();
