import React from 'react';
import PropTypes from 'prop-types';
import { connectHits } from 'react-instantsearch-dom';
import FriendRequestButton from '@/Components/MutationButtons/FriendRequestButton';
import UserDetails from '@/Components/UserDetails';

import mePropTypes from '../../propTypes/mePropTypes';

const CustomHits = ({ hits, me }) => {
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

CustomHits.propTypes = {
  hits: PropTypes.array,
  me: mePropTypes,
};

UserHit.propTypes = {
  hit: PropTypes.object.isRequired,
  me: mePropTypes,
};

export default CustomHitsConnection;
