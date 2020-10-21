import PropTypes from 'prop-types';
import React from 'react';
import FinaliseLeaseBtn from '@/Components/MutationButtons/FinaliseLeaseButton';
import SignLeaseBtn from '@/Components/MutationButtons/SignLeaseButton';
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

SignLease.propTypes = {
  lease: PropTypes.any,
  me: PropTypes.any,
  userIsLessee: PropTypes.any,
  userIsLessor: PropTypes.any
};

const groupHasSigned = group => {
  const signedValues = group.map(item => item.signed);
  if (signedValues.includes(false)) return false;
  return true;
};

const LeaseDetailsBlock = ({ lease, userIsLessor, userIsLessee, me }) => {
  const { id, stage, rent, location, lessors, lessees } = lease;
  const userIsAdmin = true
  const lessesHaveSigned = groupHasSigned(lessees);
  const lessorsHaveSigned = groupHasSigned(lessors);

  const _allSigned = () => {
    if (lessesHaveSigned && lessorsHaveSigned) return true;
    if (lessesHaveSigned && userIsAdmin) return true;
    if (lessesHaveSigned && lease.property.rehouserManaged) return true;
    return false;
  };
  const allSigned = _allSigned();
  return (
    <>
      <Typography gutterBottom>
         Signed: {allSigned ? "YES" : "NO"}
      </Typography>
    {lease.property.rehouserManaged && <>
        <Typography gutterBottom>This property is managed by rehouser. Once all potential tenants have clicked the sign button rehouser 
        will then review the draft lease. Upon success the tenants then have to supply a weeks worth or rent to secure 
        </Typography>
      </>}
      {allSigned && (
        <Typography gutterBottom>
          All participants have signed and the lease can now be finalised by a {" "}
          {lease.property.rehouserManaged ? "Rehouser property agent" : 'Landlord'}
        </Typography>
      )}
      {userIsLessor && !allSigned && (
        <Typography gutterBottom>
           Not everyone has signed the lease. As a lessor you will need to finalise the lease once everyone has signed
        </Typography>
      )}
       {userIsLessee && !allSigned && (
        <Typography gutterBottom>
          Not everyone has signed the lease
        </Typography>
      )}
       {userIsLessee && !allSigned && (
        <Typography gutterBottom>
          Please review the draft lease details and when you are happy you will find a table at the bottom where you will need to sign
        </Typography>
      )}

      {stage !== 'SIGNED' && (
        <FinaliseLeaseBtn leaseId={id} stage={stage} disabled={!allSigned} />
      )}

      <LeaseDetails lease={lease} />
    </>
  );
};

LeaseDetailsBlock.propTypes = {
  lease: PropTypes.any,
  userIsLessee: PropTypes.any,
  userIsLessor: PropTypes.any
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

SignDetailsBlock.propTypes = {
  items: PropTypes.shape({
    map: PropTypes.func
  }).isRequired,
  lease: PropTypes.any,
  me: PropTypes.any,
  type: PropTypes.string.isRequired
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

SignDetails.propTypes = {
  item: PropTypes.any,
  lease: PropTypes.shape({
    id: PropTypes.any
  }).isRequired,
  me: PropTypes.shape({
    id: PropTypes.any
  }).isRequired,
  type: PropTypes.string.isRequired
};

export default SignLease;
