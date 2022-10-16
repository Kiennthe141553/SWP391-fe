import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Row, Col } from "antd";
import AuthService from "./services/auth.service";

import Chart from "./components/Home/chart.component";
import ChangePassword from "./components/Auth/change-password.component";
import Login from "./components/Auth/login.component";
import Register from "./components/Auth/register.component";
import Home from "./components/Home/home.component";
import HomeUser from "./components/Home/home-user.component";

import ListBlogManagement from "./components/Blog/list-blog-management.component";
import ListBlogUser from "./components/Blog/list-blog.component";
import AddBlog from "./components/Blog/create-blog.component";
import EditBlog from "./components/Blog/edit-blog.component";
import DetailManageBlog from "./components/Blog/detail-blog-management.component";
import DetailBlog from "./components/Blog/detail-blog.component";

import ListUserAdmin from "./components/ManageUser/list-user-admin.component";
import Detail from "./components/ManageUser/detail-user-admin.component";
import EditUser from "./components/ManageUser/edit-user-admin.component";

import EventBus from "./common/EventBus";

import "./styles/tailwind.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.selectLink = this.selectLink.bind(this);
    this.resetModuleSelected = this.resetModuleSelected.bind(this);

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
      moduleSelected: "",
    });
  }

  componentDidUpdate() {}

  selectLink(e) {
    this.setState({
      moduleSelected: e.target.id,
    });
  }

  resetModuleSelected(e) {
    this.setState({
      moduleSelected: "",
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
        name: "Manage User",
        isActive: moduleSelected === "Manage User",
      },
    ];

    const listSystemAdminContentMenu = [
      {
        link: "/list_blog_management",
        name: "Manage Blog",
        isActive: moduleSelected === "Manage Blog",
      },
    ];

    const listSystemCustomerMenu = [
      {
        link: "/list_blog",
        name: "Blog",
        isActive: moduleSelected === "Blog",
      },
      {
        link: "/change-password",
        name: "Change Password",
        isActive: moduleSelected === "Change Password",
      },
    ];

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-black header shadow-sm">
          <Link
            to={"/"}
            className="navbar-brand"
            onClick={this.resetModuleSelected}
          >
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
            <div className="navbar-nav ml-auto flex items-center">
              <li className="nav-item">
                <Link
                  to={"/blog"}
                  className="p-2 text-gray-200 rounded-lg bg-blue-600 hover:text-gray-200 hover:bg-blue-800 "
                >
                  Blog
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to={"/login"}
                  className="p-2 text-gray-200 rounded-lg bg-blue-600 hover:text-gray-200 hover:bg-blue-800 "
                >
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to={"/register"}
                  className="p-2 text-gray-200 border border-gray-800 rounded-lg hover:text-gray-400 "
                >
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
                      {role === "MARKETING" && (
                        <>
                          {listSystemAdminContentMenu.map((item) => {
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
                        className="p-3 text-white bg-red-500 w-full"
                        onClick={this.logOut}
                      >
                        Logout
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

                <Route path="/list_user_admin" component={ListUserAdmin} />
                <Route path="/user_admin_details/:id" component={Detail} />
                <Route path="/edit_user_admin/:id" component={EditUser} />

                <Route
                  path="/list_blog_management"
                  component={ListBlogManagement}
                />
                <Route
                  exact
                  path={["/blog", "/list_blog"]}
                  component={ListBlogUser}
                />
                <Route path="/add_blog" component={AddBlog} />
                <Route path="/edit_blog/:id" component={EditBlog} />
                <Route path="/blog_details/:id" component={DetailBlog} />
                <Route
                  path="/blog_management_details/:id"
                  component={DetailManageBlog}
                />

                <Route path="/change-password" component={ChangePassword} />
                <Route path="/chart" component={Chart} />
              </Switch>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
