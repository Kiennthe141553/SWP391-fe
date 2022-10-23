import React, { useEffect, useState } from "react";
import "../../styles/tailwind.css";
import authService from "../../services/auth.service";
import QuizCard from "./quiz-card.component";

const QuizList = (props) => {
  const [data, setData] = useState([]);
  const userID = authService.getCurrentUserId();

  useEffect(() => {
    console.log(userID);
    if (props) {
      setData(Object.values(props)[0]);
    }
  }, [props]);
  return (
    <div className="">
      {data.map((item) => (
        <div>
          <QuizCard
            id={item.id}
            title={item.title}
            author={item.author}
            authorImg={item.authorImg}
            totalQuiz={item.total_quiz}
          />
        </div>
      ))}
    </div>
  );
};

export default QuizList;
