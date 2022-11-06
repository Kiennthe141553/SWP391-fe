import React, { Component } from "react";
import { Form, Radio, Button } from "antd";
import EventBus from "../../common/EventBus";
import PropTypes from "prop-types";

import QuizService from "../../services/quiz.service";
import QuestionService from "../../services/question.service";
import { withRouter } from "react-router-dom";

import "../../styles/tailwind.css";
class TakeQuiz extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      userReady: false,
      listQues: [],
      quesNum: 1,
    };
  }

  formRef = React.createRef();

  componentDidMount() {
    const { id } = this.props.match.params;
    QuizService.getDetailQuiz(id)
      .then((response) => {
        this.setState({ data: response.data, userReady: true });
        console.log(this.state.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });

    const param = {
      quizId: id,
    };

    QuestionService.getListAnswerQues(param)
      .then((response) => {
        this.setState({ listQues: response.data, userReady: true });
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });
  }

  onFinish = (values) => {
    const payload = Object.keys(values).map((key) => {
      return { quesid: String(key), answer: values[key] };
    });
    console.log(payload);
  };

  render() {
    const buttonItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 4,
      },
    };
    const { data, listQues } = this.state;

    return (
      <div className="container">
        <div className="mt-2">
          <h2 className="mb-1 text-2xl font-bold">
            Take Quiz: {data?.name} - {data?.code}
          </h2>
        </div>

        <div className=" mt-2">
          <Form
            ref={this.formRef}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            // layout="horizontal"
            onFinish={this.onFinish}
          >
            <div className="overflow-y-scroll" style={{ height: "650px" }}>
              {listQues?.map((item, index) => (
                <div className="ques-element">
                  <div className="contain-ques">
                    <div className="quesion">
                      <span className="head-ques">Question {index + 1}: </span>
                      <span className="body-ques">{item.questionText}</span>
                    </div>

                    <div className="list-answer">
                      <Form.Item
                        className="head-list-answer"
                        label="Answers"
                        name={item.id}
                      >
                        <Radio.Group>
                          <Radio value={item.answer1}>
                            <span>{item.answer1}</span>
                          </Radio>
                          <Radio value={item.answer2}>
                            <span>{item.answer2}</span>
                          </Radio>
                          <Radio value={item.answer3}>
                            <span>{item.answer3}</span>
                          </Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Form.Item {...buttonItemLayout} className="button-submit-answer">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const TakeSelectedQuiz = withRouter(TakeQuiz);

export default TakeSelectedQuiz;
