import React, { Component } from "react"
// import { USER_PROFILE_CONF } from "./index"
import { USER_PROFILE_CONF } from "../../lib/configs/userProfileConfig"
import StarRating from "../StarRating/index"
import ProfileSummaryText from "./ProfileSummaryText"

const extractDeepValue = (str, dataObj) => {
  const value = str.split(".").reduce((o, i) => o[i], dataObj)
  return value ? value : ""
}
export default class CompletionRating extends Component {
  getTotalRating = () => {
    const total = USER_PROFILE_CONF.reduce((total, currentValue) => {
      return total + currentValue.ratingVal
    }, 0)
    return total
  }

  calculateUserRating = me => {
    const userTotalRating = USER_PROFILE_CONF.reduce((total, currentValue) => {
      const currentVariableVal = extractDeepValue(currentValue.variableName, me)
      if (currentVariableVal === "") return total
      if (currentVariableVal === null) return total
      if (currentVariableVal === undefined) return total
      return total + currentValue.ratingVal
    }, 0)
    return userTotalRating
  }

  completionPercentage = me => {
    const userRating = this.calculateUserRating(me)
    const totalRating = this.getTotalRating()
    const ratio = Math.ceil((userRating / totalRating) * 100)
    return parseInt(ratio)
  }

  profileSummaryText = me => {
    const val = this.completionPercentage(me)
    if (val < 10) {
      return "Your Profile is weak as shit"
    }
    if (val < 95) {
      return "You are nearly at max profile strength good job"
    }

    if (val <= 100) {
      return "Congratulations you have completed the entire application"
    }
  }

  render() {
    const { me } = this.props
    const userCompletionPercent = this.completionPercentage(me)
    return (
      <div>
        <StarRating percentage={userCompletionPercent} />
        <div>
          {me.firstName && `Hi ${me.firstName}, `}
          {this.profileSummaryText(me)}
          <ProfileSummaryText percentage={userCompletionPercent} />
        </div>
        Total Rating {this.calculateUserRating(me)}/{this.getTotalRating()}
        {me.firstName}
      </div>
    )
  }
}
