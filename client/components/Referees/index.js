// will get the current user and gets its referres.
// can create new referees upto 3.
// can edit and delete the
import { useState } from 'react';
import { Typography, Button } from '@material-ui/core';

import AddReferee from './Add';
import RefereeList from './List';

const Referees = ({ me }) => {
  const referees = me.referees;
  return (
    <div>
      <RefereeList referees={referees} />
      <AddReferee me={me} />
    </div>
  );
};

export default Referees;
