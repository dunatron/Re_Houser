import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import gql from 'graphql-tag';
import TextInput from '../Inputs/TextInput';
import Button from '@material-ui/core/Button';
import FriendRequestButton from '../MutationButtons/FriendRequestButton';
import UserDetails from '../UserDetails';

const FIND_USERS_QUERY = gql`
  query FIND_USERS_QUERY(
    $where: UserWhereInput
    $orderBy: UserOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    findUsers(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      id
      firstName
      lastName
      email
      profilePhoto {
        filename
        url
      }
    }
  }
`;
const SearchAndRequestFriend = props => {
  const { me } = props;
  // search inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [results, setResults] = useState([]);
  const client = useApolloClient();
  const searchUsers = async () => {
    const users = await client.query({
      query: FIND_USERS_QUERY,
      variables: {
        where: {
          AND: {
            firstName_contains: firstName,
            lastName_contains: lastName,
            email_contains: email,
          },
        },
        first: 20,
      },
    });
    setResults(users.data.findUsers);
  };
  return (
    <div>
      <TextInput
        label="FirstName Contains"
        onChange={e => setFirstName(e.target.value)}
      />
      <TextInput
        label="LastName Contains"
        onChange={e => setLastName(e.target.value)}
      />
      <TextInput
        label="Email Contains"
        onChange={e => setEmail(e.target.value)}
      />
      <Button onClick={() => searchUsers()} variant="outlined">
        Search For Users
      </Button>
      {results &&
        results.map((result, i) => {
          console.log('Ohh cool a result => ', result);
          return (
            <div key={result.id}>
              <UserDetails me={me} user={result} />
              <FriendRequestButton me={me} requestFriendId={result.id} />
            </div>
          );
        })}
    </div>
  );
};

export default SearchAndRequestFriend;
