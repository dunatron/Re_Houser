import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const ErrorPage = ({ statusCode }) => {
  return (
    <Typography variant="h6">
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </Typography>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

ErrorPage.propTypes = {
  statusCode: PropTypes.number,
};

export default ErrorPage;
