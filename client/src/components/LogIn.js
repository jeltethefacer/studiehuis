import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loginClockIn,
  loginStudent,
  loginMentor,
  loginAdmin
} from "../actions";
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rolesValue: "Student",
      usernameValue: "",
      passwordValue: ""
    };
    this.handleChangeRoleSelect = this.handleChangeRoleSelect.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeRoleSelect(event) {
    this.setState({ rolesValue: event.target.value });
  }
  handleChangeUsername(event) {
    this.setState({ usernameValue: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ passwordValue: event.target.value });
  }

  handleSubmit(event) {
    switch (this.state.rolesValue) {
      case "ClockIn":
        this.props.loginClockIn(
          this.state.usernameValue,
          this.state.passwordValue
        );
        break;
      case "Student":
        this.props.loginStudent(
          this.state.usernameValue,
          this.state.passwordValue
        );
        break;
      case "Mentor":
        this.props.loginMentor(
          this.state.usernameValue,
          this.state.passwordValue
        );
        break;
      case "Admin":
        this.props.loginAdmin(
          this.state.usernameValue,
          this.state.passwordValue
        );
        break;
      default:
        console.log("default case");
    }
    event.preventDefault();
  }
  componentDidMount() {}
  render() {
    var warning;
    if (this.props.user.loginStatus === 2) {
      warning = (
        <p>gebruikesnaam/leerlingnummer en/of wachtwoord is incorrect</p>
      );
    }
    return (
      <div>
        {warning}
        <form onSubmit={this.handleSubmit}>
          <select name="roles" onChange={this.handleChangeRoleSelect}>
            <option value="Student">Leerling</option>
            <option value="ClockIn">inlog systeem</option>
            <option value="Mentor">Mentor</option>
            <option value="Admin">administrator</option>
          </select>
          <br />
          gebruikesnaam/leerlingnummer<br />
          <input
            type="text"
            name="username"
            onChange={this.handleChangeUsername}
          />
          <br />
          wachtwoord :<br />
          <input
            type="password"
            name="password"
            onChange={this.handleChangePassword}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  loginClockIn: (username, password) =>
    dispatch(loginClockIn(username, password)),
  loginStudent: (username, password) =>
    dispatch(loginStudent(username, password)),
  loginMentor: (username, password) =>
    dispatch(loginMentor(username, password)),
  loginAdmin: (username, password) => dispatch(loginAdmin(username, password))
});
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
