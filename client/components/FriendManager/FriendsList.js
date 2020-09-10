import PropTypes from "prop-types";
import { useQuery, gql } from '@apollo/client';
import UserDetails from '../UserDetails';

import Loader from '../Loader';
import Error from '../ErrorMessage';

import { Box, Typography } from '@material-ui/core';

const FRIENDS_QUERY = gql`
  query {
    me {
      id
      friends {
        id
        firstName
        lastName
        email
        profilePhoto {
          id
          url
          filename
        }
      }
    }
  }
`;

/**
 *
 * Should probably make a specific freiends query that allows to get them in batches...
 */
const FriendsList = ({ me }) => {
  const { data, loading, error } = useQuery(FRIENDS_QUERY);

  if (loading) return <Loader loading={loading} text="retrieveing friends" />;
  if (error) return <Error error={error} />;

  return (
    <div>
      <h1>Friends:</h1>
      {data.me.friends &&
        data.me.friends.map(friend => {
          return (
            <Box component="div" key={friend.id}>
              <Typography variant="body1">
                {friend.firstName} {friend.lastName}
              </Typography>
              <UserDetails user={friend} me={me} />
            </Box>
          );
        })}
    </div>
  );
};

FriendsList.propTypes = {
  me: PropTypes.any.isRequired
}

export default FriendsList;
