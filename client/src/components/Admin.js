import React, { Component } from "react";
import { connect } from "react-redux";
import { global_var } from "./../global";
class Admin extends Component {
  students(studentsList) {
    return studentsList.map((value, key) => {
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
  table() {
    return this.props.loggedInStudentsData.map((value, key) => {
      return (
        <div key={key}>
          {" "}
          <h4>{value.clockInData.name}</h4>
          <table>
            <tbody>
              <tr>
                <th>leerlingnummer</th>
                <th>Naam</th>
                <th>Uren die gemaakt zouden moeten worden</th>
                <th>gemaakte uren</th>
                <th>weekelijkse uren</th>
              </tr>
              {this.students(value.studentsData)}
            </tbody>
          </table>
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <p>
          Hallo {this.props.adminData.last_name} dit zijn de leerlingen die om
          dit moment zijn ingelogd
        </p>
        {this.table()}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  adminData: state.admin.adminData,
  loggedInStudentsData: state.admin.loggedInStudentsData
});

export default connect(mapStateToProps, null)(Admin);
