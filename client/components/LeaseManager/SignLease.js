import React from 'react';
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

const SignLease = ({ lease, me, userIsLessor, userIsLessee }) => {
  const { id, stage, rent, location, lessors, lessees } = lease;
  const lesseesAllSigned = groupHasSigned(lessees);
  const classes = useStyles();
  return (
    <div>
      <LeaseDetailsBlock
        lease={lease}
        me={me}
        userIsLessor={userIsLessor}
        userIsLessee={userIsLessee}
      />
      <Typography variant="h5" gutterBottom>
        Lessors
      </Typography>
      <SignDetailsBlock items={lessors} me={me} lease={lease} type="LESSOR" />

      <Typography variant="h5" gutterBottom>
        Lessees
      </Typography>
      <SignDetailsBlock items={lessees} me={me} lease={lease} type="LESSEE" />
    </div>
  );
};

const groupHasSigned = group => {
  const signedValues = group.map(item => item.signed);
  if (signedValues.includes(false)) return false;
  return true;
};

const LeaseDetailsBlock = ({ lease, userIsLessor, userIsLessee }) => {
  const { id, stage, rent, location, lessors, lessees } = lease;
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
        <Typography gutterBottom>
          All participants have signed and the lease can now be finalised by a
          lessor
        </Typography>
      )}
      {userIsLessor && !allSigned && (
        <Typography gutterBottom>
          Everyone has signed the lease. As a lessor you will need to press the
          finalise lease button
        </Typography>
      )}
      {userIsLessee && !allSigned && (
        <Typography gutterBottom>
          Everyone has signed the lease. You need to wait for the landlord to
          finalise the lease. Once they have done that you will need to provide
          1 weeks worth of rent to make evertything official
        </Typography>
      )}
      <>
        <Typography variant="body1" gutterBottom>
          All Lessees and Lessors must first sign the lease. Please review the
          lease details below. If any of the details change before everyone has
          signed, everyone will need to resign
        </Typography>
      </>
      {stage !== 'SIGNED' && (
        <FinaliseLeaseBtn leaseId={id} stage={stage} disabled={!allSigned} />
      )}

      <LeaseDetails lease={lease} />
    </>
  );
};

const SignDetailsBlock = ({ items, me, type, lease }) => {
  const isLessor = type === 'LESSOR' ? true : false;
  const userTypeString = isLessor ? 'Lessors' : 'Lessees';
  const classes = useStyles();
  return (
    <TableContainer
      component={Paper}
      style={{
        margin: '0 0 16px 0',
      }}>
      <Table className={classes.table} aria-label="simple table" title="Test">
        <TableHead>
          <TableRow>
            <TableCell align="right">Signed</TableCell>
            <TableCell align="right">User Name</TableCell>
            <TableCell align="right">User Email</TableCell>
            <TableCell align="right">Sign Lease</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, idx) => (
            <SignDetails
              key={idx}
              item={item}
              me={me}
              type={type}
              lease={lease}
            />
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
      <TableCell align="right">{signed ? 'YES' : 'NO'}</TableCell>
      <TableCell align="right">{user.firstName}</TableCell>
      <TableCell align="right">{user.email}</TableCell>
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
};

export default SignLease;
