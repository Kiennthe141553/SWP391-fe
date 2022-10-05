import React, { Component } from "react";
import { Carousel } from "antd";
import banner1 from "../imgs/banner1.jpg";
import banner2 from "../imgs/banner2.png";



export default class Home extends Component {
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
