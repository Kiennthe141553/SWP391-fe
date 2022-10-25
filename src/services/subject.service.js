import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:10004/quizPractice/";

class SubjectService {
  getListSubject() {
    return axios.get(API_URL + "api/subjects", {
      headers: authHeader(),
    });
  }

  getDetailSubject(id) {
    return axios.get(API_URL + `api/subjects/${id}`, {
      headers: authHeader(),
    });
  }

  createSubject(payload) {
    return axios.post(API_URL + "api/subjects", payload, {
      headers: authHeader(),
    });
  }

  deleteSubject(id) {
    return axios.delete(API_URL + `api/subjects/${id}`, {
      headers: authHeader(),
    });
  }

  editSubject(id, payload) {
    return (
      axios.put(API_URL + `api/subjects/${id}`, payload),
      {
        headers: authHeader(),
      }
    );
  }
}

export default new SubjectService();
