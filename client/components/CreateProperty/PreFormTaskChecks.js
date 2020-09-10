import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import CreditCardTab from '../Account/CreditCardTab';
import { Button, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  error: {
    color: theme.palette.error.main,
  },
}));

const collectionsConf = me => {
  const [showCards, setShowCards] = useState(false);
  const classes = useStyles();
  return [
    {
      message:
        'Dont know how you are here but you must be signed in to create property',
      valid: () => {
        if (!me) return false;
        return true;
      },
      action: () => (
        <div>
          <p>ToDo: implement reroute to PleaseSignIn</p>
        </div>
      ),
    },
    {
      message: 'You must have a primary credit card when creating a property',
      valid: () => {
        if (!me.primaryCreditCard) {
          return false;
        }
        return true;
      },
      action: () => (
        <div>
          <Button
            color="primary"
            data-cy="toggle-card-creator"
            onClick={e => {
              e.preventDefault();
              setShowCards(!showCards);
            }}>
            Toggle Card Creator
          </Button>
          {showCards && <CreditCardTab me={me} />}
        </div>
      ),
    },
  ];
};

const PreFormTaskChecks = ({ me }) => {
  const collections = collectionsConf(me);
  const classes = useStyles();
  return (
    <div>
      {collections.map((collection, i) => {
        if (!collection.valid()) {
          return (
            <div className={classes.error}>
              <p>{collection.message}</p>
              <p>{collection.action()}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

PreFormTaskChecks.propTypes = {
  me: PropTypes.any.isRequired
}

export default PreFormTaskChecks;
