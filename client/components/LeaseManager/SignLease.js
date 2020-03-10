import React, { Component } from 'react';
import { adopt } from 'react-adopt';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import User from '../User/index';
import Error from '../ErrorMessage';
import FinaliseLeaseBtn from '../MutationButtons/FinaliseLeaseButton';
import SignLeaseBtn from '../MutationButtons/SignLeaseButton';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LeaseDetails from './LeaseDetails';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const SimpleTable = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const SignLease = ({ lease, me }) => {
  const { id, finalised, rent, location, lessors, lessees } = lease;
  const classes = useStyles();
  return (
    <div>
      <LeaseDetailsBlock lease={lease} />
      <Typography variant="h6">Lessors</Typography>
      <SignDetailsBlock items={lessors} me={me} type="LESSOR" />
      <Typography variant="h6">Lessees</Typography>
      <SignDetailsBlock items={lessees} me={me} type="LESSEE" />
    </div>
  );
};

const groupHasSigned = group => {
  const signedValues = group.map(item => item.signed);
  if (signedValues.includes(false)) return false;
  return true;
};

const LeaseDetailsBlock = ({ lease }) => {
  const { id, finalised, rent, location, lessors, lessees } = lease;
  const lessesHaveSigned = groupHasSigned(lessees);
  const lessorsHaveSigned = groupHasSigned(lessors);

  const _allSigned = () => {
    if (lessesHaveSigned && lessorsHaveSigned) return true;
    return false;
  };
  const allSigned = _allSigned();
  return (
    <>
      <LeaseDetails lease={lease} />
      {allSigned && (
        <Typography>
          All participants have signed and the lease can now be finalised by a
          lessor
        </Typography>
      )}
      {finalised && (
        <Typography>
          Lease has been Finalised and is now in full effect. If you are still
          seeing this page try refreshing your browser
        </Typography>
      )}
      {!finalised && (
        <Typography>
          All Lessees and Lessors must first sign the lease before it can be
          finalised and put into effect
        </Typography>
      )}
      <FinaliseLeaseBtn
        leaseId={id}
        finalised={finalised}
        disabled={!allSigned}
      />
    </>
  );
};

const SignDetailsBlock = ({ items, me, type }) => {
  const isLessor = type === 'LESSOR' ? true : false;
  const userTypeString = isLessor ? 'Lessors' : 'Lessees';
  const classes = useStyles();
  // return (
  //   <div className={classes.signDetailsBlock}>
  //     <Typography>{userTypeString}</Typography>
  //     {items.map(item => (
  //       <SignDetails item={item} me={me} type={type} />
  //     ))}
  //   </div>
  // );
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" title="Test">
        <TableHead>
          <TableRow>
            <TableCell>Unique Lessor/lessee ID</TableCell>
            <TableCell align="right">Signed</TableCell>
            <TableCell align="right">User Name</TableCell>
            <TableCell align="right">User Email</TableCell>
            <TableCell align="right">User ID</TableCell>
            <TableCell align="right">Sign Lease</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => (
            <SignDetails item={item} me={me} type={type} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const SignDetails = ({ item, me, type }) => {
  const classes = useStyles();
  const { id, signed, user } = item;
  const isLessor = type === 'LESSOR' ? true : false;
  const userTypeString = isLessor ? 'lessor' : 'lesee';

  return (
    <TableRow key={id}>
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      <TableCell align="right">{signed ? 'YES' : 'NO'}</TableCell>
      <TableCell align="right">{user.firstName}</TableCell>
      <TableCell align="right">{user.email}</TableCell>
      <TableCell align="right">{user.id}</TableCell>
      <TableCell align="right">
        {user.id === me.id && (
          <SignLeaseBtn leaseId={id} type={type} id={id} signed={signed} />
        )}
      </TableCell>
    </TableRow>
  );
  return (
    <div className={classes.signDetails}>
      <div className={classes.signDetailsItem}>
        <p>Unique {userTypeString} ID =></p>
        <p>{id}</p>
      </div>
      <div className={classes.signDetailsItem}>
        <p>Signed {signed ? 'YES' : 'NO'}</p>
      </div>

      <p>{userTypeString} User details</p>
      {user.id === me.id && (
        <SignLeaseBtn leaseId={id} type={type} id={id} signed={signed} />
      )}
      <ul>
        <li>{user.id}</li>
        <li>{user.email}</li>
      </ul>
    </div>
  );
};

export default SignLease;
