import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:10004/quizPractice/";

class QuizService {
  getListQuiz() {
    return axios.get(API_URL + "api/getlistquizts", {
      headers: authHeader(),
    });
  }

  getDetailQuiz(id) {
    return axios.get(API_URL + `api/getquizt/${id}`, {
      headers: authHeader(),
    });
  }

  createQuiz(payload) {
    return axios.post(API_URL + "api/addquizt", payload, {
      headers: authHeader(),
    });
  }

  deleteQuiz(id) {
    return axios.delete(API_URL + `api/deletequizt/${id}`, {
      headers: authHeader(),
    });
  }

  editQuiz(id, payload) {
    return (
      axios.put(API_URL + `api/editquizt/${id}`, payload),
      {
        headers: authHeader(),
      }
    );
  }
}

export default new QuizService();
