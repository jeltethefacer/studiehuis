import React, { Component } from "react";
import { connect } from "react-redux";
import { requestMentorData, logoutUser, checkCookieRole } from "./../actions";
import { global_var } from "./../global";
import { Redirect } from "react-router-dom";
class Mentor extends Component {
  componentDidMount() {
    this.props.requestMentorData();
    this.props.checkCookieRole();
  }

  students() {
    return this.props.studentsData.map((value, key) => {
      var made_hours = Math.floor(
        value.made_minutes / global_var.minutes_an_hour
      );
      var made_minutes = value.made_minutes % global_var.minutes_an_hour;

      return (
        <tr key={key}>
          <td>{value.student_number}</td>
          <td>
            {value.front_name} {value.last_name}
          </td>
          <td>{value.should_hours}</td>
          <td>
            {made_hours} uren en {made_minutes} minuten
          </td>
          <td>{value.weekly_hours}</td>
        </tr>
      );
    });
  }

  logoutButton() {
    this.props.logoutUser();
  }

  render() {
    if (
      (this.props.user.checkRoleStatus === 2 &&
        this.props.user.role !== "Mentor") ||
      (this.props.user.checkRoleStatus === 1 &&
        this.props.user.role !== "Mentor")
    ) {
      return <Redirect push to="/" />;
    } else if (this.props.user.checkRoleStatus === 0) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <button onClick={() => this.logoutButton()}>Log Uit</button>
        Hallo {this.props.mentorData.front_name}{" "}
        {this.props.mentorData.last_name} dit zijn de gegevens van u
        mentorleerlingen.<br />
        een uur wat gemaakt moet worden is {global_var.minutes_an_hour} minuten.
        <table>
          <tbody>
            <tr>
              <th>leerlingnummer</th>
              <th>Naam</th>
              <th>Uren die gemaakt zouden moeten worden</th>
              <th>gemaakte uren</th>
              <th>weekelijkse uren</th>
            </tr>
            {this.students()}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  mentorData: state.mentor.mentorData,
  studentsData: state.mentor.studentsData
});

const mapDispatchToProps = dispatch => ({
  requestMentorData: () => dispatch(requestMentorData()),
  logoutUser: () => dispatch(logoutUser()),
  checkCookieRole: () => dispatch(checkCookieRole())
});

export default connect(mapStateToProps, mapDispatchToProps)(Mentor);
