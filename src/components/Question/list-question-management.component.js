import React, { Component } from "react";
import { Space, Table, Button } from "antd";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import { Redirect } from "react-router-dom";
import { getDateTime } from "../../helper/datetime";
import ".././style.css";
import "../../styles/tailwind.css";
import { Input } from "antd";
import questionService from "../../services/question.service";
const { Search } = Input;

export default class ListQuestionManagement extends Component {
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
    questionService
      .getListQuestion()
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
    const removeQuestionAdmin = (id) => {
      console.log(id);
      questionService
        .deleteQuestion(id)
        .then((response) => {
          this.props.history.push(`/list_question_management`);
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
        title: "Code",
        dataIndex: "code",
        key: "code",
        render: (text, record) => {
          return (
            <Link
              to={`/question_management_details/${record.id}`}
              className="-text-link"
            >
              {text}
            </Link>
          );
        },
      },
      {
        title: "Id",
        dataIndex: "Id",
        key: "Id",
        render: (text) => <p>{text}</p>,
      },
      {
        title: "Question Text",
        dataIndex: "question_text",
        key: "question_text",
        render: (text) => <p>{text}</p>,
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        render: (text) => <p>{text}</p>,
      },
      {
        title: "Quiz Id",
        dataIndex: "quizId",
        key: "quizId",
      },
      {
        title: "Total Answer",
        dataIndex: "totalAnswer",
        key: "totalAnswer",
        render: (text) => <p>{getDateTime(text)}</p>,
      },

      {
        title: "Action",
        key: "action",
        render: (text, record) => {
          return (
            <Space size="middle">
              <Link
                to={`/edit_question/${record.id}`}
                className="p-2 bg-green-400 rounded-lg text-white"
              >
                Edit
              </Link>
              <Link
                to="/#"
                onClick={() => removeQuestionAdmin(record.id)}
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
          return String(entry.code).toLowerCase().includes(valueToLowCase);
        });
        this.setState({ dataSource: filteredData });
      }
    };
    return (
      <div className="container">
        <div className="title">
          <h2>List Question</h2>
        </div>
        <div className="search_and_add_blog">
          <Search
            placeholder="Search Title Question"
            onSearch={onSearch}
            enterButton
          />
          <Button type="primary" href="/add_question">
            Add Question
          </Button>
        </div>

        <div className="list-user overflow-scroll ">
          <Table columns={columns} dataSource={this.state.dataSource} />
        </div>
      </div>
    );
  }
}
