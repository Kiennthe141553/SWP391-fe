import React, { Component } from "react";
import SubjectService from "../../services/subject.service";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import "../../styles/tailwind.css";

import { Form, Input, Button } from "antd";
import ".././style.css";

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
    window.history.go(-1);
  };

  onFinish = (values) => {
    console.log("object");
    const { id } = this.props.match.params;
    const param = {
      code: values.code || this.state.dataDetail?.code,
      description: values.description || this.state.dataDetail?.description,
      name: values.name || this.state.dataDetail?.name,
    };

    SubjectService.editSubject(id, param)
      .then(() => {
        this.props.history.push(`/list_subject_management`);
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

const EditSubject = withRouter(EditSubjectManager);

export default EditSubject;
