import React, { Component } from "react";
import { Table } from 'antd';
import { Link } from 'react-router-dom'
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";
import { Redirect } from "react-router-dom";
// import {  getDateTime } from '../helper/datetime'
import './style.css'

export default class ListCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      listCategory: []
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });

      UserService.getListCategory().then((response) => {
        this.setState({ listCategory: response.data, userReady: true })
        console.log(this.state.listCategory)
      }).catch((error) => {
        console.log(error)
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      })
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const data = this.state.listCategory
    const columns = [
      {
        title: 'Category ID',
        dataIndex: 'category_id',
        key: 'category_id',
      },
      {
        title: 'Category Name',
        dataIndex: 'categoryName',
        key: 'categoryName',
        render: (text, record) => {
          return(
          <Link to={`/products_details/${record.id}`} className="-text-link">
            {text}
          </Link>)
        },
      },
      {
        title: 'Create At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text) => {
          // const value = getDateTime(
          //   text,
          //   'DD/MM/YYYY HH:mm:ss'
          // )
          return <p>{text}</p>
        }
      },

      {
        title: 'Update At',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (text) => {
          // const value = getDateTime(
          //   text,
          //   'DD/MM/YYYY HH:mm:ss'
          // )
          return <p>{text}</p>
        }
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Created By',
        dataIndex: 'createdBy',
        key: 'createdBy',
        render: (text) => <p>{text}</p>,
      },
      {
        title: 'Update By',
        dataIndex: 'updatedBy',
        key: 'updatedBy',
      },
    ];
    return (
      <div className="container">
        <div className="title">
          <h2>List Category</h2>
        </div>
        {this.state.userReady?(<Table columns={columns} dataSource={data} />):null}
      </div>
    );
  }
}
