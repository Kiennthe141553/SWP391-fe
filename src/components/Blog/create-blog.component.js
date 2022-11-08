import React, { Component } from "react";
import BlogService from "../../services/blog.service";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";

import { Form, Input, Button } from "antd";
import "./../style.css";
import "./blog.css";

export default class AddBlog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listCategory: [],
    };
  }

  formRef = React.createRef();

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });
  }

  onReset = () => {
    window.history.go(-1);
  };

  onFinish = (values) => {

    BlogService.createBlog(values)
      .then(() => {
        this.props.history.push(`/list_blog_management`);
      })
      .catch((error) => {
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
          <h2>Add Blog</h2>
        </div>
        <Form
          ref={this.formRef}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={this.onFinish}
        >
          <Form.Item
            label="Content"
            name="contentText"
            className="flex items-center"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Image"
            name="imageBase64"
            className="flex items-center"
          >
            <Input />
          </Form.Item>
          <Form.Item label="Title" name="title" className="flex items-center">
            <Input />
          </Form.Item>

          <Form.Item
            label="Create By"
            name="createdBy"
            className="flex items-center"
          >
            <Input />
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
