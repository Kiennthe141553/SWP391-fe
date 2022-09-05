import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import UserService from "../services/user.service";


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
    this.onChangeNewPassword = this.onChangeNewPassword.bind(this);

    this.state = {
        oldPass: "",
        newPass: "",
      loading: false,
      message: ""
    };
  }

  onChangeOldPassword(e) {
    this.setState({
        oldPass: e.target.value
    });
  }

  onChangeNewPassword(e) {
    this.setState({
        newPass: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();


    UserService.changePass(this.state.newPass, this.state.oldPass).then(
        () => {
          this.props.history.push("/chart");
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="oldPass">Old Password</label>
              <Input
                type="oldPass"
                className="form-control"
                name="oldPass"
                value={this.state.oldPass}
                onChange={this.onChangeOldPassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPass">New Password</label>
              <Input
                type="newPass"
                className="form-control"
                name="passnewPassword"
                value={this.state.newPass}
                onChange={this.onChangeNewPassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Submit</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
           
          </Form>
        </div>
      </div>
    );
  }
}
