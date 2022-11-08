import React, { Component } from "react";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "../../styles/tailwind.css";
import moment from "moment";
import { Form, Input, Button, Select, DatePicker } from "antd";
import ".././style.css";
import "./user.css";

class EditUserAdmin extends Component {
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

    UserService.getDetailUser(id)
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
    const { id } = this.props.match.params;

    const isActive = values.active !== null ? values.active : this.state.dataDetail?.active
    const isGender =
      values.gender !== null
        ? values.gender
        : this.state.dataDetail?.gender || 1;

    const param = {
      active: isActive,
      address: values.address || this.state.dataDetail?.address,
      birthDate: values.birthDate || this.state.dataDetail?.birthDate,
      email: values.email || this.state.dataDetail?.email,
      firstName: values.firstName || this.state.dataDetail?.firstName,
      gender: isGender,
      id: id,
      lastName: values.lastName || this.state.dataDetail?.lastName,
    };

    UserService.editUser(id, param)
      .then(() => {
        console.log("run");
        this.props.history.push(`/list_user_admin`);
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

  

    const genderDefault = dataDetail?.gender
      ? dataDetail.gender === 0
        ? "Male"
        : "Female"
      : "";

    const activeDefault = dataDetail?.active === 0 ? "Deactive" : "Active";
    return (
      <div className="container">
        <div className="title">
          <h2>Edit User</h2>
        </div>
        <Form
          ref={this.formRef}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={this.onFinish}
        >
          <Form.Item label="Active" name="active" className="flex items-center">
            <Select placeholder={activeDefault}>
              <Select.Option value={0}>Deactive</Select.Option>
              <Select.Option value={1}>Active</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Email" name="email" className="flex items-center">
            <Input placeholder={dataDetail?.email} />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            className="flex items-center"
          >
            <Input placeholder={dataDetail?.address} />
          </Form.Item>
          <Form.Item
            label="Birthday"
            name="birthDate"
            className="flex items-center"
          >
            <DatePicker
              placeholder={moment(dataDetail?.birthDate).format("MM/DD/YYYY")}
              picker="week"
            />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="firstName"
            className="flex items-center"
          >
            <Input placeholder={dataDetail?.firstName} />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            className="flex items-center"
          >
            <Input placeholder={dataDetail?.lastName} />
          </Form.Item>
          <Form.Item label="Gender" name="gender" className="flex items-center">
            <Select placeholder={genderDefault}>
              <Select.Option value={0}>Male</Select.Option>
              <Select.Option value={1}>Female</Select.Option>
            </Select>
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

const EditUser = withRouter(EditUserAdmin);

export default EditUser;
