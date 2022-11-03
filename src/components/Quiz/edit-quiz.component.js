import React, { Component } from "react";
import QuizService from "../../services/quiz.service";
import SubjectService from "../../services/subject.service";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import "../../styles/tailwind.css";

import { Form, Input, Button, InputNumber, DatePicker, Select } from "antd";
import ".././style.css";
import "./quiz.css";

class EditQuizManager extends Component {
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
      listSubject: [],
      objCate: null,
    };
  }

  formRef = React.createRef();

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });
    const { id } = this.props.match.params;

    SubjectService.getListSubject()
      .then((response) => {
        this.setState({ listSubject: response.data });
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });

    QuizService.getDetailQuiz(id)
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
      subjectId: values.subjectId || this.state.dataDetail?.subjectId,
      description: values.description || this.state.dataDetail?.description,
      name: values.name || this.state.dataDetail?.name,
      rating: values.rating || this.state.dataDetail?.rating,
      deleted: this.state.dataDetail?.deleted,
      id: this.state.dataDetail?.id,
      totalQuestions:
        values.totalQuestions || this.state.dataDetail?.totalQuestions,
      userId: this.state.dataDetail?.userId,
    };

    QuizService.editQuiz(id, param)
      .then(() => {
        this.props.history.push(`/list_quiz_management`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { dataDetail } = this.state;
    const listSub = this.state.listSubject;

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
          <h2>Edit Quiz</h2>
        </div>
        <Form
          ref={this.formRef}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={this.onFinish}
          initialValues={initialValues}
        >
          <Form.Item label="Subject" name="subjectId">
            <Select>
              {listSub.map((item, index) => (
                <Select.Option key={index} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Code" name="code" className="flex items-center">
            <Input defaultValue={dataDetail?.code} />
          </Form.Item>

          <Form.Item label="Name" name="name" className="flex items-center">
            <Input defaultValue={dataDetail?.name} />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            className="flex items-center"
          >
            <TextArea rows={4} defaultValue={dataDetail?.description} />
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            className={styles.input_container}
          >
            <InputNumber defaultValue={dataDetail?.rating} />
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

const EditQuiz = withRouter(EditQuizManager);

export default EditQuiz;
