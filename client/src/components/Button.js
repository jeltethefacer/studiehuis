import React, { Component } from "react";
import "./../css/Button.css";

class Button extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.goodFunction(this.props.content);
  }

  render() {
    var cssclass = this.props.cssclass + " Button";
    return (
      <button className={cssclass} onClick={this.handleClick}>
        {this.props.content}
      </button>
    );
  }
}
export default Button;
