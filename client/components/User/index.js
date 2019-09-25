import { Query } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from '../../query/index';

const useCurrentUser = props => {
  const { data, error, loading } = useQuery(CURRENT_USER_QUERY);
  return {
    data,
    error,
    loading,
  };
};

/**
 * render props would receive the children and pass these props to them
 */
const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY, useCurrentUser };
