import React, { Component } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";
import {
    Form,
    Input,
    Select,
    Button
  } from 'antd';
import './style.css'

export default class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listRole: []
    };
  }

  formRef = React.createRef();

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });
    UserService.getListRole().then((response) => {
      console.log(response)
      this.setState({ listRole: response.data })
      console.log(this.state.listRole)
    }).catch((error) => {
      console.log(error)
      if (error.response && error.response.status === 401) {
        EventBus.dispatch("logout");
      }
    })
  }

  onReset = () => {
    this.formRef.current.resetFields();
  };

  onFinish = (values) => {
    console.log(values)
    UserService.createUser(values)
    .then(() => {
      this.props.history.push(`/user`)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    const listRole = this.state.listRole
    const buttonItemLayout = {
        wrapperCol: {
          span: 14,
          offset: 4,
        },
      }
    return (
        <div className="container">
        <div className="title">
          <h2>Add User</h2>
        </div>
        <Form
          ref={this.formRef}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={this.onFinish}
        >
        <Form.Item label="User Name" name='username'>
          <Input />
        </Form.Item>
        <Form.Item label="Full Name" name='fullName'>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name='email'>
          <Input />
        </Form.Item>
        <Form.Item label="Address" name='address'>
          <Input />
        </Form.Item>
        <Form.Item label="Phone" name='phoneNo'>
          <Input />
        </Form.Item>
        {/* <Form.Item label="Role" name='roleId'>
          <Input />
        </Form.Item> */}
        <Form.Item label="Role"  name='roleId'>
          <Select>
            {listRole.map(
              (item, index) => (
                <Select.Option key={index} value={item.id}>
                  {item.role}
                </Select.Option>
              )
            )}
          </Select>
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">Submit</Button>
          <Button htmlType="button" onClick={this.onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
      </div>
    );
  }
}
