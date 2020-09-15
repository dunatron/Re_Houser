import PropTypes from 'prop-types';

import useProgressStyles from './ProgressStyles';

const Progress = props => {
  const classes = useProgressStyles();
  return (
    <div className={classes.progressBar}>
      <div
        className={classes.progress}
        style={{ width: props.progress + '%' }}
      />
    </div>
  );
};

Progress.propTypes = {
  progress: PropTypes.string.isRequired,
};

export default Progress;
