import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  container: {
    marginBottom: '16px',
  },
  table: {
    minWidth: 650,
  },
});

function createData(service, description, fees, profit) {
  return { service, description, fees, profit };
}

const rows = [
  createData(
    'Service delivery',
    'Fee for Monies collect from rent',
    '7% of rent plus GST',
    '7% of rent'
  ),
  createData(
    'Letting  Fee',
    'Cost to search and obtain tenants',
    '1 weeks rent plus GST',
    '$ = 1 weeks rent'
  ),
  createData(
    'Advertising Fees',
    'Marketing of property on Realestate.co.nz, Facebook and Rehouser',
    '$59 plus GST',
    '$0'
  ),
  createData(
    'Trademe Advertising Fees - as required',
    'Extra Advertising on Trademe',
    '$169 plus GST',
    ''
  ),
  createData(
    'Credit Check per person',
    'Completion of thorough credit check prior to tenancy starting',
    '$30 plus GST',
    '$14.50'
  ),
  createData(
    'Regular inspections with report',
    'Inspections completed as per insurance requirements - not initial or outgoing',
    '$30 plus GST',
    '3 x per year = $90'
  ),
  createData(
    'Maintenance',
    'Access to Trades people anytime and liaison with Tenants',
    '$30 plus GST',
    ''
  ),
  createData(
    'Healthy Homes Report',
    'Completed upon request',
    '$120 plus GST',
    "1 per new customer who request and don't have one"
  ),
  createData(
    'Cleaning Fee',
    'Cleaning fee, options if Tenants have left in a bad way - can be negotiated from bond',
    '$40 plus GST per hour if applicable.',
    'unpredictable'
  ),
  createData(
    'Gardening / Lawn mowing',
    'Weekly/fortnightly yard maintenance',
    'A quote for this to be completed can be obtained at request',
    'unpredictable'
  ),
  createData(
    'Insurance Fee Claim',
    'Assistance with arranging paper work',
    '$30 plus GST',
    'unpredictable'
  ),
  createData(
    'Attending Tribunal / Mediation hearing',
    'Attending these on your behalf',
    '$30 plus GST',
    'unpredictable'
  ),
  createData(
    'Smoke Alarm Compliance',
    'Ensuring smoke alarm is compliant, if not then this can be completed - this is the supply and install of the smoke alarm if necessary',
    '$99 plus GST',
    'unpredictable'
  ),
];

const FeesTable = () => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Service</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Fees</TableCell>
            <TableCell align="right">Profit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.service}>
              <TableCell component="th" scope="row">
                {row.service}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.fees}</TableCell>
              <TableCell align="right">{row.profit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FeesTable;
