import Axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import QuizList from "../Quiz/quiz-list.component";
import "../../styles/tailwind.css";
import { Carousel } from "antd";

const HomeUser = () => {
  const [recentQuiz, setrecentQuiz] = useState([]);
  const [myQuiz, setMyQuiz] = useState([]);

  useEffect(() => {
    const fetchRecentQuiz = async () => {
      const response = await Axios.get("/data/recentQuizset.json");
      if (response) {
        setrecentQuiz((prev) => response.data);
      }
    };

    fetchRecentQuiz();
  }, []);

  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <div className="w-7/12 mt-2">
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
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
