import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class DetailBlog extends Component {
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
    UserService.getDetailUser(id)
      .then((response) => {
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
        <div className="title">
          <h2>Detail User {data?.id}</h2>
        </div>
        {userReady ? (
          <div>
            <p>
              <strong>User Name:</strong> {data?.username}
            </p>
            <p>
              <strong>Email:</strong> {data?.email}
            </p>
            <p>
              <strong>DOB:</strong> {data?.birthDate} $
            </p>
            <p>
              <strong>Gender:</strong> {data?.gender}
            </p>
            <p>
              <strong>Address:</strong> {data?.address}
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}

const DetailBog = withRouter(DetailBlog);

export default DetailBog;
