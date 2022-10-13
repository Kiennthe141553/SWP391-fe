import React, { Component } from "react";
import { Space, Table, Button } from "antd";
import { Link } from "react-router-dom";
import BlogService from "../../services/blog.service";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import { Redirect } from "react-router-dom";
import { getDateTime } from "../../helper/datetime";
import ".././style.css";
import "../../styles/tailwind.css";
import { Input } from "antd";
const { Search } = Input;

export default class ListBlogManagement extends Component {
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
    BlogService.getListBlog()
      .then((response) => {
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
      BlogService.deleteBlog(id)
        .then((response) => {
          this.props.history.push(`/list_blog_management`);
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
        title: "Title",
        dataIndex: "title",
        key: "title",
        render: (text, record) => {
          return (
            <Link
              to={`/blog_management_details/${record.id}`}
              className="-text-link"
            >
              {text}
            </Link>
          );
        },
      },
      {
        title: "Author",
        dataIndex: "authorID",
        key: "authorID",
        render: (text) => <p>{text}</p>,
      },
      {
        title: "Content",
        dataIndex: "contentText",
        key: "contentText",
        render: (text) => <p>{text}</p>,
      },
      {
        title: "Create By",
        dataIndex: "createdBy",
        key: "createdBy",
      },
      {
        title: "Update By",
        dataIndex: "updatedBy",
        key: "updatedBy",
      },
      {
        title: "Create Date",
        dataIndex: "createdDate",
        key: "createdDate",
        render: (text) => <p>{text}</p>,
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => {
          console.log(record);
          return (
            <Space size="middle">
              <Link
                to={`/edit_blog/${record.id}`}
                className="p-2 bg-green-400 rounded-lg text-white"
              >
                Edit
              </Link>
              <Link
                to="/#"
                onClick={() => removeUserAdmin(record.id)}
                className="p-2 bg-red-500 rounded-lg text-white"
              >
                Delete
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
        <div className="search_and_add_blog">
          <Search
            placeholder="Search Title Blog"
            onSearch={onSearch}
            enterButton
          />
          <Button type="primary" href="/add_blog">
            Add Blog
          </Button>
        </div>
        {this.state.userReady ? (
          <div className="list-user overflow-scroll ">
            <Table columns={columns} dataSource={this.state.dataSource} />
          </div>
        ) : null}
      </div>
    );
  }
}
