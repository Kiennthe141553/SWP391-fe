import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:10004/quizPractice/";

class BlogService {
  getListBlog() {
    return axios.get(API_URL + "api/blogs", {
      headers: authHeader(),
    });
  }

  getDetailBlog(id) {
    return axios.get(API_URL + `api/blogs/${id}`, {
      headers: authHeader(),
    });
  }

  createBlog(payload) {
    return axios.post(API_URL + "api/blogs", payload, {
      headers: authHeader(),
    });
  }

  deleteBlog(id) {
    return axios.delete(API_URL + `api/blogs/${id}`, {
      headers: authHeader(),
    });
  }

  editBlog(id, payload) {
    return (
      axios.put(API_URL + `api/blogs/${id}`, payload),
      {
        headers: authHeader(),
      }
    );
  }
}

export default new BlogService();
