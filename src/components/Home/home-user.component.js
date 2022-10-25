import React, { Component } from "react";

import "../../styles/tailwind.css";
import { Carousel } from "antd";
import SubjectService from "../../services/subject.service";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
class HomeUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      userReady: false,
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });

    SubjectService.getListSubject()
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
    // const linkDetailSubject = (id) => {
    //   this.props.history.push(`/detail_subject/${id}`);
    // };
    return (
      <div className="w-7/12 mt-2">
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
        <div className="flex justify-between mt-4">
          <p className="font-bold text-xl">Recent</p>
          <a
            href="/"
            className="underline
        text-blue-600"
          >
            show more
          </a>
        </div>

        {/* recent */}
        {/* <SubjectList props={this.props} /> */}
        <div className="">
          {data?.map((item) => (
            <a href={`/detail_subject/${item.id}`}>
              <div
                className="bg-gray-200 rounded-lg p-2 m-2 cursor-pointer"
                // onClick={linkDetailSubject(item.id)}
              >
                <div>
                  <div className="font-bold text-xl text-gray-800">
                    {item.name}
                  </div>
                  <div className="text-gray-400">{item.code}</div>
                </div>
                <div>
                  <div className="flex mt-4 items-center">
                    <div className="font-semibold">{item.description}</div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }
}

export default HomeUser;
