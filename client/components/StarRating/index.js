import PropTypes from "prop-types";
import React, { Component } from 'react';
import StarIcon from '../../styles/icons/StarIcon';
import StarBorderIcon from '../../styles/icons/StarBorderIcon';
import StarHalfIcon from '../../styles/icons/StarHalfIcon';

export default class StarRating extends Component {
  render() {
    const val = this.props.percentage;
    let star1 = <StarBorderIcon />;
    let star2 = <StarBorderIcon />;
    let star3 = <StarBorderIcon />;
    let star4 = <StarBorderIcon />;
    let star5 = <StarBorderIcon />;
    if (val >= 10) {
      star1 = <StarHalfIcon color="secondary" />;
    }
    if (val >= 20) {
      star1 = <StarIcon color="secondary" />;
    }
    if (val >= 30) {
      star2 = <StarHalfIcon color="secondary" />;
    }
    if (val >= 40) {
      star2 = <StarIcon color="secondary" />;
    }
    if (val >= 50) {
      star3 = <StarHalfIcon color="secondary" />;
    }
    if (val >= 60) {
      star3 = <StarIcon color="secondary" />;
    }
    if (val >= 70) {
      star4 = <StarHalfIcon color="secondary" />;
    }
    if (val >= 80) {
      star4 = <StarIcon color="secondary" />;
    }
    if (val >= 90) {
      star5 = <StarHalfIcon color="secondary" />;
    }
    if (val >= 100) {
      star5 = <StarIcon color="secondary" />;
    }
    return (
      <div>
        {star1}
        {star2}
        {star3}
        {star4}
        {star5}
      </div>
    );
  }
}

StarRating.propTypes = {
  percentage: PropTypes.number.isRequired
}
