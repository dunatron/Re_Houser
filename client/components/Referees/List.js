import { useState } from 'react';
import { Typography, Button } from '@material-ui/core';

import ListItem from './ListItem';

const RefereeList = ({ referees }) => {
  if (referees.length === 0)
    return <Typography variant="h6">No Referees have been added</Typography>;
  return (
    <ul>
      {referees.map((referee, idx) => (
        <ListItem key={idx} referee={referee} />
      ))}
    </ul>
  );
};

export default RefereeList;
