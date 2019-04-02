import React, { Component } from "react"
import { USER_PROFILE_CONF } from "./index"
import StarIcon from "@material-ui/icons/Star"
import StarBorderIcon from "@material-ui/icons/StarBorder"
import StarHalfIcon from "@material-ui/icons/StarHalf"
import red from "@material-ui/core/colors/red"
import blue from "@material-ui/core/colors/blue"
import SvgIcon from "@material-ui/core/SvgIcon"
import StarRating from "../StarRating/index"
import ProfileSummaryText from "./ProfileSummaryText"

function SVGHalfStar(props) {
  return (
    <SvgIcon {...props}>
      <path
        clip-path="url(#b)"
        d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
      />
    </SvgIcon>
  )
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
      const currentVariableVal = me[currentValue.variableName]
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
    console.log("val => ", val)

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
