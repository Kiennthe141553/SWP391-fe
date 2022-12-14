import React, { Component } from "react";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import { Redirect } from "react-router-dom";

import ".././style.css";
import { Input } from "antd";
const { Search } = Input;

export default class ListUserAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      redirect: null,
      userReady: false,
      dataSource: [],
      value: "",
      list: [],
      dataSearch: []
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
    const removeUserAdmin = (id) => {
      console.log(id);
      UserService.deactiveUser(id)
        .then((response) => {
          this.props.history.push(`/list_user_admin`);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        });
    };
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    const data = this.state.list;
    const columns = [
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (text, record) => {
          return (
            <Link
              to={`/user_admin_details/${record.id}`}
              className="-text-link"
            >
              {text}
            </Link>
          );
        },
      },

      {
        title: "User Name",
        dataIndex: "username",
        key: "username",
        render: (text) => <p>{text}</p>,
      },
      {
        title: "Role",
        dataIndex: "roles",
        key: "roles",
        render: (text) => <p>{text}</p>,
      },
      {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => {
          console.log(record);
          return (
            <Space size="middle">
              <Link
                to={`/edit_user_admin/${record.id}`}
                className="p-2 border rounded-lg text-black"
              >
                Edit
              </Link>
              <Link
                to="/#"
                onClick={() => removeUserAdmin(record.id)}
                className={
                  Boolean(record.active)
                    ? "p-2 bg-red-400 rounded-lg text-white"
                    : "p-2 bg-green-400 rounded-lg text-white"
                }
              >
                {Boolean(record.active) ? "Disable" : "Enable"}
              </Link>
            </Space>
          );
        },
      },
    ];

    const onSearch = (val) => {
      this.setState({ dataSource: data });
      console.log(val);
      if (val === "") {
        this.setState({ dataSource: data });
      } else {
        const currValue = val;
        this.setState({ value: currValue });
        const valueToLowCase = String(currValue).toLowerCase();
        const filteredData = data.filter((entry) => {
          return String(entry.email).toLowerCase().includes(valueToLowCase);
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
          <Table columns={columns} dataSource={this.state.dataSource} />
        ) : null}
      </div>
    );
  }
}
