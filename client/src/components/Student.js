import React, { Component } from "react";
import { connect } from "react-redux";
import "./../css/Student.css";
class Student extends Component {
  formatTime(time) {
    return time.substring(0, 10) + " " + time.substring(11, 19);
  }
  sessions() {
    return this.props.clockInData.map((value, key) => {
      return (
        <tr key={key}>
          <td>{value.clock_in_id}</td>
          <td>{this.formatTime(value.logged_in_time)}</td>
          <td>{this.formatTime(value.logged_out_time)}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        je moet {this.props.studentData.weekly_hours} uren per week maken<br />
        je hebt {this.props.studentData.made_minutes} minuten in het totaal
        gemaakt van de {this.props.studentData.should_hours} uren die je moet
        maken. (45 minuten is een uur)
        <table>
          <tbody>
            <tr>
              <th>clock_in_id</th>
              <th>ingelogd</th>
              <th>uitgelogd</th>
            </tr>
            {this.sessions()}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  studentData: state.student.studentData,
  clockInData: state.student.clockInData
});

export default connect(mapStateToProps, null)(Student);