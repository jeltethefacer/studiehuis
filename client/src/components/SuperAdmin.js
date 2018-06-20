import React, { Component } from "react";
import { connect } from "react-redux";
import { global_var } from "./../global";
import {
  changeSuperAdminPage,
  requestSuperAdminData,
  logoutUser,
  requestSingleStudentData,
  checkCookieRole
} from "./../actions";
import AddStudentForm from "./AddStudentForm";
import EditSingleStudent from "./EditSingleStudent";
import { Route, Switch, Redirect, Link } from "react-router-dom";
class SuperAdmin extends Component {
  constructor(props) {
    super();
    this.state = {
      editStudent: false,
      studentToEdit: 0
    };
    this.studentAddButton = this.studentAddButton.bind(this);
  }

  componentDidMount() {
    this.props.requestSuperAdminData();
    this.props.checkCookieRole();
  }

  students(studentsList) {
    return studentsList.map((value, key) => {
      var made_hours = Math.floor(
        value.made_minutes / global_var.minutes_an_hour
      );
      var made_minutes = value.made_minutes % global_var.minutes_an_hour;
      return (
        <tr
          key={key}
          onClick={() => this.onClickStudentRow(value.student_number)}
        >
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

  studentAddButton() {
    this.props.changeSuperAdminPage("addStudent");
    console.log(this.props.page);
  }

  redirectHandler(page) {
    this.props.changeSuperAdminPage(page);
  }

  addStudentForms(rows) {
    var returnArray = [];
    for (var x = 0; x < rows; x++) {
      returnArray.push(<AddStudentForm />);
    }
    return returnArray;
  }

  onClickStudentRow(studentNumber) {
    this.setState({
      editStudent: true,
      studentToEdit: studentNumber
    });
  }

  render() {
    if (
      (this.props.user.checkRoleStatus === 2 &&
        this.props.user.role !== "SuperAdmin") ||
      (this.props.user.checkRoleStatus === 1 &&
        this.props.user.role !== "SuperAdmin")
    ) {
      return <Redirect push to="/" />;
    } else if (this.props.user.checkRoleStatus === 0) {
      return <div>Loading</div>;
    }
    //check if the user wants to edit someone if true then redirects him to edit changeSuperAdminPage
    if (this.state.editStudent) {
      console.log("redirecting to edit");
      return (
        <Redirect
          push
          to={"/superadmin/editStudent/" + this.state.studentToEdit}
        />
      );
    }

    //sorts array from small to great
    var sortedStudentsData = this.props.studentsData.sort((a, b) => {
      var nettoA = a.made_minutes - a.should_hours * global_var.minutes_an_hour;
      var nettoB = b.made_minutes - b.should_hours * global_var.minutes_an_hour;
      if (nettoA > nettoB) {
        return 1;
      } else {
        return -1;
      }
    });
    return (
      <div>
        <p>
          Hallo {this.props.superAdminData.last_name} dit zijn de leerlingen die
          om dit moment zijn ingelogd
        </p>
        <Link to={"/SuperAdmin/"}>
          <button>voeg leerlingen toe</button>
        </Link>
        <table>
          <tbody>
            <tr>
              <th>leerlingnummer</th>
              <th>Naam</th>
              <th>Uren die gemaakt zouden moeten worden</th>
              <th>gemaakte uren</th>
              <th>weekelijkse uren</th>
            </tr>
            {this.students(sortedStudentsData)}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  superAdminData: state.superAdmin.superAdminData,
  studentsData: state.superAdmin.studentsData,
  page: state.superAdmin.page
});

const mapDispatchToProps = dispatch => ({
  changeSuperAdminPage: page => dispatch(changeSuperAdminPage(page)),
  requestSuperAdminData: () => dispatch(requestSuperAdminData()),
  logoutUser: () => dispatch(logoutUser()),
  requestSingleStudentData: studentNumber =>
    dispatch(requestSingleStudentData(studentNumber)),
  checkCookieRole: () => dispatch(checkCookieRole())
});

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdmin);
