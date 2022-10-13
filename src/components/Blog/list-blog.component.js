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
            <Row gutter={16} className="row-list-blog">
              {this.state.dataSource.map((item) => {
                return (
                  <Col span={8} className="col-list-blog overflow-scroll">
                    <Card
                      hoverable
                      style={{
                        borderRadius: "10px",
                        border: "1px solid black",
                      }}
                      cover={
                        <img
                          alt={item.title}
                          style={{
                            height: "10vh",
                            objectFit: "cover",
                            padding: "10px",
                          }}
                          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                        />
                      }
                      onClick={() => {
                        this.props.history.push(
                          `/blog_management_details/${item.id}`
                        );
                      }}
                    >
                      <Meta title={item.title} />
                    </Card>
                  </Col>
                );
              })}
            </Row>
            <Row className="row-paging">
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
          </>
        ) : null}
      </div>
    );
  }
}
