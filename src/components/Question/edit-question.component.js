import React, { Component } from "react";
import SubjectService from "../../services/subject.service";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import "../../styles/tailwind.css";

import { Form, Input, Button, InputNumber, DatePicker, Select } from "antd";
import ".././style.css";
import "../Quiz/quiz.css";
import questionService from "../../services/question.service";
import quizService from "../../services/quiz.service";

class EditQuestionManager extends Component {
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

    quizService
      .getAllQuiz()
      .then((response) => {
        this.setState({ listSubject: response.data });
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });

    questionService
      .getDetailQuestion(id)
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

    questionService
      .editQuestion(id, param)
      .then(() => {
        this.props.history.push(`/list_question_management`);
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
          <h2>Edit Question</h2>
        </div>
        <Form
          ref={this.formRef}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={this.onFinish}
          initialValues={initialValues}
        >
          <Form.Item
            label="Quiz Id"
            name="quiztId"
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

const EditQuestion = withRouter(EditQuestionManager);

export default EditQuestion;
