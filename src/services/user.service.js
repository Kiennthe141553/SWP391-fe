import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "https://itp-be-deploy.herokuapp.com";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "/api/homepage", { headers: authHeader() });
  }

  getListProduct() {
    return axios.get(API_URL + "/api/products", { headers: authHeader() });
  }

  getListRole() {
    return axios.get(API_URL + "/api/roles", { headers: authHeader() });
  }

  createProduct(payload) {
    return axios.post(API_URL + "/api/products", payload, { headers: authHeader() });
  }

  createUser(payload) {
    return axios.post(API_URL + "/api/user", payload, { headers: authHeader() });
  }

  editProduct(id,payload) {
    return axios.put(API_URL + `/api/products/${id}`, payload, { headers: authHeader() });
  }

  removeProduct(id) {
    return axios.delete(API_URL + `/api/products/${id}`,  { headers: authHeader() });
  }

  getInfoUser() {
    return axios.get(API_URL + "/api/users", { headers: authHeader() });
  }

  getListCategory() {
    return axios.get(API_URL + "/api/categories", { headers: authHeader() });
  }

  getDetailProduct(id) {
    return axios.get(API_URL + `/api/products/${id}`, { headers: authHeader() });
  }

  changePass(newPass, oldPass) {
    return axios.post(API_URL + "/api/user/changePass", {newPass, oldPass}, { headers: authHeader() });
  }
}

export default new UserService();
