import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { USER_PROFILE_CONF } from '@/Lib/configs/userProfileConfig';
import StarRating from '@/Components/StarRating/index';
import ProfileSummaryText from './ProfileSummaryText';

const extractDeepValue = (str, dataObj) => {
  try {
    const value = str.split('.').reduce((o, i) => o[i], dataObj);
    if (value === null) return '';
    return value ? value : '';
  } catch (e) {
    return e.message;
  }
};
const CompletionRating = ({ me }) => {
  const getTotalRating = () => {
    const total = USER_PROFILE_CONF.reduce((total, currentValue) => {
      return total + currentValue.ratingVal;
    }, 0);
    return total;
  };

  const calculateUserRating = me => {
    const userTotalRating = USER_PROFILE_CONF.reduce((total, currentValue) => {
      const currentVariableVal = extractDeepValue(
        currentValue.variableName,
        me
      );
      if (currentVariableVal === '') return total;
      if (currentVariableVal === null) return total;
      if (currentVariableVal === undefined) return total;
      return total + currentValue.ratingVal;
    }, 0);
    return userTotalRating;
  };

  const completionPercentage = me => {
    const userRating = calculateUserRating(me);
    const totalRating = getTotalRating();
    const ratio = Math.ceil((userRating / totalRating) * 100);
    return parseInt(ratio);
  };

  const profileSummaryText = me => {
    const val = completionPercentage(me);
    if (val < 10) {
      return 'Your Profile is weak as shit';
    }
    if (val < 95) {
      return 'You are nearly at max profile strength good job';
    }

    if (val <= 100) {
      return 'Congratulations you have completed the entire application';
    }
  };

  const userCompletionPercent = completionPercentage(me);
  return (
    <div>
      <StarRating percentage={userCompletionPercent} />
      <div>
        {me.firstName && `Hi ${me.firstName}, `}
        {profileSummaryText(me)}
        <ProfileSummaryText percentage={userCompletionPercent} />
      </div>
      Total Rating {calculateUserRating(me)}/{getTotalRating()}
      {me.firstName}
    </div>
  );
};

CompletionRating.propTypes = {
  me: PropTypes.shape({
    firstName: PropTypes.any
  }).isRequired
};

export default CompletionRating;
