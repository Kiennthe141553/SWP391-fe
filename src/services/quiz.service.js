import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:10004/quizPractice/";

class QuizService {
  getAllQuiz() {
    return axios.get(API_URL + "api/getallquizts", {
      headers: authHeader(),
    });
  }

  getListQuiz(params) {
    return axios.get(
      API_URL + "api/getlistquizts",
      { params },
      {
        headers: authHeader(),
      }
    );
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

  editQuiz(payload) {
    return axios.post(API_URL + `api/editquizt`, payload, {
      headers: authHeader(),
    });
  }

  submitResult(id, payload) {
    return axios.post(API_URL + `api/returnanswer/${id}`, payload, {
      headers: authHeader(),
    });
  }
}

export default new QuizService();
