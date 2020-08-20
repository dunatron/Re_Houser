import React from 'react';
import { connectHits } from 'react-instantsearch-dom';
import FriendRequestButton from '../MutationButtons/FriendRequestButton';
import UserDetails from '../UserDetails';

const CustomHits = props => {
  const { hits, me } = props;
  return (
    <div className="a-search__hits">
      {hits.map((hit, i) => (
        <UserHit key={i} hit={hit} me={me} />
      ))}
    </div>
  );
};

const UserHit = ({ hit, me }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
      }}>
      <FriendRequestButton me={me} requestFriendId={hit.id} />
      <UserDetails me={me} user={hit} />
    </div>
  );
};

const CustomHitsConnection = connectHits(CustomHits);

export default CustomHitsConnection;
