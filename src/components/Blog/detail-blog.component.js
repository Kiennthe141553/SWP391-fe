import React, { Component } from "react";

import BlogService from "../../services/blog.service";
import EventBus from "../../common/EventBus";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

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
      <div className="">
        <div className="title"></div>
        {userReady ? (
          <div className="overflow-scroll p-4" style={{ height: "93vh" }}>
            {/* title */}
            <div className="text-center text-3xl font-semibold mb-10 mt-4">
              {data?.title}
            </div>
            {/* author */}
            <div className="text-right text-gray-400 font-bold">
              {data.authorID}
            </div>
            <hr className="border bg-gray-800 mb-5" />
            {/* image */}
            <div>
              <img
                className="lg:w-6/12 md:w-10/12 mb-5 cover rounded-lg mx-auto"
                alt=""
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png"
              />
            </div>

            {/* content */}
            <div className="mb-10 text-xl">&emsp;{data.contentText}</div>
          </div>
        ) : null}
      </div>
    );
  }
}

const DetailBlog = withRouter(DetailBlogUser);

export default DetailBlog;
