import React, { Component } from "react";
import PropTypes from "prop-types";

class ApplicationDetailsStep extends Component {
  render() {
    const { me, property } = this.props;
    return (
      <div>
        <h1>I am the application Details step </h1>
      </div>
    );
  }
}

ApplicationDetailsStep.propTypes = {
  me: PropTypes.object,
  property: PropTypes.object
};

export default ApplicationDetailsStep;
