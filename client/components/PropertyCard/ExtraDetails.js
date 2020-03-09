import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { SINGLE_PROPERTY_QUERY } from '../../graphql/queries/singlePropertyQuery';
import DetailItem from './DetailItem';
//icons
import HouseIcon from '@material-ui/icons/House';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import RoomIcon from '@material-ui/icons/Room';

import Loader from '../Loader';
import Error from '../ErrorMessage';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: 0,
    // padding: '8px 24px 24px',
  },
  expansionPanel: {
    borderRadius: 0,
  },
  headingItem: {
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
    padding: '0 8px 0 0',
  },
  headingIcon: {},
  heading: {
    fontSize: theme.typography.pxToRem(18),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
    padding: 0,
  },
  column: {
    flexBasis: '33.33%',
  },
  left: {
    flexBasis: '66.66%',
  },
  detailItems: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  ownerEmail: {
    maxWidth: '140px',
    wordBreak: 'break-all',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function ExtraDetails({ property }) {
  const [expanded, setExpanded] = useState(false);

  const numberOfRooms = property.accommodation
    ? property.accommodation.length
    : 0;

  const averageRoomPrice = property.accommodation
    ? property.accommodation.reduce((acc, accomm) => acc + accomm.rent, 0)
    : 0;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel
        style={{ borderRadius: 0 }}
        classes={classes.expansionPanel}
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        defaultExpanded={false}
        TransitionProps={{ unmountOnExit: true }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header">
          <div className={classes.headingItem}>
            <HouseIcon color="secondary" className={classes.headingIcon} />
            <Typography className={classes.heading} color="textPrimary">
              {numberOfRooms}
            </Typography>
          </div>
          <div className={classes.headingItem}>
            <AttachMoneyIcon
              color="secondary"
              className={classes.headingIcon}
            />
            <Typography className={classes.heading} color="textPrimary">
              {averageRoomPrice}
            </Typography>
          </div>
          <div className={classes.headingItem}>
            <RoomIcon color="secondary" className={classes.headingIcon} />
            <Typography className={classes.heading} color="textPrimary">
              {property.location}
            </Typography>
          </div>
        </ExpansionPanelSummary>
        {expanded && <FullDetails algoliaProperty={property} />}
      </ExpansionPanel>
    </div>
  );
}

const FullDetails = ({ algoliaProperty }) => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(SINGLE_PROPERTY_QUERY, {
    variables: {
      where: {
        id: algoliaProperty.id,
      },
    },
  });

  if (loading)
    return (
      <Loader
        loading={loading}
        color="secondary"
        text="Fetching full details for the property"
      />
    );
  if (error) return <Error error={error} />;
  const {
    property: { offStreetSpaces, owners, accommodation, description },
  } = data;
  return (
    <>
      <ExpansionPanelDetails className={classes.details}>
        <div className={clsx(classes.column, classes.left)}>
          <div className={classes.detailItems}>
            <DetailItem
              icon={<RoomIcon />}
              label="offStreetSpaces"
              value={offStreetSpaces}
            />
            <DetailItem
              icon={<RoomIcon />}
              label="offStreetSpaces"
              value={offStreetSpaces}
            />
          </div>
        </div>
        <div className={clsx(classes.column, classes.helper)}>
          <Typography component="p" variant="caption">
            {description}
          </Typography>
          {owners &&
            owners.map((owner, i) => {
              return (
                <>
                  <Typography key={i} component="p">
                    Owner: {owner.firstName}
                  </Typography>
                  <Typography
                    key={i}
                    component="p"
                    className={classes.ownerEmail}>
                    {owner.email}
                  </Typography>
                </>
              );
            })}
        </div>
      </ExpansionPanelDetails>
      <ExpansionPanelDetails>
        {accommodation &&
          accommodation.map((a, i) => {
            return (
              <div key={a.id}>
                <p>
                  Room size: {a.roomSize} rent: {a.rent} expenses: {a.expenses}
                  desc: {a.description}
                </p>
                <hr />
              </div>
            );
          })}
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button size="small" color="primary">
          Apply(ToDo)
        </Button>
      </ExpansionPanelActions>
    </>
  );
};
