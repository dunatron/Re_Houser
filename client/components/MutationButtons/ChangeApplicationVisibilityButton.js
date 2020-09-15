import PropTypes from 'prop-types';
import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import Error from '@/Components/ErrorMessage';
import SelectOption from '@/Components/Inputs/SelectOption';
import { SINGLE_RENTAL_APPLICATION_QUERY } from '@/Gql/queries/index';
/**
 * PRIVATE
 * FRIENDS_ONLY
 * PUBLIC
 */
const UPDATE_APPLICATION_VISIBILITY_MUTATION = gql`
  mutation UPDATE_APPLICATION_VISIBILITY_MUTATION(
    $data: RentalApplicationUpdateInput!
    $where: RentalApplicationWhereUniqueInput!
  ) {
    updateRentalApplication(data: $data, where: $where) {
      id
      visibility
    }
  }
`;
const options = [
  {
    name: 'Private',
    value: 'PRIVATE',
  },
  {
    name: 'Friend Only',
    value: 'FRIENDS_ONLY',
  },
  {
    name: 'Public',
    value: 'PUBLIC',
  },
];
const ChangeApplicationVisibilityBtn = ({ applicationId, visibility }) => {
  const [updateVisibility, updateVisibilityProps] = useMutation(
    UPDATE_APPLICATION_VISIBILITY_MUTATION
  );
  return (
    <>
      <Error error={updateVisibilityProps.error} />
      <SelectOption
        disabled={updateVisibilityProps.loading}
        value={visibility}
        options={options}
        label="Visibility"
        handleChange={e =>
          updateVisibility({
            variables: {
              data: {
                visibility: e.target.value,
              },
              where: {
                id: applicationId,
              },
            },
            optimisticResponse: {
              __typename: 'Mutation',
              updateRentalApplication: {
                __typename: 'RentalApplication',
                id: applicationId,
                visibility: e.target.value,
              },
            },
            update: (proxy, payload) => {
              const rentalApplication = proxy.readQuery({
                query: SINGLE_RENTAL_APPLICATION_QUERY,
                variables: {
                  where: { id: applicationId },
                },
              });
              proxy.writeQuery({
                query: SINGLE_RENTAL_APPLICATION_QUERY,
                variables: {
                  where: { applicationId },
                },
                data: {
                  ...rentalApplication,
                  ...payload.data.updateRentalApplication,
                },
              });
            },
          })
        }
      />
    </>
  );
};

ChangeApplicationVisibilityBtn.propTypes = {
  applicationId: PropTypes.any.isRequired,
  visibility: PropTypes.any.isRequired,
};

export default ChangeApplicationVisibilityBtn;
