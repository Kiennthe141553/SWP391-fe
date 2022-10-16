import React, { Component } from "react";

import BlogService from "../../services/blog.service";
import EventBus from "../../common/EventBus";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { getDateTime } from "../../helper/datetime";

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
    BlogService.getDetailBlog(id)
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
        <div className="title"></div>
        {userReady ? (
          <div>
            {/* title */}
            <div>{data?.title}</div>
            {/* author */}
            {/* content */}
          </div>
        ) : null}
      </div>
    );
  }
}

const DetailBlog = withRouter(DetailBlog);

export default DetailBlog;
