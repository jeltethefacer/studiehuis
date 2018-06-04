import React, { Component } from "react";
import Button from "./Button";
import axios from "axios";
import { connect } from "react-redux";
import "./../css/ClockInLogin.css";

class ClockInLogin extends Component {
  constructor(props) {
    super(props);
    this.handleButtonInput = this.handleButtonInput.bind(this);
    this.state = {
      users: [],
      leerlingNummerInput: "",
      showLoginButton: false,
      showLogoutButton: false,
      buttonState: 0
    };
  }

  componentDidMount() {}

  login(LoginLN) {
    axios
      .post("/api/login", {
        student: LoginLN,
        clock_in_id: this.props.ClockIn.id
      })
      .then(function(response) {
        console.log("Succes!");
      })
      .catch(function(error) {
        if (error.response.status === 409) {
          console.log(error.response.data);
        } else {
          console.log("database not functioning");
        }
      });
  }

  checkedIfLoggedIn(LN) {
    //  var loggedIn;
    axios
      .post("/api/checkLogin", {
        student: LN
      })
      .then(response => {
        this.setState({ buttonState: 2 });
      })
      .catch(error => {
        this.setState({ buttonState: 1 });
      });
  }

  logout(LN) {
    axios
      .post("/api/logout", {
        student: LN
      })
      .then(function(response) {
        console.log("Succes!");
      })
      .catch(function(error) {
        if (error.response.status === 409) {
          console.log("user not logged in");
        } else {
          console.log("database not functioning");
        }
        console.log((error.response.status = 409));
      });
  }

  handleButtonInput(nummer) {
    var oldLN = this.state.leerlingNummerInput;
    if (nummer === "cancel") {
      oldLN = "";
    } else if (nummer === "backspace") {
      oldLN = oldLN.substring(0, oldLN.length - 1);
    } else if (nummer === "login") {
      this.login(oldLN);
      oldLN = "";
    } else if (nummer === "logout") {
      this.logout(oldLN);
      oldLN = "";
    } else if (oldLN.length < 6) {
      oldLN = oldLN + nummer;
    }

    if (oldLN.length === 6) {
      this.checkedIfLoggedIn(oldLN);
    } else {
      this.setState({ buttonState: 0 });
    }

    this.setState({
      leerlingNummerInput: oldLN
    });
  }

  returnButtonsOneToNine() {
    var lijstje = [];
    for (var x = 1; x <= 9; x++) {
      lijstje.push(
        <Button
          cssclass="numerical"
          content={x}
          key={x}
          goodFunction={this.handleButtonInput}
        />
      );
    }
    return lijstje;
  }

  render() {
    // console.log(this.state.showLoginButton);
    var leerlingNummerForShow = "_______";
    var loginButton = "";
    if (this.state.leerlingNummerInput) {
      leerlingNummerForShow = this.state.leerlingNummerInput;
    }
    if (this.state.buttonState === 1) {
      loginButton = (
        <Button
          cssclass="loginButton"
          content="login"
          goodFunction={this.handleButtonInput}
        />
      );
    } else if (this.state.buttonState === 2) {
      loginButton = (
        <Button
          cssclass="logoutButton"
          content="logout"
          goodFunction={this.handleButtonInput}
        />
      );
    }
    return (
      <div className="ClockInLogin">
        <div className="title">Voer je leerlingnummer in om in te loggen</div>
        <div className="numberShow">{leerlingNummerForShow}</div>
        <div className="dialpad">
          {this.returnButtonsOneToNine()}
          <Button
            cssclass="warning"
            content={"cancel"}
            goodFunction={this.handleButtonInput}
          />
          <Button
            cssclass="numerical"
            content={0}
            goodFunction={this.handleButtonInput}
          />
          <Button
            cssclass="warning"
            content={"backspace"}
            goodFunction={this.handleButtonInput}
          />
        </div>
        <div className="loginOrOutButton">{loginButton}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  ClockIn: state.ClockIn
});

export default connect(mapStateToProps, null)(ClockInLogin);
