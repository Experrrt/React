import React from "react";
import axios from "axios";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      pass: "",
      loading: false,
      message: " ",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log("Handle change", event);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    this.sendReg();
    event.preventDefault();
  }

  sendReg() {
    //https://backend-app-jk.herokuapp.com/api/user/login
    this.setState(
      {
        loading: true,
        message: " ",
      },
      () => {
        axios
          .post(
            "http://localhost:5001/api/user/login",
            {
              email: this.state.email,
              password: this.state.pass,
            },
            { withCredentials: true }
          )
          .then((response) => {
            if (response.data.message === "loggedin") {
              localStorage.setItem("token", response.data.token);
              this.props.successfulAuth(response.data.user);
            } else {
              this.setState({ loading: false, message: response.data.message });
              console.log(response);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleChange}
          required
        />

        <input
          type="password"
          name="pass"
          placeholder="Password"
          value={this.state.pass}
          onChange={this.handleChange}
          required
        />

        <button
          type="submit"
          onClick={this.state.loading ? undefined : this.handleSubmit}
        >
          Login
        </button>
        {this.state.loading ? <h6>Loading</h6> : <h6></h6>}
        <h6>{this.state.message}</h6>
      </div>
    );
  }
}

export default LoginPage;
