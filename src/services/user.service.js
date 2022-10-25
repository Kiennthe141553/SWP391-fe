import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:10004/quizPractice/";

class UserService {
<<<<<<< HEAD
=======
  // getListUser() {
  //   return axios.get(API_URL + "api/user", { headers: authHeader() });
  // }
  getProfile() {
    return axios.get(API_URL + `api/myProfile`, {
      headers: authHeader(),
    });
  }

  editProfile(payload) {
    console.log(authHeader());
    return axios.put(API_URL + `api/myProfile`, payload, {
      headers: authHeader(),
    });
  }

>>>>>>> 925cd0eaa6cdc5d2898098dbe289d9174a6153a9
  getListUser() {
    return axios.get(API_URL + "api/user", {
      headers: authHeader(),
    });
  }

  getDetailUser(id) {
    return axios.get(API_URL + `api/user/${id}`, {
      headers: authHeader(),
    });
  }

  createUser(payload) {
    return axios.post(API_URL + "api/user", payload, {
      headers: authHeader(),
    });
  }

  deactiveUser(id) {
    return axios.delete(API_URL + `api/user/${id}`, {
      headers: authHeader(),
    });
  }

  editUser(id, payload) {
    return (
      axios.put(API_URL + `api/user/${id}`, payload),
      {
        headers: authHeader(),
      }
    );
  }
}

export default new UserService();
