import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:10004/quizPractice/";

class QuestionService {
  getListQuestion() {
    return axios.get(API_URL + "api/getallquestion", {
      headers: authHeader(),
    });
  }

  getDetailQuestion(id) {
    return axios.get(API_URL + `api/getquestion/${id}`, {
      headers: authHeader(),
    });
  }

  createQuestion(payload) {
    return axios.post(API_URL + "api/addquestion", payload, {
      headers: authHeader(),
    });
  }

  deleteQuestion(id) {
    return axios.delete(API_URL + `api/deletequestion/${id}`, {
      headers: authHeader(),
    });
  }

  editQuestion(payload) {
    return (
      axios.post(API_URL + `api/editquestion`, payload),
      {
        headers: authHeader(),
      }
    );
  }
}

export default new QuestionService();
