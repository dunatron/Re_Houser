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
import LeaseWallet from '../LeaseWallet';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const SignLease = ({ lease, me }) => {
  const { id, stage, rent, location, lessors, lessees } = lease;
  const lesseesAllSigned = groupHasSigned(lessees);
  const classes = useStyles();
  return (
    <div>
      <LeaseDetailsBlock lease={lease} />
      {lesseesAllSigned && (
        <div>
          <Typography>
            Before the Lease can go into action we need 1 weeks worth of rent in
            the account
          </Typography>
          <LeaseWallet lease={lease} />
        </div>
      )}
      <Typography variant="h6">Lessors</Typography>
      <SignDetailsBlock items={lessors} me={me} lease={lease} type="LESSOR" />

      <Typography variant="h6">Lessees</Typography>
      <SignDetailsBlock items={lessees} me={me} lease={lease} type="LESSEE" />
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
      {allSigned && (
        <Typography>
          All participants have signed and the lease can now be finalised by a
          lessor
        </Typography>
      )}
      {stage === 'PAID' && (
        <Typography>
          Lease has been signed and we have at least 1 weeks rent in the
          account. This makes the lease fully legal
        </Typography>
      )}
      {stage === 'INITIALIZING' && (
        <>
          <Typography>
            All Lessees and Lessors must first sign the lease before it can be
            finalised and put into effect.
          </Typography>
          <Typography>You will find the lease details below.</Typography>
          <Typography>
            Below that is the areas where Lessors and Lesses must sign.
          </Typography>
        </>
      )}
      {stage !== 'SIGNED' && (
        <FinaliseLeaseBtn
          leaseId={id}
          finalised={finalised}
          disabled={!allSigned}
        />
      )}

      <LeaseDetails lease={lease} />
    </>
  );
};

const SignDetailsBlock = ({ items, me, type, lease }) => {
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
            <SignDetails item={item} me={me} type={type} lease={lease} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const SignDetails = ({ item, me, type, lease }) => {
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
          <SignLeaseBtn
            leaseId={lease.id}
            type={type}
            id={id}
            signed={signed}
          />
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
