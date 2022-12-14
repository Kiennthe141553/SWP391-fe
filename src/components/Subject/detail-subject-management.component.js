import React, { Component } from "react";

import SubjectService from "../../services/subject.service";
import EventBus from "../../common/EventBus";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import "../../styles/tailwind.css";
class DetailSubject extends Component {
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
    SubjectService.getDetailSubject(id)
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
    return (
      <div className="container">
        <div className="text-gray-700">
          <h2 className="text-2xl">Detail Subject: {data?.name}</h2>
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
              <strong>Create By:</strong> {data?.createdBy}
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}

const DetailManageSubject = withRouter(DetailSubject);

export default DetailManageSubject;
