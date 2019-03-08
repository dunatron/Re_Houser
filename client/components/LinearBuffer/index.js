import React from "react"
import PropTypes from "prop-types"
import LinearProgress from "@material-ui/core/LinearProgress"

const LinearBuffer = props => {
  const { size, currentSize, color } = props
  const progress = (currentSize / size) * 100
  return <LinearProgress variant="determinate" color={color} value={progress} />
}

LinearBuffer.propTypes = {
  size: PropTypes.number.isRequired,
  currentSize: PropTypes.number.isRequired,
}

export default LinearBuffer
