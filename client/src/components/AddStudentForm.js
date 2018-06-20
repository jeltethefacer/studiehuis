import React, { Component } from "react";
import "./../css/Button.css";

class AddStudentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleInputChange = this.handleInputChange.bind(this);
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
    return (
      <div>
        <input
          type="text"
          name="studentNumber"
          onChange={this.handleInputChange}
        />
        <input type="text" name="firstName" onChange={this.handleInputChange} />
        <input type="text" name="lastName" onChange={this.handleInputChange} />
        <input
          type="text"
          name="weeklyHours"
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="MentorClassId"
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}
export default AddStudentForm;
