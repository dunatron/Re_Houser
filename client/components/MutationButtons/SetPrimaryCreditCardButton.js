import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from '@/Gql/queries/index';
import { UPDATE_USER_MUTATION } from '@/Gql/mutations/index';
import ButtonLoader from '@/Components/Loader/ButtonLoader';

const SetPrimaryCreditCardButton = ({ cardId, isPrimary, me }) => {
  // ToDo: Mutation Props
  const [updateUser, updateUserProps] = useMutation(UPDATE_USER_MUTATION, {
    variables: {
      where: {
        id: me.id,
      },
      data: {
        primaryCreditCard: {
          connect: {
            id: cardId,
          },
        },
      },
    },
    update: (proxy, payload) => {
      const userData = proxy.readQuery({ query: CURRENT_USER_QUERY });
      proxy.writeQuery({
        query: CURRENT_USER_QUERY,
        data: {
          me: {
            ...userData.me,
            primaryCreditCard: {
              ...userData.me.primaryCreditCard,
              id: cardId,
              __typename: 'CreditCard',
            },
          },
        },
      });
    },
  });

  return (
    <div>
      {!isPrimary ? (
        <ButtonLoader
          cy="make-primary-card-btn"
          onClick={updateUser}
          loading={updateUserProps.loading}
          successText="Reorganising cache"
          text="Make Primary Card"
        />
      ) : (
        <p>Is Primary Card</p>
      )}
    </div>
  );
};

SetPrimaryCreditCardButton.propTypes = {
  cardId: PropTypes.any,
  isPrimary: PropTypes.any,
};

export default SetPrimaryCreditCardButton;
