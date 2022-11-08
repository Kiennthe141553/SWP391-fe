import React, { Component } from "react";

import { Button } from "antd";

import "../../styles/tailwind.css";

import PropTypes from "prop-types";

export default class ResultQuiz extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  onBack = () => {
    this.props.history.push(`/`);
  };

  onRetake = () => {
    this.props.history.push(`/detail_quiz/${this.props.idQuiz}`);
    window.location.reload();
  };

  render() {
    const { listResult, listAllQues } = this.props;

    const listCorrect = listResult.filter((item) => {
      return item.correct === true;
    });

    const listMapResult = listAllQues.map((item) => {
      return {
        ...item,
        ...listResult.find((i) => {
          return i.questid === item.id;
        }),
      };
    });

    console.log(listMapResult);
    return (
      <div className="container">
        <div className="show-result">
          <div className="font-bold text-xl ">
            Total Correct: {listCorrect.length} / {listResult.length}
          </div>

          <div className="detail-result">
            {listMapResult.map((item, index) => (
              <div
                className={
                  item.correct
                    ? "bg-green-400 rounded-md"
                    : "bg-red-400 rounded-md"
                }
              >
                <div className="p-2 m-4 cursor-pointer">
                  <div>
                    <div className="font-bold text-xl ">
                      Question {index + 1}: <p>{item.questionText}</p>
                    </div>
                    <div className="font-bold ">
                      Your answer: {item.yourAnswer}
                    </div>
                    {!item.correct && (
                      <div className="font-bold ">
                        Correct answer: {item.correctAnswer}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="group-result-button">
            <button
              htmlType="button"
              onClick={this.onBack}
              className="ease-in-out transition p-2 translate-card rounded bg-blue-400 text-white mr-4 hover:shadow-md"
            >
              Return Home
            </button>
            <button
              htmlType="button"
              onClick={this.onRetake}
              className="transition ease-in-out p-2 translate-card rounded bg-green-400 text-white hover:shadow-md"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }
}
