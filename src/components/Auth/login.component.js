import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";

import "../../styles/tailwind.css";
import "../../styles/login.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="text-red-400 ml-2" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        (response) => {
          console.log(response);
          if (response.firstLogin) {
            this.props.history.push("/change-password");
          } else {
            if (response.role === "ADMIN") {
              this.props.history.push("/chart");
            }
            if (response.role === "MARKETING") {
              this.props.history.push("/admin-content-home");
            }
            if (response.role === "CUSTOMER") {
              this.props.history.push("/home");
            }
          }
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <div className="col-md-12 login-container ">
        <div className="login-box md:w-6/12 w-5/12">
          <img className="login_img" src="../../login.webp" alt="" />

          <Form
            className="w-4/12 login-input-box shadow-md"
            onSubmit={this.handleLogin}
            ref={(c) => {
              this.form = c;
            }}
          >
            <p className="font-bold text-gray-400 text-3xl mb-4">Login</p>
            <div className="form-group login-input">
              {/* <label htmlFor="username">Username</label> */}
              <Input
                type="text"
                placeholder="Username"
                className="form-control inp"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group login-input">
              {/* <label htmlFor="password">Password</label> */}
              <Input
                placeholder="Password"
                type="password"
                className="form-control inp"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group login-input">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group login-input">
                <div className="text-red-400 ml-2" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
