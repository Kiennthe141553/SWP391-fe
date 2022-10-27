import React, { Component } from "react";
import SubjectService from "../../services/subject.service";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";

import { Form, Input, Button, DatePicker } from "antd";
import "./../style.css";
import "./subject.css";

export default class AddSubjectManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  formRef = React.createRef();

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });
  }

  onReset = () => {
    this.formRef.current.resetFields();
  };

  onFinish = (values) => {
    console.log(values);
    const payload = {
      id: "",
      isDeleted: 0,
      userId: "",
      ...values,
    };
    SubjectService.createSubject(payload)
      .then(() => {
        this.props.history.push(`/list_subject_management`);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });
  };

  render() {
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
          <h2>Add Subject</h2>
        </div>
        <Form
          ref={this.formRef}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={this.onFinish}
        >
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

          <Form.Item
            label="Create By"
            name="createdBy"
            className="flex items-center"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Create Date"
            name="createdDate"
            className="flex items-center"
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Update By"
            name="updatedBy"
            className="flex items-center"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Update Date"
            name="updatedDate"
            className="flex items-center"
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Version"
            name="version"
            className="flex items-center"
          >
            <Input />
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
