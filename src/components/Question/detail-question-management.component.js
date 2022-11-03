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
          <h2 className="text-2xl">Detail Question: {data?.code}</h2>
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

const DetailManageQuestion = withRouter(DetailQuestion);

export default DetailManageQuestion;
