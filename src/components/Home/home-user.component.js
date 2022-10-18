import Axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import QuizCard from "../Quiz/QuizCard";
import QuizList from "../Quiz/QuizList";
import "../../styles/tailwind.css";

const HomeUser = () => {
  const [recentQuiz, setrecentQuiz] = useState([]);
  useEffect(() => {
    const fetchRecentQuiz = async () => {
      const response = await Axios.get("/data/recentQuizset.json");
      if (response) {
        setrecentQuiz((prev) => response.data);
      }
    };

    fetchRecentQuiz();
  }, []);
  return (
    <div className="w-7/12 mt-2">
      <div className="flex justify-between mt-4">
        <p className="font-bold text-xl">Recent</p>
        <a
          href="#"
          className="underline
        text-blue-600"
        >
          show more
        </a>
      </div>

      {/* recent */}
      <QuizList props={recentQuiz} />
      {/* my quiz */}
      <div className="flex justify-between">
        <p className="font-bold text-xl">My Quiz</p>
        <a
          href="#"
          className="underline
        text-blue-600"
        >
          show more
        </a>
      </div>
      <QuizList props={recentQuiz} />
    </div>
  );
};

export default HomeUser;
