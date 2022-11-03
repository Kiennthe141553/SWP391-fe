import React, { Component } from "react";

import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import "../Quiz/quiz.css";
import { Form, Input, Button, Select } from "antd";
import "./../style.css";
import questionService from "../../services/question.service";
import quizService from "../../services/quiz.service";

export default class AddQuestionManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  formRef = React.createRef();

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });

    quizService
      .getAllQuiz()
      .then((response) => {
        this.setState({ list: response.data });
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });
  }

  onReset = () => {
    this.formRef.current.resetFields();
  };

  onFinish = (values) => {
    const payload = {
      id: "",
      totalAnswer: "3",
      deleted: false,
      quiztsubjectId: 0,
      ...values,
    };

    const demodata = {
      id: "",
      quiztsubjectId: 54,
      totalAnswer: "44",
      deleted: false,
      ...values,
    };
    console.log(values);
    questionService
      .createQuestion(demodata)
      .then(() => {
        this.props.history.push(`/list_question_management`);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });
  };

  render() {
    const quizSub = this.state.list;
    const buttonItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 4,
      },
    };

    return (
      <div className="container">
        <div className="title">
          <h2>Add Question</h2>
        </div>
        <Form
          ref={this.formRef}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={this.onFinish}
        >
          <Form.Item
            label="Quiz Id"
            name="quiztId"
            className="flex items-center"
          >
            <Select>
              {quizSub.map((item, index) => (
                <Select.Option key={index} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Question Text"
            name="questionText"
            className="flex items-center"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Answer 1"
            name="answer1"
            className="flex items-center"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Answer 2"
            name="answer2"
            className="flex items-center"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Answer 3"
            name="answer3"
            className="flex items-center"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Right Answer"
            name="rightAnswer"
            className="flex items-center"
          >
            <Select>
              <Select.Option value={1}>1</Select.Option>
              <Select.Option value={2}>2</Select.Option>
              <Select.Option value={3}>3</Select.Option>
              ))
            </Select>
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={this.onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
