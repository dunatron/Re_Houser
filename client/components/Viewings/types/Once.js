import PropTypes from 'prop-types';
import moment from 'moment';
import { Typography } from '@material-ui/core';

const OnceViewing = ({ viewing, ...rest }) => {
  const viewingDate = moment(viewing.dateTime).format(
    'dddd MMMM Do YYYY, h:mm:ss a'
  );

  return (
    <div>
      <Typography>ONCE</Typography>
      <Typography component="ul">
        <Typography component="li">{viewingDate}</Typography>
      </Typography>
    </div>
  );
};

OnceViewing.propTypes = {
  viewing: PropTypes.shape({
    dateTime: PropTypes.string
  }).isRequired
};

export default OnceViewing;
