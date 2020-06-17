import React from "react";
import Axios from "axios";

const API_URL = `http://localhost:8080`;

class Auth extends React.Component {
  state = {
    username: "",
    password: "",
  };

  inputHandler = (event, key) => {
    const { value } = event.target;

    this.setState({
      [key]: value,
    });
  };

  registerHandler = () => {
    console.log("Register!");
    Axios.post(`${API_URL}/users`, {
      username: this.state.username,
      password: this.state.password,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  loginHandler = () => {
    alert("Login!");
    Axios.get(`${API_URL}/users/login`, {
      params: {
        username: this.state.username,
        password: this.state.password,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>Auth Screen</h1>

        <h5>Username</h5>
        <input type="text" onChange={(e) => this.inputHandler(e, "username")} />
        <h5>Password</h5>
        <input type="text" onChange={(e) => this.inputHandler(e, "password")} />

        <br />

        <input type="button" value="Login" onClick={this.loginHandler} />
        <input type="button" value="Register" onClick={this.registerHandler} />
      </div>
    );
  }
}

export default Auth;
