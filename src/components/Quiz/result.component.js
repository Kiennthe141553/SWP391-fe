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
                className={item.correct ? "background-green" : "background-red"}
              >
                <div className="rounded-lg p-2 m-4 cursor-pointer transition ease-in duration-100 hover:shadow-md translate-card">
                  <div>
                    <div className="font-bold text-xl ">
                      Ques {index + 1}: {item.questionText}
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
            <Button htmlType="button" onClick={this.onBack}>
              Return Home
            </Button>
            <Button htmlType="button" onClick={this.onRetake}>
              Retake Quiz
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
