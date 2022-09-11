import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserService from "../services/user.service";
import { Table } from 'antd';
import { Link } from 'react-router-dom'
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";

// import {  getDateTime } from '../helper/datetime'

export default class ListUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    UserService.getInfoUser()
      .then((response) => {
        this.setState({ currentUser: response.data, userReady: true })
        // console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });
  }

  render() {
    const {currentUser} = this.state
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        render: (text, record) => {
          return (
            <Link to={`/products_details/${record.id}`} className="-text-link">
              {text}
            </Link>
          );
        },
      },
      {
        title: "User Role",
        dataIndex: "role",
        key: "role",
        render: (text) => <p>{text}</p>,
      },
      {
        title: "User Name",
        dataIndex: "fullName",
        key: "fullName",
        render: (text) => <p>{text}</p>,
      },

      {
        title: "Phone",
        dataIndex: "phoneNo",
        key: "phoneNo",
        render: (text) => <p>{text}</p>,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (text) => <p>{text}</p>,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        render: (text) => <p>{text}</p>,
      },
    ];

    return (
      <div className="container">
        <div className="title">
          <h2>List Users</h2>
        </div>
        {this.state.userReady?(<Table columns={columns} dataSource={currentUser} />):null}
      </div>
    );
  }
}
