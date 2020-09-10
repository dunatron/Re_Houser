import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';

/**
 * These components can inherit props from material typography
 * https://material-ui.com/components/typography/
 */
const MoveInTime = props => {
  const { moveInDate, variant, component } = props;
  var now = moment();
  var earliestMoveInDate = moment(moveInDate);
  const nowToMoveInDate = now.to(earliestMoveInDate);
  return (
    <Typography
      variant={variant ? variant : 'p'}
      component={component ? component : 'p'}
      {...props}>
      Move in date: {nowToMoveInDate.includes('ago') ? 'NOW' : nowToMoveInDate}
    </Typography>
  );
};

MoveInTime.propTypes = {
  component: PropTypes.any.isRequired,
  moveInDate: PropTypes.any.isRequired,
  variant: PropTypes.any.isRequired
}
export { MoveInTime };

const NowToDate = props => {
  const { title, date, variant, component } = props;
  var now = moment();
  var dateAsMoment = moment(date);
  const nowDate = now.to(dateAsMoment);
  return (
    <Typography
      variant={variant ? variant : 'p'}
      component={component ? component : 'p'}
      {...props}>
      {title && `${title}: `}
      {nowDate}
    </Typography>
  );
};

NowToDate.propTypes = {
  component: PropTypes.any.isRequired,
  date: PropTypes.any.isRequired,
  title: PropTypes.any.isRequired,
  variant: PropTypes.any.isRequired
}
export { NowToDate };

const LongDatePretty = props => {
  const { date, title, variant, component } = props;
  var now = moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
  return (
    <Typography
      {...props}
      variant={variant ? variant : 'p'}
      component={component ? component : 'p'}>
      <strong>{title}: </strong>
      {now}
    </Typography>
  );
};

LongDatePretty.propTypes = {
  component: PropTypes.any.isRequired,
  date: PropTypes.any.isRequired,
  title: PropTypes.any.isRequired,
  variant: PropTypes.any.isRequired
}
export { LongDatePretty };

const LeaseLength = props => {
  const { title, moveInDate, expiryDate, variant, component } = props;

  var start = moment(moveInDate);
  var end = moment(expiryDate);

  var years = end.diff(start, 'year');
  start.add(years, 'years');

  var months = end.diff(start, 'months');
  start.add(months, 'months');

  var days = end.diff(start, 'days');
  return (
    <Typography
      variant={variant ? variant : 'p'}
      component={component ? component : 'p'}
      {...props}>
      {title && <strong>{title}: </strong>}
      {years > 0 && `${years} year`}
      {years > 1 && 's'} {months > 0 && `${months} month`}
      {months > 1 && 's'} {days > 0 && `${days} day`}
      {days > 1 && 's'}
    </Typography>
  );
};

LeaseLength.propTypes = {
  component: PropTypes.any.isRequired,
  expiryDate: PropTypes.any.isRequired,
  moveInDate: PropTypes.any.isRequired,
  title: PropTypes.any.isRequired,
  variant: PropTypes.any.isRequired
}
export { LeaseLength };

const LeaseLengthInfo = ({ moveInDate, expiryDate }) => {
  return (
    <div>
      <LongDatePretty
        color="textSecondary"
        title="Move in date"
        date={moveInDate}
        paragraph={true}
      />
      <LongDatePretty
        color="textSecondary"
        title="Expiry date"
        date={expiryDate}
      />
      <LeaseLength
        color="secondary"
        title="Lease is for"
        moveInDate={moveInDate}
        expiryDate={expiryDate}
      />
      <MoveInTime color="primary" moveInDate={moveInDate} />
      <NowToDate color="primary" title="Expiry date" date={expiryDate} />
    </div>
  );
};

LeaseLengthInfo.propTypes = {
  expiryDate: PropTypes.any.isRequired,
  moveInDate: PropTypes.any.isRequired
}
export { LeaseLengthInfo };

export default LeaseLengthInfo;
