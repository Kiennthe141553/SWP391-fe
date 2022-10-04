import React, { Component } from "react";
import { Carousel } from "antd";
import banner1 from "../imgs/banner1.jpg";
import banner2 from "../imgs/banner2.png";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export default class HomeUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  render() {
    return (
      // <div className="container">
      <div className="home">
        Home User
        <Carousel autoplay>
          <div className="contain-slider">
            <img className="img-banner" src={banner2} alt="banner2" />
          </div>
          <div className="contain-slider">
            <img className="img-banner" src={banner1} alt="banner1" />
          </div>
        </Carousel>
      </div>
      // </div>
    );
  }
}
