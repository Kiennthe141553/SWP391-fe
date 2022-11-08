import React, { Component } from "react";
import QuizService from "../../services/quiz.service";
import SubjectService from "../../services/subject.service";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";

import { Form, Input, Button, Select, InputNumber } from "antd";
import "./../style.css";
import "./quiz.css";

export default class AddQuizManagement extends Component {
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

    SubjectService.getListSubject()
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
    window.history.go(-1);
  };

  onFinish = (values) => {
    console.log(values);
    const payload = {
      id: "",
      deleted: 0,
      userId: "",
      totalQuestions: 0,
      ...values,
    };
    QuizService.createQuiz(payload)
      .then(() => {
        this.props.history.push(`/list_quiz_management`);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });
  };

  render() {
    const listSub = this.state.list;
    const buttonItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 4,
      },
    };

    const { TextArea } = Input;

    return (
      <div className="container">
        <div className="title">
          <h2>Add Quiz</h2>
        </div>
        <Form
          ref={this.formRef}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={this.onFinish}
        >
          <Form.Item
            label="Subject"
            name="subjectId"
            className="flex items-center"
          >
            <Select>
              {listSub.map((item, index) => (
                <Select.Option key={index} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Code" name="code" className="flex items-center">
            <Input />
          </Form.Item>

          <Form.Item label="Name" name="name" className="flex items-center">
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            className="flex items-center"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Rating" name="rating" className="flex items-center">
            <InputNumber />
          </Form.Item>

          <Form.Item {...buttonItemLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={this.onReset}>
              Back
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
