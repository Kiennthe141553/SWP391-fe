import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:10004/quizPractice/";

class QuestionService {
  getListQuestion() {
    return axios.get(API_URL + "api/getlistquizts", {
      headers: authHeader(),
    });
  }

  getDetailQuestion(id) {
    return axios.get(API_URL + `api/getquizt/${id}`, {
      headers: authHeader(),
    });
  }

  createQuestion(payload) {
    return axios.post(API_URL + "api/addquizt", payload, {
      headers: authHeader(),
    });
  }

  deleteQuestion(id) {
    return axios.delete(API_URL + `api/deletequizt/${id}`, {
      headers: authHeader(),
    });
  }

  editQuestion(id, payload) {
    return (
      axios.put(API_URL + `api/editquizt/${id}`, payload),
      {
        headers: authHeader(),
      }
    );
  }
}

export default new QuestionService();
