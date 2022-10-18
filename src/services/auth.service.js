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
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.accessToken)
          );
          localStorage.setItem("role", JSON.stringify(response.data.role));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, firstName, lastName) {
    return axios.post(API_URL + "api/user/register", {
      username,
      email,
      password,
      firstName,
      lastName,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getRole() {
    return JSON.parse(localStorage.getItem("role"));
  }

  getCurrentUserId() {
    return JSON.parse(localStorage.getItem("LOCAL_STORAGE_TAB_ID_LASTEST"));
  }
}

export default new AuthService();
