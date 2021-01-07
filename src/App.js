import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import StartPage from "./pages/startPage";
import Nav from "./pages/navbar";
import UserPage from "./pages/reglogPage";
import Footer from "./pages/footer";
import error from "./pages/pagenotfound";
import ProfilePage from "./pages/profilePage"

let Header;

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loogedInStatus: "NOT_LOGGED_IN",
      user: {},
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(data) {
    this.handleHeader();
    this.checkLoginStatu()
    // this.setState({
    //   loogedInStatus: "LOGGED_IN",
    //   user: data,
    // });
  }

  handleLogout() {
    localStorage.clear();
    this.handleHeader();
    this.checkLoginStatu()
    // this.setState({
    //   loogedInStatus: "NOT_LOGGED_IN",
    //   user: {},
    // });
  }
  handleHeader() {
    if (!localStorage.getItem("token")) {
      axios.interceptors.request.eject(Header);
    } else {
      Header = axios.interceptors.request.use(
        (config) => {
          config.headers.authtoken = localStorage.getItem("token");
          return config;
        },
        (err) => {
          return Promise.reject(err);
        }
      );
    }
  }
  checkLoginStatu() {
    console.log(localStorage.getItem("token"));
    axios
      .get("https://backend-app-jk.herokuapp.com/api/user/logged_in", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        if (
          response.data.loggedIn &&
          this.state.loogedInStatus == "NOT_LOGGED_IN"
        ) {
          this.setState({
            loogedInStatus: "LOGGED_IN",
            user: response.data.user,
          });
        } else if (
          !response.data.loggedIn &&
          this.state.loogedInStatus == "LOGGED_IN"
        ) {
          this.setState({
            loogedInStatus: "NOT_LOGGED_IN",
            user: {},
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.handleHeader();
    this.checkLoginStatu();
  }

  render() {
    return (
      <Router>
        <div className="container-main">
          <Nav
            userName={this.state.user}
            loggedIn={this.state.loogedInStatus}
            handleLogout={this.handleLogout}
          />
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <StartPage
                  {...props}
                  handleLogin={this.handleLogin}
                  loogedInStatus={this.state.loogedInStatus}
                  user={this.state.user}
                />
              )}
            />
            <Route
              path="/userpage"
              exact
              render={(props) => (
                <UserPage
                  {...props}
                  handleLogin={this.handleLogin}
                  loogedInStatus={this.state.loogedInStatus}
                  handleLogout={this.handleLogout}
                />
              )}
            />
              <Route
              path="/profile"
              exact
              render={(props) => (
                <ProfilePage
                  {...props}
                  loogedInStatus={this.state.loogedInStatus}
                  user={this.state.user}
                />
              )}
            />
            <Route path="/" component={error} />
            
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
