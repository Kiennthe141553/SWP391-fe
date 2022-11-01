import React, { Component } from "react";

import SubjectService from "../../services/subject.service";
import EventBus from "../../common/EventBus";
import PropTypes from "prop-types";
import { Pagination } from "antd";
import QuizService from "../../services/quiz.service";
import { withRouter } from "react-router-dom";
import { getDateTime } from "../../helper/datetime";
import "../../styles/tailwind.css";
class DetailSubjectUser extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onShowChange = this.onShowChange.bind(this);
    this.state = {
      data: [],
      userReady: false,
      listQuiz: [],
    };
  }

  onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }

  onShowChange(current) {
    const { id } = this.props.match.params;
    const param = {
      index: current,
      pageSize: 10,
      subid: id,
    };

    QuizService.getListQuiz(param)
      .then((response) => {
        this.setState({ listQuiz: response.data, userReady: true });
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    SubjectService.getDetailSubject(id)
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
      index: 1,
      pageSize: 10,
      subid: id,
    };

    QuizService.getListQuiz(param)
      .then((response) => {
        this.setState({ listQuiz: response.data, userReady: true });
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });
  }

  render() {
    const { data, userReady, listQuiz } = this.state;
    const total = listQuiz.length + 1;
    return (
      <div className="container">
        <div className="title">
          <h2 className="text-2xl">Detail Subject: {data?.code}</h2>
        </div>
        {userReady ? (
          <div>
            <p>
              <strong>Code:</strong> {data?.code}
            </p>
            <p>
              <strong>Name:</strong> {data?.name}
            </p>
            <p>
              <strong>Description:</strong> {data?.description}
            </p>
            <p>
              <strong>Create By:</strong> {data?.createdBy}
            </p>
            <p>
              <strong>Create Date:</strong> {getDateTime(data?.createdDate)}
            </p>
            <p>
              <strong>Update By:</strong> {data?.updatedBy}
            </p>
            <p>
              <strong>Update Date:</strong> {getDateTime(data?.updatedDate)}
            </p>
            <p>
              <strong>Version:</strong> {data?.version}
            </p>
          </div>
        ) : null}

        <div className=" mt-2">
          <div className="flex justify-between mt-4">
            <p className="font-bold text-xl">List Quiz</p>
          </div>

          <div className="">
            {listQuiz?.map((item) => (
              <a href={`/detail_quiz/${item.id}`}>
                <div className="bg-gray-200 rounded-lg p-2 m-2 cursor-pointer">
                  <div>
                    <div className="font-bold text-xl text-gray-800">
                      {item.name}
                    </div>
                    <div className="text-gray-400">{item.code}</div>
                  </div>
                  <div>
                    <div className="flex mt-4 items-center">
                      <div className="font-semibold">{item.description}</div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <Pagination
            showSizeChanger
            onShowSizeChange={this.onShowSizeChange}
            defaultCurrent={1}
            total={total}
            onChange={this.onShowChange}
          />
        </div>
      </div>
    );
  }
}

const DetailUserSubject = withRouter(DetailSubjectUser);

export default DetailUserSubject;
