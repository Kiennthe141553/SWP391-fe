import React, { Component } from "react";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
// import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";
import { Redirect } from "react-router-dom";
// import { getDateTime } from "../helper/datetime";
import "./style.css";
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
    };
  }

  componentDidMount() {
    // const currentUser = AuthService.getCurrentUser();

    // if (!currentUser) this.setState({ redirect: "/" });
    UserService.getListUser()
      .then((response) => {
        this.setState({
          dataSource: response.data,
          userReady: true,
          list: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        // if (error.response && error.response.status === 401) {
        //   EventBus.dispatch("logout");
        // }
      });
  }

  render() {
    console.log(this.state.dataSource);
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
        title: "User Name",
        dataIndex: "username",
        key: "username",
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
      // {
      //   title: "Create At",
      //   dataIndex: "createdAt",
      //   key: "createdAt",
      //   render: (text) => {
      //     const value = getDateTime(text, "DD/MM/YYYY HH:mm:ss");
      //     return <p>{value}</p>;
      //   },
      // },

      // {
      //   title: "Update At",
      //   dataIndex: "updatedAt",
      //   key: "updatedAt",
      //   render: (text) => {
      //     const value = getDateTime(text, "DD/MM/YYYY HH:mm:ss");
      //     return <p>{value}</p>;
      //   },
      // },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
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
          return (
            <Space size="middle">
              <Link to={`/edit_user_admin/${record.id}`} className="-text-link">
                Edit
              </Link>
              <Link to="/#" onClick={() => removeUserAdmin(record.id)}>
                Remove
              </Link>
            </Space>
          );
        },
      },
    ];

    const onSearch = (val) => {
      console.log(val);
      if (val === "") {
        this.setState({ dataSource: data });
      } else {
        const currValue = val;
        this.setState({ value: currValue });
        const valueToLowCase = String(currValue).toLowerCase();
        const filteredData = this.state.dataSource.filter((entry) => {
          return String(entry.productName)
            .toLowerCase()
            .includes(valueToLowCase);
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
          placeholder="Search name product"
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
