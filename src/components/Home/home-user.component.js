import React, { Component } from "react";
// import { Pagination } from "antd";
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
    // this.onShowSizeChange = this.onShowSizeChange.bind(this);
    // this.onShowChange = this.onShowChange.bind(this);
    this.state = {
      data: [],
      userReady: false,
    };
  }

  // onShowSizeChange(current, pageSize) {
  //   console.log(current, pageSize);
  // }

  // onShowChange(current) {
  //   const { id } = this.props.match.params;
  //   const param = {
  //     index: current,
  //     pageSize: 10,
  //     subid: id,
  //   };

  //   SubjectService.getListSubject(param)
  //     .then((response) => {
  //       this.setState({ data: response.data, userReady: true });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       if (error.response && error.response.status === 401) {
  //         EventBus.dispatch("logout");
  //       }
  //     });
  // }

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
    const { data } = this.state;

    // const total = data.length / 10 + 1;

    return (
      <div className=" flex justify-center mt-2">
        <div className="w-10/12">
          <Carousel autoplay className="12/12">
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
          </Carousel>
          <div className="flex justify-between mt-4">
            <p className="font-bold text-xl">Subject List</p>
          </div>

          <div className="w-7/12">
            {data?.map((item) => (
              <a href={`/detail_subject/${item.id}`}>
                <div className="bg-gray-200 rounded-lg p-2 m-2 cursor-pointer">
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

          {/* <Pagination
          showSizeChanger
          onShowSizeChange={this.onShowSizeChange}
          defaultCurrent={1}
          total={total}
          onChange={this.onShowChange}
        /> */}
        </div>
      </div>
    );
  }
}

export default HomeUser;
