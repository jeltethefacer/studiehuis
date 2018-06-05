import React, { Component } from "react";
import { connect } from "react-redux";
import { global_var } from "./../global";
class Mentor extends Component {
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
  render() {
    return (
      <div>
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

export default connect(mapStateToProps, null)(Mentor);
