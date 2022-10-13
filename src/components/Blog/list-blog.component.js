import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";
import "../../styles/tailwind.css";
import { Redirect } from "react-router-dom";
import "./style.css";
import { Input } from "antd";
const { Search } = Input;

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
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });
    UserService.getListUser()
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
          <h2>List Users</h2>
        </div>
        <Search
          placeholder="Search name user"
          onSearch={onSearch}
          enterButton
        />
        {this.state.userReady ? (
          <Row gutter={16}>
            {this.state.dataSource.map((item) => {
              return (
                <Col span={8} className="overflow-scroll">
                  <Card title={item.title} bordered={false}>
                    {item.content}
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : null}
      </div>
    );
  }
}
