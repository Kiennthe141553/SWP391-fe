import React, { Component } from "react";

import BlogService from "../../services/blog.service";
import EventBus from "../../common/EventBus";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { getDateTime } from "../../helper/datetime";

class DetailBlogUser extends Component {
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
        <div className="title">
          <h2>Detail Blog: {data?.title}</h2>
        </div>
        {userReady ? (
          <div>
            <p>
              <strong>Author ID:</strong> {data?.authorID}
            </p>
            <p>
              <strong>Title:</strong> {data?.title}
            </p>
            <p>
              <strong>Content:</strong> {data?.contentText}
            </p>
            <p>
              <strong>Image:</strong> <img src={data?.imageID} />
            </p>
            <p>
              <strong>Create By:</strong> {data?.createdBy}
            </p>
            <p>
              <strong>Create Date:</strong> {getDateTime(data?.createdDate)}
            </p>
            <p>
              <strong>Update By:</strong> {data?.updatedBy}
            </p>
            <p>
              <strong>Update Date:</strong> {getDateTime(data?.updatedDate)}
            </p>
            <p>
              <strong>Version:</strong> {data?.version}
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}

const DetailBlog = withRouter(DetailBlogUser);

export default DetailBlog;
