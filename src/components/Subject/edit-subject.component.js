import React, { Component } from "react";
import SubjectService from "../../services/subject.service";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import "../../styles/tailwind.css";

import { Form, Input, Button, InputNumber, DatePicker } from "antd";
import ".././style.css";
import { getDateTime } from "../../helper/datetime";
import "./subject.css";

class EditSubjectManager extends Component {
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

    SubjectService.getDetailSubject(id)
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
      code: values.code || this.state.dataDetail?.code,
      createdBy: values.createdBy || this.state.dataDetail?.createdBy,
      createdDate: values.createdDate || this.state.dataDetail?.createdDate,
      description: values.description || this.state.dataDetail?.description,
      name: values.name || this.state.dataDetail?.name,
      updatedBy: values.updatedBy || this.state.dataDetail?.updatedBy,
      updatedDate: values.updatedDate || this.state.dataDetail?.updatedDate,
      isDeleted: this.state.dataDetail?.isDeleted,
      id: this.state.dataDetail?.id,
      userId: this.state.dataDetail?.userId,
      version: values.version || this.state.dataDetail?.version,
    };

    SubjectService.EditSubject(id, param)
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
      code: dataDetail?.code,
      name: dataDetail?.name,
      description: dataDetail?.description,
      createdBy: dataDetail?.createdBy,
      createdDate: dataDetail?.createdDate,
      updatedBy: dataDetail?.updatedBy,
      updatedDate: dataDetail?.updatedDate,
      version: dataDetail?.version,
    };

    const { TextArea } = Input;

    const styles = {
      input_container: "flex items-center",
    };

    return (
      <div className="container">
        <div className="title">
          <h2>Edit Subject</h2>
        </div>
        <Form
          ref={this.formRef}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={this.onFinish}
          initialValues={initialValues}
        >
          <Form.Item label="Code" name="code" className="flex items-center">
            <Input placeholder={dataDetail?.code} />
          </Form.Item>

          <Form.Item label="Name" name="name" className="flex items-center">
            <Input placeholder={dataDetail?.name} />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            className="flex items-center"
          >
            <TextArea rows={4} placeholder={dataDetail?.description} />
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

const EditSubject = withRouter(EditSubjectManager);

export default EditSubject;
