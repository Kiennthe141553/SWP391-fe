import React, { Component } from "react";
import { Row, Col, Card, Pagination } from "antd";

import BlogService from "../../services/blog.service";

import EventBus from "../../common/EventBus";

import "../../styles/tailwind.css";
import { Redirect } from "react-router-dom";
import ".././style.css";
import { Input } from "antd";
const { Search } = Input;
const { Meta } = Card;

export default class ListBlogUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      redirect: null,
      userReady: false,
      dataSource: [],
      value: "",
      list: [],
    };
  }

  componentDidMount() {
    // const currentUser = AuthService.getCurrentUser();

    // if (!currentUser) this.setState({ redirect: "/" });
    BlogService.getListBlog()
      .then((response) => {
        console.log(response.data);
        this.setState({
          dataSource: response.data,
          userReady: true,
          list: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    const data = this.state.list;

    console.log(this.state.dataSource.length % 3);
    const numberPage = this.state.dataSource.length / 3;

    const onSearch = (val) => {
      console.log(val);
      if (val === "") {
        this.setState({ dataSource: data });
      } else {
        const currValue = val;
        this.setState({ value: currValue });
        const valueToLowCase = String(currValue).toLowerCase();
        const filteredData = this.state.dataSource.filter((entry) => {
          return String(entry.title).toLowerCase().includes(valueToLowCase);
        });
        this.setState({ dataSource: filteredData });
      }
    };
    return (
      <div className="container">
        <div className="title">
          <h2>List Blogs</h2>
        </div>
        <Search
          placeholder="Search name user"
          onSearch={onSearch}
          enterButton
        />
        {this.state.userReady ? (
          <>
            {/* all card container */}
            <div className="w-full grid md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-10 mt-10">
              {this.state.dataSource.map((item) => {
                console.log(item);
                return (
                  // card container
                  <div
                    onClick={() => {
                      this.props.history.push(
                        `/blog_management_details/${item.id}`
                      );
                    }}
                    className="blog-card-container shadow-md hover:shadow-lg transition ease-in-out duration-300 cursor-pointer bg-gray-100 border border-gray-200 rounded-lg "
                  >
                    {/* title */}
                    <div className="text-center text-xl text-gray-600 font-bold p-3 h-20 overflow-hidden">
                      {item.title}
                    </div>
                    {/* image */}
                    <div className="flex justify-center">
                      <img
                        className="rounded-lg w-11/12 mb-3"
                        alt="blog"
                        style={{ objectFit: "contain" }}
                        src="https://img.freepik.com/premium-photo/astronaut-outer-open-space-planet-earth-stars-provide-background-erforming-space-planet-earth-sunrise-sunset-our-home-iss-elements-this-image-furnished-by-nasa_150455-16829.jpg?w=2000"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full flex justify-center my-10">
              <Row className="row-paging ">
                <Pagination
                  defaultCurrent={1}
                  total={
                    this.state.dataSource.length % 3 === 0
                      ? numberPage
                      : numberPage + 1
                  }
                  // current={currentPage}
                  pageSize={3}
                  showSizeChanger={false}
                  // onChange={handleOnChange}
                />
              </Row>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}
