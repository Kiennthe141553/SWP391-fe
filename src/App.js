import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import ListUser from "./components/list-user.component";
// import BoardUser from "./components/board-user.component";
// import BoardModerator from "./components/board-moderator.component";
// import BoardAdmin from "./components/board-admin.component";
import ListProduct from "./components/list-product.component";
import AddUser from "./components/add-user.component";
import AddProduct from "./components/add-product.component";
import Detail from "./components/detail-product.component";
import EditPro from "./components/edit-product.component";
import Chart from "./components/chart.component";
import UploadFile from "./components/upload-file.component";
import ChangePassword from "./components/change-password.component";
import ListCategory from "./components/list-category.component";
// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      // showModeratorBoard: false,
      // showAdminBoard: false,
      currentUser: undefined,
      firstLogin: true,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    const firstLogin = AuthService.getFirstLogin();
    console.log(user);

    if (user) {
      this.setState({
        currentUser: user,
        firstLogin: firstLogin,
        // showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        // showAdminBoard: user.roles.includes("ROLE_ADMIN"),
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
      // showModeratorBoard: false,
      // showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Product Management
          </Link>
          <div className="navbar-nav mr-auto">
            {/* <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li> */}

            {/* {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )} */}

            {/* {currentUser && (
            )} */}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/chart"} className="nav-link">
                  Chart
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/upload-file"} className="nav-link">
                  Upload File
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/change-password"} className="nav-link">
                  Change Password
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/list_products"} className="nav-link">
                  List Product
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/list_category"} className="nav-link">
                  List Category
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add_product"} className="nav-link">
                  Add Product
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add_user"} className="nav-link">
                  Add User
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
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

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/user" component={ListUser} />
            <Route path="/add_product" component={AddProduct} />
            <Route path="/add_user" component={AddUser} />
            <Route path="/list_products" component={ListProduct} />
            <Route path="/products_details/:id" component={Detail} />
            <Route path="/edit_product/:id" component={EditPro} />
            <Route path="/change-password" component={ChangePassword} />
            <Route path="/chart" component={Chart} />
            <Route path="/upload-file" component={UploadFile} />
            <Route path="/list_category" component={ListCategory} />
            {/* <Route path="/user" component={BoardUser} /> */}
            {/* <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} /> */}
          </Switch>
        </div>

        {/*<AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
