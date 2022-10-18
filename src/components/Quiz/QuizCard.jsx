import React from "react";
import "../../styles/tailwind.css";
const QuizCard = ({ id, title, author, authorImg, totalQuiz }) => {
  console.log(id);
  return (
    <div className="bg-gray-200 rounded-lg p-2 m-2 cursor-pointer">
      <div>
        <div className="font-bold text-xl text-gray-800">{title}</div>
        <div className="text-gray-400">{totalQuiz} question</div>
      </div>
      <div>
        <div className="flex mt-4 items-center">
          <img
            src={authorImg}
            className="w-8 h-8 mr-2"
            style={{ borderRadius: "50%" }}
            alt=""
          />
          <div className="font-semibold">{author}</div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
