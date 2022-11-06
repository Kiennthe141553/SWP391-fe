import React, { Component } from "react";
// import { Pagination } from "antd";
import "../../styles/tailwind.css";
import { Carousel } from "antd";
import SubjectService from "../../services/subject.service";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";

const contentStyle = {
  color: "#fff",
  lineHeight: "160px",
  background: "#364d79",
  objectFit: "cover",
  width: "100%",
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
        console.log(response.data);
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
      <div className=" flex justify-center mt-4">
        <div className="w-10/12">
          <Carousel autoplay className="12/12 h-40">
            <div style={contentStyle} className="slider">
              <img
                className="h-full"
                src={require("../../imgs/home_img_1.jpg")}
                alt="_"
              />
            </div>
            <div style={contentStyle} className="slider">
              <img
                className="h-full"
                src={require("../../imgs/home_img_2.png")}
                alt="_"
              />
            </div>
            <div style={contentStyle} className="slider">
              <img
                className="h-full"
                src={require("../../imgs/home_img_3.webp")}
                alt="_"
              />
            </div>
          </Carousel>
          <div className="flex justify-around bg-gray-100 rounded-md mt-6 p-2">
            <div className="w-6/12 " style={{ height: "600px" }}>
              <p className="font-bold text-xl">Subject List</p>
              <div className="overflow-y-scroll">
                {data?.map((item) => (
                  <a href={`/detail_subject/${item.id}`}>
                    <div className="bg-gray-200 rounded-lg p-2 m-2 cursor-pointer shadow-md translate-card transition ease-in-out">
                      <div className="flex ">
                        <div className="font-bold text-xl text-gray-800">
                          {item.name}
                        </div>
                        <div className="text-gray-400 mt-1 ml-1">
                          {" "}
                          - ({item.code})
                        </div>
                      </div>
                      <div>
                        <div className="flex mt-4 items-center text-gray-600">
                          <div className="font-semibold">
                            <div>{item.createdBy}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="w-4/12">
              <p className="font-bold text-xl">Quiz List</p>
              {data?.map((item) => (
                <a href={`/detail_subject/${item.id}`}>
                  <div className="bg-gray-200 rounded-lg p-2 m-2 cursor-pointer shadow-md translate-card transition ease-in-out">
                    <div className="flex ">
                      <div className="font-bold text-xl text-gray-800">
                        {item.name}
                      </div>
                      <div className="text-gray-400 mt-1 ml-1">
                        {" "}
                        - ({item.code})
                      </div>
                    </div>
                    <div>
                      <div className="flex mt-4 items-center text-gray-600">
                        <div className="font-semibold">
                          <div>{item.createdBy}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
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
