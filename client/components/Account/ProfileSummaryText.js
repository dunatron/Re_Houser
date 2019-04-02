import React, { Component } from "react"

export default class ProfileSummryText extends Component {
  render() {
    const val = this.props.percentage

    if (val < 10) {
      return "Your Profile is weak as shit here are some tips"
    }
    if (val < 30) {
      return "you are on your way to completing your profile, consider uploading the rest of your information as it will make applying for applications that much easier and seemless"
    }
    if (val < 70) {
      return "You are nearly at max profile strength good job"
    }
    if (val < 95) {
      return "You are nearly at max profile strength good job"
    }

    if (val <= 100) {
      return "Congratulations you have completed the entire application"
    }
  }
}
