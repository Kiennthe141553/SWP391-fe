import React, { Component } from "react";

import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import "../../styles/tailwind.css";

import { Form, Input, Button, Select } from "antd";
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
      listSelectRightAnswer: [],
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
        this.setState({
          listSubject: response.data,
        });
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
        this.setState({
          dataDetail: response.data,
          userReady: true,
          listSelectRightAnswer: [
            response.data.answer1,
            response.data.answer2,
            response.data.answer3,
          ],
        });
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

  onChange = () => {
    const arr = [
      this.formRef.current.getFieldValue("answer1"),
      this.formRef.current.getFieldValue("answer2"),
      this.formRef.current.getFieldValue("answer3"),
    ];
    this.setState({ listSelectRightAnswer: arr });
  };

  onFinish = (values) => {
    const param = {
      quiztId: values.quiztId || this.state.dataDetail?.quiztId,
      questionText: values.questionText || this.state.dataDetail?.questionText,
      answer1: values.answer1 || this.state.dataDetail?.answer1,
      answer2: values.answer2 || this.state.dataDetail?.answer2,
      answer3: values.answer3 || this.state.dataDetail?.answer3,
      name: values.rightAnswer || this.state.dataDetail?.rightAnswer,
      deleted: this.state.dataDetail?.deleted,
      id: this.state.dataDetail?.id,
      totalAnswer: this.state.dataDetail?.totalAnswer,
      quiztsubjectId: this.state.dataDetail?.quiztsubjectId,
      userId: this.state.dataDetail?.userId,
    };

    questionService
      .editQuestion(param)
      .then(() => {
        this.props.history.push(`/list_question_management`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { dataDetail, listSubject } = this.state;
    console.log(this.state.listSelectRightAnswer);
    const listAnswer = this.state.listSelectRightAnswer;
    const currentQuiz = listSubject.filter((item) => {
      return item.id === dataDetail?.quiztId;
    });

    const listSub = this.state.listSubject;

    const buttonItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 4,
      },
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
        >
          <Form.Item
            label="Quiz Id"
            name="quiztId"
            className="flex items-center"
          >
            <Select placeholder={currentQuiz[0]?.name}>
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
            <Input placeholder={dataDetail?.questionText} />
          </Form.Item>

          <Form.Item
            label="Answer 1"
            name="answer1"
            className="flex items-center"
          >
            <Input placeholder={dataDetail?.answer1} onChange={this.onChange} />
          </Form.Item>

          <Form.Item
            label="Answer 2"
            name="answer2"
            className="flex items-center"
          >
            <Input placeholder={dataDetail?.answer2} onChange={this.onChange} />
          </Form.Item>

          <Form.Item
            label="Answer 3"
            name="answer3"
            className="flex items-center"
          >
            <Input placeholder={dataDetail?.answer3} onChange={this.onChange} />
          </Form.Item>
          <Form.Item
            label="Right Answer"
            name="rightAnswer"
            className="flex items-center"
          >
            <Select placeholder={dataDetail?.rightAnswer}>
              {listAnswer.map((item, index) => (
                <Select.Option key={index} value={item}>
                  {item}
                </Select.Option>
              ))}
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
