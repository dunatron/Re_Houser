import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { MY_CREDIT_CARDS_QUERY } from '@/Gql/queries/index';
import CreditCardsList from '@/Components/CreditCard/CreditCardsList';
import { Typography } from '@material-ui/core';
import Loader from '@/Components/Loader';
import ErrorMessage from '@/Components/ErrorMessage';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
  },
}));

const CreditCardTab = ({ me }) => {
  const { data, error, loading } = useQuery(MY_CREDIT_CARDS_QUERY, {
    variables: {
      where: {
        id: me.id,
      },
    },
    suspend: false,
  });
  const classes = useStyles();

  useEffect(() => {}, []);

  if (loading) return <Loader text="Loading Credit Cards" />;
  if (error) return <ErrorMessage error={error} />;

  const primaryCreditCard = me.primaryCreditCard;

  return (
    <div className={classes.root}>
      <Typography component="header" variant="h6">
        Primary Card ID:
        {primaryCreditCard ? primaryCreditCard.id : 'NOT SET'}
      </Typography>
      <CreditCardsList cardsList={data.myCreditCards} />
    </div>
  );
};

CreditCardTab.propTypes = {
  me: PropTypes.shape({
    id: PropTypes.any,
    primaryCreditCard: PropTypes.shape({
      id: PropTypes.any,
    }),
  }).isRequired,
};

export default CreditCardTab;
