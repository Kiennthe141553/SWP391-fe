import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Row, Col } from "antd";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import HomeUser from "./components/home-user.component";
import ListUser from "./components/list-user.component";

import ListUserAdmin from "./components/list-user-admin.component";
// import AddUser from "./components/add-user.component";
// import AddUserAdmin from "./components/add-user-admin.component";
import Detail from "./components/detail-user-admin.component";
import EditUser from "./components/edit-user-admin.component";
import Chart from "./components/chart.component";
import UploadFile from "./components/upload-file.component";
import ChangePassword from "./components/change-password.component";
import ListCategory from "./components/list-category.component";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.selectLink = this.selectLink.bind(this);

    this.state = {
      currentUser: undefined,
      role: undefined,
      moduleSelected: "Chart",
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    const role = AuthService.getRole();

    if (user) {
      this.setState({
        currentUser: user,
        role: role,
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
      role: undefined,
    });
  }

  componentDidUpdate() {}

  selectLink(e) {
    console.log(e.target.id);
    this.setState({
      moduleSelected: e.target.id,
    });
  }

  render() {
    const { currentUser, role, moduleSelected } = this.state;

    const listSystemAdminMenu = [
      {
        link: "/chart",
        name: "Chart",
        isActive: moduleSelected === "Chart",
      },

      {
        link: "/list_user_admin",
        name: "List User Admin",
        isActive: moduleSelected === "List User Admin",
      },
    ];

    const listSystemCustomerMenu = [
      {
        link: "/change-password",
        name: "Change Password",
        isActive: moduleSelected === "Change Password",
      },
    ];

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark header">
          <Link to={"/"} className="navbar-brand">
            English Practice Quizzz
          </Link>
          <div className="navbar-nav mr-auto"></div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <div className="box-avatar">
                  <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="avatar"
                  />
                </div>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="main-page">
          <Row className="row-main-page" gutter={24}>
            <Col className="col-menu" span={currentUser ? 6 : 0}>
              <div className="menu">
                {currentUser && (
                  <div className="navbar-nav ml-auto contain-menu">
                    <div className="menu-content">
                      {role === "MARKETING"}
                      {role === "ADMIN" && (
                        <>
                          {listSystemAdminMenu.map((item) => {
                            return (
                              <li
                                className={
                                  item.isActive ? "nav-item-active" : "nav-item"
                                }
                              >
                                <Link
                                  to={item.link}
                                  className="nav-link"
                                  onClick={this.selectLink}
                                  id={item.name}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            );
                          })}
                        </>
                      )}
                      {role === "CUSTOMER" && (
                        <>
                          {listSystemCustomerMenu.map((item) => {
                            return (
                              <li
                                className={
                                  item.isActive ? "nav-item-active" : "nav-item"
                                }
                              >
                                <Link
                                  to={item.link}
                                  className="nav-link"
                                  onClick={this.selectLink}
                                  id={item.name}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            );
                          })}
                        </>
                      )}
                    </div>

                    <li className="nav-item">
                      <a
                        href="/login"
                        className="nav-link"
                        onClick={this.logOut}
                      >
                        LogOut
                      </a>
                    </li>
                  </div>
                )}
              </div>
            </Col>
            <Col span={currentUser ? 18 : 24} className="col-content">
              <Switch>
                <Route
                  exact
                  path={["/", "/home"]}
                  component={
                    !currentUser ? Home : role === "CUSTOMER" ? HomeUser : Chart
                  }
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />

                <Route path="/user" component={ListUser} />
                {/* <Route path="/add_user_admin" component={AddUserAdmin} />
                <Route path="/add_user" component={AddUser} /> */}
                <Route path="/list_user_admin" component={ListUserAdmin} />
                <Route path="/user_admin_details/:id" component={Detail} />
                <Route path="/edit_user_admin/:id" component={EditUser} />

                <Route path="/user" component={ListUser} />
                <Route path="/list_user_admin" component={ListUserAdmin} />
                <Route path="/user_admin_details/:id" component={Detail} />
                <Route path="/edit_user_admin/:id" component={EditUser} />

                <Route path="/change-password" component={ChangePassword} />
                <Route path="/chart" component={Chart} />
                <Route path="/upload-file" component={UploadFile} />
                <Route path="/list_category" component={ListCategory} />
              </Switch>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
