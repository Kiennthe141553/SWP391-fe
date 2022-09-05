import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {  getDateTime } from '../helper/datetime'


class DetailProduct extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      };

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      userReady: false
    };
  }

  componentDidMount() {
    const {id} = this.props.match.params
    UserService.getDetailProduct(id)
      .then((response) => {
        this.setState({ data: response.data, userReady: true })
        console.log(this.state.data)
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });
  }

  render() {
    const {data,userReady} = this.state;

    return (
      <div className="container">
        <div className="title">
          <h2>Detail Product {data?.id}</h2>
        </div>
        {userReady ? (
          <div>
            <p>
              <strong>Product Name:</strong> {data?.productName}
            </p>
            <p>
              <strong>Create Date:</strong> {getDateTime(
                data?.createdAt,
                'DD/MM/YYYY'
                )}
            </p>
            <p>
              <strong>Category:</strong> {data?.categoryName}
            </p>
            <p>
              <strong>Price:</strong> {data?.price} $
            </p>
            <p>
              <strong>Quantity:</strong> {data?.quantity}
            </p>
            <p>
              <strong>Description:</strong> {data?.description}
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}



const Detail = withRouter(DetailProduct)

 export default Detail