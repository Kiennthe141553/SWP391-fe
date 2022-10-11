import React, { Component } from "react";
import BlogService from "../../services/blog.service";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { Form, Input, Button, InputNumber, DatePicker } from "antd";
import ".././style.css";

class EditBlogManager extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataDetail: null,
      userReady: false,
      listCategory: [],
      objCate: null,
    };
  }

  formRef = React.createRef();

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });
    const { id } = this.props.match.params;

    BlogService.getDetailBlog(id)
      .then((response) => {
        this.setState({ dataDetail: response.data, userReady: true });
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
    const { id } = this.props.match.params;
    const param = {
      authorID: this.state.dataDetail?.authorID,
      contentText: values.contentText || this.state.dataDetail?.contentText,
      createdBy: values.createdBy || this.state.dataDetail?.createdBy,
      createdDate: values.createdDate || this.state.dataDetail?.createdDate,
      imageID: values.imageID || this.state.dataDetail?.imageID,
      title: values.title || this.state.dataDetail?.title,
      updatedBy: values.updatedBy || this.state.dataDetail?.updatedBy,
      updatedDate: values.updatedDate || this.state.dataDetail?.updatedDate,
      isDeleted: 0,
      id: id,
      version: values.version || this.state.dataDetail?.version,
    };

    BlogService.editBlog(id, param)
      .then(() => {
        this.props.history.push(`/list_blog_management`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { dataDetail } = this.state;

    const buttonItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 4,
      },
    };

    const initialValues = {
      address: dataDetail?.address,
      birthDate: dataDetail?.birthDate,
      email: dataDetail?.email,
      firstName: dataDetail?.firstName,
      gender: dataDetail?.gender,
      lastName: dataDetail?.lastName,
      active: dataDetail?.active,
    };

    const { TextArea } = Input;

    return (
      <div className="container">
        <div className="title">
          <h2>Edit User</h2>
        </div>
        <Form
          ref={this.formRef}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={this.onFinish}
          initialValues={initialValues}
        >
          <Form.Item label="Title" name="title">
            <Input placeholder={dataDetail?.title} />
          </Form.Item>
          <Form.Item label="Content" name="contentText">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Create By" name="createdBy">
            <Input placeholder={dataDetail?.createdBy} />
          </Form.Item>
          <Form.Item label="Create Date" name="createdDate">
            <DatePicker placeholder={dataDetail?.createdDate} picker="week" />
          </Form.Item>
          <Form.Item label="Update By" name="updatedBy">
            <Input placeholder={dataDetail?.updatedBy} />
          </Form.Item>
          <Form.Item label="Update Date" name="updatedDate">
            <DatePicker placeholder={dataDetail?.updatedDate} picker="week" />
          </Form.Item>
          <Form.Item label="Image Link" name="imageID">
            <Input placeholder={dataDetail?.imageID} />
          </Form.Item>
          <Form.Item label="Version" name="version">
            <InputNumber placeholder={dataDetail?.version} />
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

const EditBlog = withRouter(EditBlogManager);

export default EditBlog;
