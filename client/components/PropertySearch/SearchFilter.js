import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Configure, Stats } from 'react-instantsearch-dom';
import dollarsToCents from '@/Lib/dollarsToCents';
import { formatCentsToDollarsVal } from '@/Lib/formatCentsToDollars';
import TextInput from '@/Components/Inputs/TextInput';
import DateInput from '@/Components/Inputs/DateInput';
import moment from 'moment';
import CurrentRefinements from './refinements/CurrentRefinements';
import ConnectedRefinements from './refinements/ConnectedRefinements';
import ExpansionRefinement from './refinements/ExpansionRefinement';
import PriceFilter from './refinements/PriceFilter';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Input,
  Box,
} from '@material-ui/core';

import DatePicker from '@/Components/Pickers/DatePicker';

import Typography from '@material-ui/core/Typography';
// icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TuneIcon from '@material-ui/icons/Tune';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  expansionPanelRoot: {
    alignItems: 'center',
    backgroundColor: 'rgb(212,220,231)',
    color: theme.palette.secondary.main,
  },
  expansionPanelDetails: {
    padding: 0,
  },
  expansionPanelSummaryContent: {
    display: 'flex',
    alignItems: 'center',
  },
  textInputRoot: {
    // color: `yellow !important`,
    color: 'inherit',
    backgroundColor: 'inherit',
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

const SearchFilter = () => {
  const stopPropagation = e => e.stopPropagation();
  const classes = useStyles();
  const now = moment();
  const [expanded, setExpanded] = useState(false);
  const [bottomPrice, setBottomPrice] = useState(0);
  const [topPrice, setTopPrice] = useState(999999);
  const [moveInDate, setMoveInDate] = useState(now.format());
  const [moveInDateStamp, setMoveInDateStamp] = useState(now.unix());

  // room price
  const [bottomRoomPrice, setBottomRoomPrice] = useState(0);
  const [topRoomPrice, setTopRoomPrice] = useState(9999999999);

  const setAndFormatMoveInDate = date => {
    console.log('Date to format => ', moment(date).unix());
    // setMoveInDate(date);
    setMoveInDateStamp(moment(date).unix());
  };

  // topPrice, bottomPrice
  const handleSetPriceFilter = ({ bottomPrice, topPrice }) => {
    setTopPrice(topPrice);
    setBottomPrice(bottomPrice);
  };

  const handleSetRoomPriceFilter = ({ bottomPrice, topPrice }) => {
    setTopRoomPrice(topPrice);
    setBottomRoomPrice(bottomPrice);
  };

  // must be a all on one line
  // const filterLogic = `move_in_date_timestamp:0000000000 TO ${moveInDateStamp} AND onTheMarket: true AND rent: ${bottomPrice} TO ${topPrice}`
  // const filterLogic = `move_in_date_timestamp:0000000000 TO ${moveInDateStamp} AND onTheMarket: true AND lowestRoomPrice >= ${bottomRoomPrice} AND highestRoomPrice <= ${topRoomPrice} AND rent >= ${bottomPrice} AND rent <= ${topPrice}`;
  // 1. ahhh where to start. date search on algolia i stimetsamp, and needs to be numeric
  // const filterLogic = `move_in_date_timestamp:0000000000 TO ${moveInDateStamp} AND onTheMarket: true AND rent >= ${bottomPrice} AND rent <= ${topPrice}`;
  const filterLogic = `onTheMarket: true AND rent >= ${bottomPrice} AND rent <= ${topPrice}`;
  return (
    <div>
      <Configure filters={filterLogic} />
      <ExpansionPanel
        square={true}
        className={classes.expansionPanelRoot}
        expanded={expanded}>
        <ExpansionPanelSummary
          classes={{
            root: classes.expansionPanelRoot,
            content: classes.expansionPanelSummaryContent,
          }}
          expandIcon={<ExpandMoreIcon />}
          onClick={() => setExpanded(!expanded)}
          aria-controls="panel1bh-content"
          id="panel1bh-header">
          <TuneIcon style={{ marginRight: '8px' }} />
          <div>
            {/* <Typography variant="button">SET FILTER</Typography> */}
            {/* <Typography>{filterLogic}</Typography> */}
            {/* <Typography>
              <Typography component="span" variant="h6">
                available:
              </Typography>{' '}
              {moment(moveInDate).format('ll')}
            </Typography> */}
            <Typography>
              <Typography component="span" variant="h6">
                rent:
              </Typography>{' '}
              {formatCentsToDollarsVal(bottomPrice)} -{' '}
              {formatCentsToDollarsVal(topPrice)}
            </Typography>
            <Stats />
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
          <ConnectedRefinements childrenBefore={true}>
            <ExpansionRefinement title="Property price per week">
              <PriceFilter
                setPrice={handleSetPriceFilter}
                items={[
                  {
                    label: 'ALL',
                    bottomPrice: 0,
                    topPrice: dollarsToCents(9999999),
                  },
                  {
                    label: '$200 - $400',
                    bottomPrice: dollarsToCents(200),
                    topPrice: dollarsToCents(400),
                  },
                  {
                    label: '$400 - $600',
                    bottomPrice: dollarsToCents(400),
                    topPrice: dollarsToCents(600),
                  },
                  {
                    label: '$600 - $800',
                    bottomPrice: dollarsToCents(600),
                    topPrice: dollarsToCents(800),
                  },
                  {
                    label: '$800 - $1000',
                    bottomPrice: dollarsToCents(800),
                    topPrice: dollarsToCents(1000),
                  },
                  {
                    label: '$1000 - $2000',
                    bottomPrice: dollarsToCents(1000),
                    topPrice: dollarsToCents(2000),
                  },
                ]}
              />
            </ExpansionRefinement>
            {/* <ExpansionRefinement title="Price per room">
              <PriceFilter setPrice={handleSetRoomPriceFilter} />
            </ExpansionRefinement> */}
            <ExpansionRefinement title={'Available before date'}>
              <div
                style={{
                  padding: '16px',
                }}>
                <DatePicker
                  value={moveInDate}
                  onChange={setAndFormatMoveInDate}
                />
              </div>
            </ExpansionRefinement>
          </ConnectedRefinements>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default SearchFilter;
