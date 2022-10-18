import React, { useEffect, useState } from "react";
import QuizCard from "./QuizCard";
import "../../styles/tailwind.css";

const QuizList = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
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
