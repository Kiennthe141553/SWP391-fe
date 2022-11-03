import React, { Component } from "react";

import EventBus from "../../common/EventBus";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "../../styles/tailwind.css";
import questionService from "../../services/question.service";
class DetailQuestion extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      userReady: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    questionService
      .getDetailQuestion(id)
      .then((response) => {
        this.setState({ data: response.data, userReady: true });
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });
  }

  render() {
    const { data, userReady } = this.state;
    console.log(data);
    return (
      <div className="container">
        <div className="title">
          <h2 className="text-2xl">Detail Question: {data?.code}</h2>
        </div>
        {userReady ? (
          <div>
            <p>
              <strong>Id:</strong> {data?.id}
            </p>
            <p>
              <strong>Quiz Id:</strong> {data?.quiztId}
            </p>
            <p>
              <strong>questionText:</strong> {data?.questionText}
            </p>
            <p>
              <strong>Answer 1:</strong> {data?.answer1}
            </p>
            <p>
              <strong>Answer 2:</strong> {data?.answer2}
            </p>

            <p>
              <strong>Answer 3:</strong> {data?.answer3}
            </p>

            <p>
              <strong>Correct Answer</strong> {data?.rightAnswer}
            </p>

            <p>
              <strong>Total Answer:</strong> {data?.totalAnswer}
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}

const DetailManageQuestion = withRouter(DetailQuestion);

export default DetailManageQuestion;
