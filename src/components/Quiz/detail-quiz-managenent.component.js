import React, { Component } from "react";

import QuizService from "../../services/quiz.service";
import EventBus from "../../common/EventBus";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { getDateTime } from "../../helper/datetime";
import "../../styles/tailwind.css";
class DetailQuiz extends Component {
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
    QuizService.getDetailQuiz(id)
      .then((response) => {
        console.log(response);
        this.setState({ data: response.data, userReady: true });
        console.log(this.state.data);
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
          <h2 className="text-2xl">Detail Quiz: {data?.code}</h2>
        </div>
        {userReady ? (
          <div>
            <p>
              <strong>Code:</strong> {data?.code}
            </p>
            <p>
              <strong>Name:</strong> {data?.name}
            </p>
            <p>
              <strong>Description:</strong> {data?.description}
            </p>
            <p>
              <strong>Subject:</strong> {data?.subjectId}
            </p>

            <p>
              <strong>Rating:</strong> {data?.rating}
            </p>

            <p>
              <strong>Total Question:</strong> {data?.totalQuestion}
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}

const DetailManageQuiz = withRouter(DetailQuiz);

export default DetailManageQuiz;
