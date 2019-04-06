import React, { Component } from "react";
import PropTypes from "prop-types";

import { USER_PROFILE_CONF } from "../../../lib/configs/userProfileConfig";
import TextInput from "../../../styles/TextInput";

class UserDetailsStep extends Component {
  state = {
    activeStep: 0,
    completed: {}
  };

  render() {
    const { me, property, onChange } = this.props;
    const { userInfo } = this.state;

    return (
      <div>
        {Object.keys(this.props.userInfo).map((userVar, i) => {
          return (
            <div>
              <TextInput
                fullWidth={true}
                name={userVar}
                // disabled={!editableInRentalApplication}
                disabled={
                  !this.props.userInfo[userVar].editableInRentalApplication
                }
                // label={this.state.userInfo[userVar].label}
                // value={this.state.userInfo[userVar].value}
                label={this.props.userInfo[userVar].label}
                value={this.props.userInfo[userVar].value}
                onChange={e => onChange(e)}
                // onChange={e => console.log("First step => ", e)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

UserDetailsStep.propTypes = {
  me: PropTypes.object,
  property: PropTypes.object
};

export default UserDetailsStep;
