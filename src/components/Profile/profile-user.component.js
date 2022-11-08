import React, { Component } from "react";
import EventBus from "../../common/EventBus";
import { Form, Input, Button, DatePicker, Select } from "antd";
import userService from "../../services/user.service";
import "../../styles/tailwind.css";
import "./profile.css";
import moment from "moment";

class ProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoUser: {},
      userReady: false,
      isEdit: false,
    };
  }

  componentDidMount() {
    const usernameJson = JSON.parse(localStorage.getItem("username"));
    const body = {
      username: usernameJson,
    };
    userService
      .getProfile(body)
      .then((response) => {
        console.log(response.data);
        this.setState({ infoUser: response.data, userReady: true });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });
  }

  onBack = () => {
    this.setState({
      isEdit: false,
    });
  };

  onEdit = () => {
    this.setState({
      isEdit: true,
    });
  };

  onFinish = (values) => {
    console.log(values);
    const payload = {
      active: this.state.infoUser?.active,
      address: values.address | this.state.infoUser?.address,
      birthDate: values.birthDate | this.state.infoUser?.birthDate,
      createdBy: this.state.infoUser?.createdBy,
      createdDate: this.state.infoUser?.createdDate,
      email: values.email | this.state.infoUser?.email,
      firstName: values.firstName | this.state.infoUser?.firstName,
      gender:
        values.gender !== null ? values.gender : this.state.infoUser?.gender,
      id: this.state.infoUser?.id,
      isDeleted: this.state.infoUser?.isDeleted,
      lastName: values.lastName | this.state.infoUser?.lastName,
      password: "",
      updatedBy: this.state.infoUser?.updatedBy,
      updatedDate: this.state.infoUser?.updatedDate,
      username: "",
      version: this.state.infoUser?.version,
    };

    const usernameJson = JSON.parse(localStorage.getItem("username"));
    const body = {
      username: usernameJson,
    };
    userService
      .editProfile(payload)
      .then(() => {
        userService
          .getProfile(body)
          .then((response) => {
            console.log(response.data);
            this.setState({ infoUser: response.data, userReady: true });
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              EventBus.dispatch("logout");
            }
          });
        this.setState({
          isEdit: false,
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });
  };
  render() {
    const { infoUser, isEdit } = this.state;
    const buttonItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 4,
      },
    };

    const genderDefault = infoUser?.gender
      ? infoUser.gender === 0
        ? "Male"
        : "Female"
      : "";

    return (
      <div className="container">
        <div className="title">
          <h2>Profile</h2>
        </div>
        <Form
          ref={this.formRef}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={this.onFinish}
          disabled={!isEdit}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            className="flex items-center"
          >
            <Input placeholder={infoUser?.firstName} />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            className="flex items-center"
          >
            <Input placeholder={infoUser?.lastName} />
          </Form.Item>

          <Form.Item
            label="Birthday"
            name="birthDate"
            className="flex items-center"
          >
            <DatePicker
              placeholder={moment(infoUser?.birthDate).format("MM/DD/YYYY")}
            />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            className="flex items-center"
          >
            <Input placeholder={infoUser?.address} />
          </Form.Item>

          <Form.Item label="Email" name="email" className="flex items-center">
            <Input placeholder={infoUser?.email} />
          </Form.Item>

          <Form.Item label="Gender" name="gender" className="flex items-center">
            <Select placeholder={genderDefault}>
              <Select.Option value={0}>Male</Select.Option>
              <Select.Option value={1}>Female</Select.Option>
            </Select>
          </Form.Item>
          {isEdit && (
            <Form.Item {...buttonItemLayout}>
              <div className="w-full flex justify-center ">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="mr-2 transition ease-in-out translate-card shadow-md"
                >
                  Submit
                </Button>
                <Button
                  htmlType="button"
                  onClick={this.onBack}
                  className="transition ease-in-out translate-card shadow-md"
                >
                  Back
                </Button>
              </div>
            </Form.Item>
          )}
        </Form>
        {!isEdit && (
          <div className="w-full flex justify-center translate-card transition ease-in-out">
            <Button
              type="primary"
              htmlType="button"
              onClick={this.onEdit}
              className="shadow-md"
            >
              Edit
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileDetail;
