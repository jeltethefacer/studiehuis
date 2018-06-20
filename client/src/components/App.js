import React, { Component } from "react";
import { connect } from "react-redux";
import { checkCookieRole } from "../actions";
import ClockInLogin from "./ClockInLogin";
import LogIn from "./LogIn";
import Student from "./Student";
import Mentor from "./Mentor";
import Admin from "./Admin";
import SuperAdmin from "./SuperAdmin";
class App extends Component {
  componentDidMount() {
    this.props.checkCookieRole();
  }
  render() {}
}
const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  checkCookieRole: () => dispatch(checkCookieRole())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
