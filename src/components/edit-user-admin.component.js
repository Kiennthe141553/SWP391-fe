import React, {Component} from "react";
import UserService from "../services/user.service";
// import AuthService from "../services/auth.service";
// import EventBus from "../common/EventBus";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
// import { Redirect } from "react-router-dom";
// import {  getDateTime } from '../helper/datetime'
import {Form, Input, Button, Radio, DatePicker} from "antd";
import "./style.css";

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
    // const currentUser = AuthService.getCurrentUser();

    // if (!currentUser) this.setState({ redirect: "/" });
    const {id} = this.props.match.params;

    // UserService.getListCategory()
    //   .then((response) => {
    //     this.setState({ listCategory: response.data });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     if (error.response && error.response.status === 401) {
    //       EventBus.dispatch("logout");
    //     }
    //   });

    UserService.getDetailUser(id)
    .then((response) => {
      this.setState({dataDetail: response.data, userReady: true});

      // this.setState({ objCate: objCate[0] })
      // console.log(this.state.objCate);
    })
    .catch((error) => {
      console.log(error);
      // if (error.response && error.response.status === 401) {
      //   EventBus.dispatch("logout");
      // }
    });
  }

  onReset = () => {
    this.formRef.current.resetFields();
  };

  onFinish = (values) => {
    // console.log(this.state.objCate)

    // const objCate = this.state.listCategory.filter((item) => {
    //   return item.categoryName === this.state.dataDetail?.categoryName;
    // });
    // console.log(objCate);
    const {id} = this.props.match.params;
    const param = {
      // categoryId: values.categoryId || objCate[0]?.category_id,
      // productName: values.productName || this.state.dataDetail?.productName,
      // price: values.price || this.state.dataDetail?.price,
      // quantity: values.quantity || this.state.dataDetail?.quantity,
      // description: values.description || this.state.dataDetail?.description,
      active: values.active || this.state.dataDetail?.active,
      address: values.address || this.state.dataDetail?.address,
      birthDate: values.birthDate || this.state.dataDetail?.birthDate,
      email: values.email || this.state.dataDetail?.email,
      firstName: values.firstName || this.state.dataDetail?.firstName,
      gender: values.gender || this.state.dataDetail?.gender || 1,
      id: id,
      lastName: values.lastName || this.state.dataDetail?.lastName,
    };

    UserService.editUser(id, param)
    .then(() => {
      this.props.history.push(`/list_user_admin`);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  render() {
    const {dataDetail} = this.state;
    // console.log(dataDetail)
    // const listCate = this.state.listCategory;
    const buttonItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 4,
      },
    };
    // const { TextArea } = Input;
    const initialValues = {
      // categoryId: dataDetail?.categoryName,
      // productName: dataDetail?.productName,
      // price: dataDetail?.price,
      // quantity: dataDetail?.quantity,
      // description: dataDetail?.description,

      address: dataDetail?.address,
      birthDate: dataDetail?.birthDate,
      email: dataDetail?.email,
      firstName: dataDetail?.firstName,
      gender: dataDetail?.gender,
      lastName: dataDetail?.lastName,
      active: dataDetail?.active,
    };

    return (
        <div className="container">
          <div className="title">
            <h2>Edit User</h2>
          </div>
          <Form
              ref={this.formRef}
              labelCol={{span: 4}}
              wrapperCol={{span: 14}}
              layout="horizontal"
              onFinish={this.onFinish}
              initialValues={initialValues}
              // onValuesChange={onFormLayoutChange}
          >
            {/* <Form.Item label="Category" name="categoryId">
            <Select placeholder={dataDetail?.categoryName}>
              {listCate.map((item, index) => (
                <Select.Option key={index} value={item.category_id}>
                  {item.categoryName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item> */}
            <Form.Item label="Active" name="active">
              <Radio.Group>
                <Radio value={0}>Deactive</Radio>
                <Radio value={1}>Active</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input placeholder={dataDetail?.email}/>
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input placeholder={dataDetail?.address}/>
            </Form.Item>
            <Form.Item label="Birthday" name="birthDate">
              <DatePicker placeholder={dataDetail?.birthDate} picker="week"/>
            </Form.Item>
            <Form.Item label="First Name" name="firstName">
              <Input placeholder={dataDetail?.firstName}/>
            </Form.Item>
            <Form.Item label="Last Name" name="lastName">
              <Input placeholder={dataDetail?.lastName}/>
            </Form.Item>
            <Form.Item label="Gender" name="gender">
              <Radio.Group initialValues={dataDetail?.gender}>
                <Radio value={0}>Male</Radio>
                <Radio value={1}>Female</Radio>
              </Radio.Group>
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

const EditUser = withRouter(EditUserAdmin);

export default EditUser;
