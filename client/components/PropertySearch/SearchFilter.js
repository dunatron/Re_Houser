import PropTypes from "prop-types";
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Configure } from 'react-instantsearch-dom';
import TextInput from '../Inputs/TextInput';
import DateInput from '../Inputs/DateInput';
import moment from 'moment';
import CurrentRefinements from './refinements/CurrentRefinements';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  expansionPanelRoot: {
    // border: '3px solid blue',
    boxShadow: 'unset',
  },
  expansionPanelDetails: {
    padding: 0,
  },
  filterGrid: {
    display: 'grid',
    gridGap: '16px',
    width: '100%',
    padding: '0 16px',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr 1fr ',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
    },
  },
}));

const FilterSummary = ({ bottomPrice, topPrice, moveInDate }) => {
  const moveInPretty = moment(moveInDate).format('MMMM Do YYYY');
  return (
    <div>
      <Typography>
        rent per week ${bottomPrice} - ${topPrice}, move in no later than{' '}
        {moveInPretty}
      </Typography>
    </div>
  );
};

FilterSummary.propTypes = {
  bottomPrice: PropTypes.any.isRequired,
  moveInDate: PropTypes.any.isRequired,
  topPrice: PropTypes.any.isRequired
}

const SearchFilter = () => {
  const stopPropagation = e => e.stopPropagation();
  const classes = useStyles();
  const now = moment();
  const [expanded, setExpanded] = useState(false);
  const [bottomPrice, setBottomPrice] = useState(0);
  const [topPrice, setTopPrice] = useState(9000);
  const [moveInDate, setMoveInDate] = useState(now.format());
  const [moveInDateStamp, setMoveInDateStamp] = useState(now.unix());

  const setAndFormatMoveInDate = date => {
    setMoveInDate(date);
    setMoveInDateStamp(moment(date).unix());
  };

  // must be a all on one line
  // const filterLogic = `move_in_date_timestamp:0000000000 TO ${moveInDateStamp} AND onTheMarket: true AND rent: ${bottomPrice} TO ${topPrice}`
  const filterLogic = `move_in_date_timestamp:0000000000 TO ${moveInDateStamp} AND onTheMarket: true AND lowestRoomPrice >= ${bottomPrice *
    100} AND highestRoomPrice <= ${topPrice * 100}`;
  // 1. ahhh where to start. date search on algolia i stimetsamp, and needs to be numeric
  return (
    <div>
      <Configure filters={filterLogic} />
      <ExpansionPanel
        className={classes.expansionPanelRoot}
        expanded={expanded}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={() => setExpanded(!expanded)}
          aria-controls="panel1bh-content"
          id="panel1bh-header">
          <FilterSummary
            bottomPrice={bottomPrice}
            topPrice={topPrice}
            moveInDate={moveInDate}
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
          <div className={classes.filterGrid}>
            <TextInput
              label="Bottom Price filter"
              value={bottomPrice}
              type="number"
              style={{
                marginTop: 0,
              }}
              onChange={e => setBottomPrice(e.target.value)}
            />
            <TextInput
              label="Top Price filter"
              value={topPrice}
              type="number"
              style={{
                marginTop: 0,
              }}
              onChange={e => setTopPrice(e.target.value)}
            />
            <DateInput
              label="move in date no later than"
              value={moveInDate}
              style={{
                marginTop: 0,
              }}
              onChange={date => setAndFormatMoveInDate(date)}
            />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default SearchFilter;
