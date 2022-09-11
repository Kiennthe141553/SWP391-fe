import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:10004";

class UserService {
  getListUser() {
    return axios.get(API_URL + "/api/products", { headers: authHeader() });
  }

  createUser(payload) {
    return axios.post(API_URL + "/api/user", payload, {
      headers: authHeader(),
    });
  }

  editUser(id, payload) {
    return axios.put(API_URL + `/api/products/${id}`, payload, {
      headers: authHeader(),
    });
  }

  deactiveUser(id) {
    return axios.delete(API_URL + `/api/products/${id}`, {
      headers: authHeader(),
    });
  }

  getDetailUser(id) {
    return axios.get(API_URL + `/api/products/${id}`, {
      headers: authHeader(),
    });
  }
}

export default new UserService();
