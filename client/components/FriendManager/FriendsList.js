import { useQuery, gql } from '@apollo/client';
import UserDetails from '../UserDetails';

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
const FriendsList = props => {
  // const {
  //   me: { friends },
  // } = props;
  // const friends = [];
  const { data, loading, error } = useQuery(FRIENDS_QUERY);

  console.log('Show me these friends data => ', data);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <h1>Friends:</h1>
      {data.me.friends &&
        data.me.friends.map(friend => {
          return (
            <div>
              <p>
                Friend => {friend.firstName} {friend.lastName}
              </p>
              <UserDetails user={friend} me={props.me} />
            </div>
          );
        })}
    </div>
  );
};

export default FriendsList;
