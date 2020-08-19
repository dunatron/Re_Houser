import React, { useState } from 'react';
import { connectPagination } from 'react-instantsearch-dom';

import { Button } from '@material-ui/core';

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
