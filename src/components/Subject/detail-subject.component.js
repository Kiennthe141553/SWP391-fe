import React, { Component } from "react";

import SubjectService from "../../services/subject.service";
import EventBus from "../../common/EventBus";
import PropTypes from "prop-types";
import { Pagination } from "antd";
import QuizService from "../../services/quiz.service";
import { withRouter } from "react-router-dom";

import "../../styles/tailwind.css";
class DetailSubjectUser extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.onShowChange = this.onShowChange.bind(this);
    this.state = {
      data: [],
      userReady: false,
      listQuiz: [],
    };
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
        <div className="mt-2">
          <h2 className="mb-1 text-2xl font-bold">
            Detail Subject: {data?.name} - {data?.code}
          </h2>
        </div>
        {userReady ? (
          <ul className="w-10/12 mt-6 mx-auto p-2 rounded-sm text-gray-600  bg-gray-100">
            <li>
              <strong>Description:</strong> {data?.description}
            </li>
          </ul>
        ) : null}

        <div className=" mt-2">
          <div className="flex justify-between mt-4">
            <p className="font-bold text-xl">List Quiz</p>
          </div>

          <div className="overflow-y-scroll" style={{ height: "650px" }}>
            {listQuiz?.map((item) => (
              <a href={`/detail_quiz/${item.id}`}>
                <div className="bg-gray-200 rounded-lg p-2 m-4 cursor-pointer transition ease-in duration-100 hover:shadow-md translate-card">
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
          <div className="flex justify-center">
            <Pagination
              className=""
              defaultCurrent={1}
              total={total}
              onChange={this.onShowChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

const DetailUserSubject = withRouter(DetailSubjectUser);

export default DetailUserSubject;
