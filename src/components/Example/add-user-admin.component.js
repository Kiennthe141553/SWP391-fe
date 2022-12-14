import React, { Component } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
// import EventBus from "../common/EventBus";

import { Form, Input, Button, Select, InputNumber } from "antd";
import "./style.css";

export default class AddUserAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listCategory: [],
    };
  }

  formRef = React.createRef();

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });
  }

  onReset = () => {
    window.history.go(-1);
  };

  onFinish = (values) => {
    console.log(values);
    UserService.createProduct(values)
      .then(() => {
        this.props.history.push(`/list_products`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const listCate = this.state.listCategory;
    const buttonItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 4,
      },
    };
    const { TextArea } = Input;
    return (
      <div className="container">
        <div className="title">
          <h2>Add Product</h2>
        </div>
        <Form
          ref={this.formRef}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={this.onFinish}
        >
          <Form.Item label="Subject" name="subject">
            <Select>
              {listCate.map((item, index) => (
                <Select.Option key={index} value={item.category_id}>
                  {item.categoryName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Product Name" name="productName">
            <Input />
          </Form.Item>
          <Form.Item label="Product Price" name="price">
            <Input />
          </Form.Item>

          <Form.Item label="Quantity" name="quantity">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} />
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
