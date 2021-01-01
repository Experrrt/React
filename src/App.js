import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import StartPage from "./pages/startpage";
import Nav from "./pages/navbar";
import UserPage from "./pages/userepage";
import Footer from "./pages/footer";
import error from "./pages/pagenotfound";

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
    this.setState({
      loogedInStatus: "LOGGED_IN",
      user: data,
    });
  }

  handleLogout() {
    // this.handleLogoutClick();
    this.setState({
      loogedInStatus: "NOT_LOGGED_IN",
      user: {},
    });
  }

  checkLoginStatu() {
    axios
      .get("http://localhost:5001/api/user/logged_in", {
        withCredentials: true,
      })
      .then((response) => {
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
    this.checkLoginStatu();
  }

  render() {
    return (
      <Router>
        <div className="container-main">
          <Nav
            userName={this.state.user}
            loggedIn={this.state.loogedInStatus}
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

            <Route path="/" component={error} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
