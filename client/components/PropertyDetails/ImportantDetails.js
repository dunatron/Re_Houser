import React, { Component, useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import RehouserPaper from '@/Styles/RehouserPaper';
//icons
import CloseIcon from '@/Styles/icons/CloseIcon';
import CheckIcon from '@/Styles/icons/CheckIcon';

const useStyles = makeStyles(theme => ({
  variablesHeader: {
    marginTop: '16px',
    marginLeft: '16px',
  },
}));

const ImportantDetails = ({ property }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography
        variant="h5"
        // color="primary"
        gutterBottom={true}
        className={classes.variablesHeader}>
        Important Info
      </Typography>
      <RehouserPaper
        square
        style={{
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginRight: '16px',
          }}>
          {property.isLeased ? (
            <CheckIcon fontSize="small" color="primary" />
          ) : (
            <CloseIcon fontSize="small" color="secondary" />
          )}
          <Typography>Leased</Typography>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginRight: '16px',
          }}>
          {property.onTheMarket ? (
            <CheckIcon fontSize="small" color="primary" />
          ) : (
            <CloseIcon fontSize="small" color="secondary" />
          )}
          <Typography>onTheMarket</Typography>
        </div>
        {property.leaseId && (
          <Typography>current lease id: {property.leaseId}</Typography>
        )}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginRight: '16px',
          }}>
          <CloseIcon fontSize="small" />
          <Typography>lease expires in</Typography>
        </div>
        {property.leaseId && (
          <Typography>current lease id: {property.leaseId}</Typography>
        )}
      </RehouserPaper>
    </div>
  );
};

export default ImportantDetails;
