import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {
  loginClockIn,
  loginStudent,
  loginMentor,
  loginAdmin,
  loginSuperAdmin,
  checkCookieRole
} from "../actions";
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rolesValue: "SuperAdmin",
      usernameValue: "",
      passwordValue: ""
    };
    this.handleChangeRoleSelect = this.handleChangeRoleSelect.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.checkCookieRole();
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
      case "SuperAdmin":
        this.props.loginSuperAdmin(
          this.state.usernameValue,
          this.state.passwordValue
        );
        console.log("Super Admin");
        break;
      default:
        console.log("default case");
    }
    event.preventDefault();
  }

  checkedHelper(inputName) {
    if (inputName === this.state.rolesValue) {
      return true;
    } else {
      return false;
    }
  }

  userRedirect() {
    switch (this.props.user.role) {
      case "ClockIn":
        return <Redirect to="/ClockIn" />;
      case "Student":
        return <Redirect push to="/Student" />;
      case "Mentor":
        return <Redirect push to="/Mentor" />;
      case "Admin":
        return <Redirect push to="/Admin" />;
      case "SuperAdmin":
        return <Redirect push to="/SuperAdmin" />;
      default:
        return <p>login please</p>;
    }
  }

  render() {
    var warning;
    if (this.props.user.loginStatus === 2) {
      warning = (
        <p>gebruikesnaam/leerlingnummer en/of wachtwoord is incorrect</p>
      );
    }

    switch (this.props.user.role) {
      case "ClockIn":
        return <Redirect to="/ClockIn" />;
      case "Student":
        return <Redirect to="/Student/" />;
      case "Mentor":
        return <Redirect push to="/Mentor/" />;
      case "Admin":
        return <Redirect push to="/Admin/" />;
      case "SuperAdmin":
        return <Redirect push to="/SuperAdmin/" />;
      default:
        return (
          <div>
            {warning}
            <form onSubmit={this.handleSubmit}>
              <input
                type="radio"
                value="Student"
                name="role"
                onChange={this.handleChangeRoleSelect}
                checked={this.checkedHelper("Student")}
              />{" "}
              Leerling<br />
              <input
                type="radio"
                value="ClockIn"
                name="role"
                onChange={this.handleChangeRoleSelect}
                checked={this.checkedHelper("ClockIn")}
              />Inlog Systeem<br />
              <input
                type="radio"
                value="Mentor"
                name="role"
                onChange={this.handleChangeRoleSelect}
                checked={this.checkedHelper("Mentor")}
              />Mentor<br />
              <input
                type="radio"
                value="Admin"
                name="role"
                onChange={this.handleChangeRoleSelect}
                checked={this.checkedHelper("Admin")}
              />Administrator<br />
              <input
                type="radio"
                value="SuperAdmin"
                name="role"
                onChange={this.handleChangeRoleSelect}
                checked={this.checkedHelper("SuperAdmin")}
              />School Leiding<br />
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
  loginAdmin: (username, password) => dispatch(loginAdmin(username, password)),
  loginSuperAdmin: (username, password) =>
    dispatch(loginSuperAdmin(username, password)),
  checkCookieRole: () => dispatch(checkCookieRole())
});
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
