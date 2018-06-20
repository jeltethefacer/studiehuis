import React, { Component } from "react";
import { connect } from "react-redux";
import "./../css/Button.css";
import {
  editStudentData,
  requestSingleStudentData,
  checkCookieRole,
  resetEditStudent
} from "./../actions";
import { Redirect, Link } from "react-router-dom";

class EditSingleStudent extends Component {
  constructor(props) {
    super(props);

    this.state = { errorMessages: [] };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.checkCookieRole();
    this.props.requestSingleStudentData(
      this.props.match.params.urlStudentNumber
    );
  }

  componentDidUpdate() {
    var student = this.props.singleStudentData;
    if (this.props.editStudentDataStatus === 1) {
      this.props.resetEditStudent();
    }
    if (!this.state.frontName && student.front_name) {
      this.setState({
        frontName: student.front_name,
        lastName: student.last_name,
        madeMinutes: student.made_minutes,
        weeklyHours: student.weekly_hours,
        shouldHours: student.should_hours
      });
    }
  }

  handleSubmit(event) {
    console.log(this.state);
    var tempErrorMessages = [];
    if (this.state.frontName.length > 20 || this.state.frontName.length < 2) {
      tempErrorMessages.push(
        <div key={"frontNameError"}>
          voornaam moet tussen de 2 en 20 tekens lang zijn<br />
        </div>
      );
    }
    if (this.state.lastName.length > 30 || this.state.frontName.length < 2) {
      tempErrorMessages.push(
        <div key="lastNameError">
          De achternaam moet tussen de 2 en de 30 tekens lang zijn<br />
        </div>
      );
    }
    if (tempErrorMessages.length > 0) {
      console.log("errors!");
      this.setState({ errorMessages: tempErrorMessages });
    } else {
      this.props.editStudentData(
        this.props.singleStudentData.student_number,
        this.state.frontName,
        this.state.lastName,
        this.state.madeMinutes,
        this.state.weeklyHours,
        this.state.shouldHours
      );
    }
    event.preventDefault();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
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

    if (this.props.editStudentDataStatus === 1) {
      return <Redirect push to="/superadmin" />;
    }

    var student = this.props.singleStudentData;
    var errorMessage;
    if (this.props.editStudentDataStatus === 2) {
      errorMessage = (
        <div>
          Er is een fout opgetreden in het bewerken van de gegevens. controleer
          de gegevens en probeer het nog een keer.
        </div>
      );
    }
    return (
      <div>
        {errorMessage}
        {this.state.errorMessages}
        student nummer: {student.student_number}
        <br />
        <form onSubmit={this.handleSubmit}>
          voornaam:
          <input
            type="text"
            name="frontName"
            value={this.state.frontName}
            onChange={this.handleInputChange}
          />
          <br />achternaam:
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleInputChange}
          />
          <br />gemaakte minuten:
          <input
            min={0}
            type="number"
            name="madeMinutes"
            value={this.state.madeMinutes}
            onChange={this.handleInputChange}
          />
          <br /> uren die de student per week moet maken
          <input
            min={0}
            type="numer"
            name="weeklyHours"
            value={this.state.weeklyHours}
            onChange={this.handleInputChange}
          />
          <br /> uren die de student in het totaal gemaakt zou moeten hebben:
          <input
            min={0}
            type="number"
            name="shouldHours"
            value={this.state.shouldHours}
            onChange={this.handleInputChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  singleStudentData: state.superAdmin.singleStudentData,
  editStudentDataStatus: state.superAdmin.editStudentDataStatus
});

const mapDispatchToProps = dispatch => ({
  editStudentData: (
    studentNumber,
    frontName,
    lastName,
    madeMinutes,
    weeklyHours,
    shouldHours
  ) =>
    dispatch(
      editStudentData(
        studentNumber,
        frontName,
        lastName,
        madeMinutes,
        weeklyHours,
        shouldHours
      )
    ),
  requestSingleStudentData: studentNumber =>
    dispatch(requestSingleStudentData(studentNumber)),
  checkCookieRole: () => dispatch(checkCookieRole()),
  resetEditStudent: () => dispatch(resetEditStudent())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSingleStudent);
