import React, { Component } from "react";
import { connect } from "react-redux";
import { changeRole } from "../actions";
import ClockInLogin from "./ClockInLogin";
import LogIn from "./LogIn";
import Student from "./Student";
class App extends Component {
  componentDidMount() {}
  render() {
    switch (this.props.user.role) {
      case "login":
        return <LogIn />;
      case "ClockIn":
        return <ClockInLogin />;
      case "Student":
        return <Student />;
      default:
        return <p>login please</p>;
    }
  }
}
const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  roleChange: role => dispatch(changeRole(role))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
