import React, { Component, useState, useRef, useEffect } from 'react';
import Alert from '@/Components/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import RehouserPaper from '@/Styles/RehouserPaper';
import Container from '@/Components/Container';
//icons
import CloseIcon from '@/Styles/icons/CloseIcon';
import CheckIcon from '@/Styles/icons/CheckIcon';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles(theme => ({
  variablesHeader: {
    marginTop: '16px',
    marginLeft: '16px',
  },
}));

const ImportantDetails = ({ property }) => {
  const classes = useStyles();
  const isLeased = property.isLeased;
  const leaseId = property.leaseId;
  const onTheMarket = property.onTheMarket;

  const successIcon = <CheckIcon />;
  const badIcon = <CloseIcon />;
  const warnIcon = <WarningIcon />;
  return (
    <RehouserPaper>
      <Typography
        variant="h5"
        // color="primary"
        gutterBottom={true}
        className={classes.variablesHeader}>
        Important Info
      </Typography>
      <Container gap={1}>
        <Alert
          style={{ marginBottom: '16px' }}
          severity={onTheMarket ? 'success' : 'info'}>
          <Typography>onTheMarket</Typography>
          {onTheMarket && (
            <Typography variant="body2">On the market</Typography>
          )}
          {!onTheMarket && (
            <Typography variant="body2">Not currently on the market</Typography>
          )}
        </Alert>
        <Alert
          style={{ marginBottom: '16px' }}
          severity={isLeased ? 'success' : 'info'}>
          <Typography>Leased</Typography>
          {!isLeased && (
            <Typography variant="body2">Not currently leased</Typography>
          )}
          {isLeased && (
            <Typography variant="body2">
              Property is currently leased
            </Typography>
          )}
        </Alert>
        <Alert
          style={{ marginBottom: '16px' }}
          severity={leaseId ? 'success' : 'info'}>
          <Typography>current lease id: {leaseId}</Typography>
          {!leaseId && (
            <Typography variant="body2">
              This property currently has no active lease assigned to it
            </Typography>
          )}
          {leaseId && (
            <>
              <Typography variant="body2" gutterBottom>
                Property has an active lease asigned to it.
              </Typography>
              <Button>To Do. Go to lease</Button>
            </>
          )}
        </Alert>
      </Container>
    </RehouserPaper>
  );
};

export default ImportantDetails;
