import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { MY_CREDIT_CARDS_QUERY } from '../../graphql/queries/index';
import CreditCardsList from '../CreditCard/CreditCardsList';
import SetPrimaryCreditCardButton from '../MutationButtons/SetPrimaryCreditCardButton';
import { Button, Typography } from '@material-ui/core';
import StripeComponents from '../StripeComponents/index';
import CreateCardForm from '../StripeComponents/CreateCardForm';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';
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
      <StripeComponents>
        <Typography component="h2" variant="subtitle1">
          Create a New Card
        </Typography>
        <CreateCardForm me={me} />
      </StripeComponents>
      <CreditCardsList cardsList={data.myCreditCards} />
    </div>
  );
};

export default CreditCardTab;
