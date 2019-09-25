import React, { useState } from 'react';
import { connectPagination } from 'react-instantsearch-dom';

import { Button } from '@material-ui/core';

/*
canRefine: false
createURL: ƒ ()
currentRefinement: 1
nbPages: 1
refine: ƒ ()
*/
const AlgoliaMaterialPagination = props => {
  return (
    <div>
      <h1>ToDo Pagination</h1>
      {}
    </div>
  );
};

const ConnectedPagination = connectPagination(AlgoliaMaterialPagination);

export default ConnectedPagination;
