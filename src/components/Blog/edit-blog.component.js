import React, { Component } from "react";
import BlogService from "../../services/blog.service";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import "../../styles/tailwind.css";

import { Form, Input, Button, InputNumber, DatePicker } from "antd";
import ".././style.css";
import "./blog.css";

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

    const { TextArea } = Input;

    const styles = {
      input_container: "flex items-center",
    };

    console.log(dataDetail);

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
        >
          <Form.Item
            label="Title"
            name="title"
            className={styles.input_container}
          >
            <Input placeholder={dataDetail?.title} clasName="rounded-xl" />
          </Form.Item>
          <Form.Item
            label="Content"
            name="contentText"
            className={styles.input_container}
          >
            <TextArea placeholder={dataDetail?.contentText} rows={4} />
          </Form.Item>
          <Form.Item
            label="Create By"
            name="createdBy"
            className={styles.input_container}
          >
            <Input placeholder={dataDetail?.createdBy} />
          </Form.Item>
          <Form.Item
            label="Create Date"
            name="createdDate"
            className={styles.input_container}
          >
            <DatePicker placeholder={dataDetail?.createdDate} picker="week" />
          </Form.Item>
          <Form.Item
            label="Update By"
            name="updatedBy"
            className={styles.input_container}
          >
            <Input placeholder={dataDetail?.updatedBy} />
          </Form.Item>
          <Form.Item
            label="Update Date"
            name="updatedDate"
            className={styles.input_container}
          >
            <DatePicker placeholder={dataDetail?.updatedDate} picker="week" />
          </Form.Item>
          <Form.Item
            label="Image Link"
            name="imageID"
            className={styles.input_container}
          >
            <Input placeholder={dataDetail?.imageID} />
          </Form.Item>
          <Form.Item
            label="Version"
            name="version"
            className={styles.input_container}
          >
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
