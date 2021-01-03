import React from "react";
import axios from "axios";

//totototototototototo
class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      pass: "",
      loading: false,
      message: " ",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    this.sendReg();
    event.preventDefault();
  }

  sendReg() {
    //https://backend-app-jk.herokuapp.com/api/user/register
    this.setState(
      {
        loading: true,
        message: " ",
      },
      () => {
        axios
          .post(
            "http://localhost:5001/api/user/register",
            {
              email: this.state.email,
              password: this.state.pass,
              name: this.state.name,
            },
            { withCredentials: true }
          )
          .then((response) => {
            if (response.data.message === "registered") {
              localStorage.setItem("token", response.data.token);
              this.props.successfulAuth(response.data.user);
            } else {
              this.setState({ loading: false, message: response.data.message });
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
        <form autoComplete="off">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />

          <input
            type="email"
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
            Register
          </button>
        </form>
        {this.state.loading ? <h6>Loading</h6> : <h6></h6>}
        <h6>{this.state.message}</h6>
      </div>
    );
  }
}

export default Registration;
