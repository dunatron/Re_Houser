import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FormCreator } from '@/Components/Forms';
import { CREATE_RENTAL_APPRAISAL_MUTATION } from '@/Gql/mutations';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { Typography } from '@material-ui/core';
import SuccessPaper from '@/Components/SuccessPaper';

import PROPERTY_APPRAISAL_CONF from '../../lib/configs/propertyAppraisalForm';

const PropertyAppraisal = props => {
  const { propertyId, me } = props;

  const [sentAppraisal, setSentAppraisal] = useState(false);
  const [message, setMessage] = useState('Some dummy message');
  if (!me)
    return (
      <Typography variant="h6" gutterBottom>
        You must be logged in to create a property appraisal
      </Typography>
    );

  const handleCompleted = data => {
    const { id } = data.createRentalAppraisal;
    const msg = `Rental Appraisal has been requested, you will receive an email confirming this. We will contact you to confirm the appraisal. \n RentalAppraisal ID ${id}`;
    setSentAppraisal(true);
    setMessage(msg);
    toast.success(msg);
  };

  const handleCreateMore = () => {
    setSentAppraisal(false);
    setMessage(null);
  };

  const [createRentalAppraisal, { loading, error, data }] = useMutation(
    CREATE_RENTAL_APPRAISAL_MUTATION,
    {
      onCompleted: handleCompleted,
    }
  );

  return (
    <div
      style={{
        maxWidth: '800px',
      }}>
      {sentAppraisal && (
        <SuccessPaper handleCreateMore={handleCreateMore} show={sentAppraisal}>
          {message}
        </SuccessPaper>
      )}
      {!sentAppraisal && (
        <FormCreator
          title="Property Appraisal"
          isNew={!propertyId}
          createText="Request Property Appraisal"
          config={PROPERTY_APPRAISAL_CONF}
          error={error}
          posting={loading}
          onSubmit={prismaReadyData => {
            createRentalAppraisal({
              variables: {
                data: {
                  ...prismaReadyData,
                  requestedBy: {
                    connect: {
                      id: me.id,
                    },
                  },
                  hasBeenUsed: false,
                  property: propertyId
                    ? {
                        connect: {
                          id: propertyId,
                        },
                      }
                    : null,
                },
              },
            });
          }}
        />
      )}
    </div>
  );
};

PropertyAppraisal.propTypes = {
  me: PropTypes.shape({
    id: PropTypes.any,
  }).isRequired,
  propertyId: PropTypes.any.isRequired,
};

export default PropertyAppraisal;
