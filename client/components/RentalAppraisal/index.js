import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Chip,
  Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import formatMoney from '@/Lib/formatMoney';
import EmailIcon from '@material-ui/icons/Email';

import PublicUserDetails from '@/Components/User/PublicUserDetails';

import { useQuery } from '@apollo/client';
import { SINGLE_RENTAL_APPRAISAL_QUERY } from '@/Gql/queries';
import Loader from '@/Components/Loader';
import Error from '@/Components/ErrorMessage';

const RentalAppraisalView = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_RENTAL_APPRAISAL_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: id,
      },
    },
  });

  if (loading)
    return <Loader loading={loading} text="Loading in rental appraisal" />;

  if (error) return <Error error={error} />;

  if (!data) return <div>No Data from rental appraisal</div>;

  const {
    rentalAppraisal: {
      placeId,
      location,
      rooms,
      bathrooms,
      heatSources,
      requestedBy,
      appraisedBy,
      rent,
      hasBeenUsed,
      property,
    },
  } = data;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box
            style={{
              flexWrap: 'wrap',
            }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}>
              <Typography variant="h5" color="secondary">
                Appraisal
              </Typography>
              <Chip
                size="small"
                style={{ margin: '8px' }}
                label={rent ? 'Appraised' : 'Waiting to be appraised'}
              />
            </div>

            <LabelKeyVal label="location" val={location} />
            <LabelKeyVal label="rooms" val={rooms} />
            <LabelKeyVal label="bathrooms" val={bathrooms} />
            <LabelArrayVal label="heatSources" val={heatSources} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" color="secondary" gutterBottom>
            Requested by
          </Typography>
          {/* <RequestedBy user={requestedBy} /> */}
          {requestedBy && <PublicUserDetails id={requestedBy.id} />}
        </Grid>
        {appraisedBy && (
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" color="secondary" gutterBottom>
              Appraised by
            </Typography>
            {appraisedBy && <PublicUserDetails id={appraisedBy.id} />}

            {/* <AppraisedBy user={appraisedBy} /> */}
          </Grid>
        )}

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" color="default">
            Suggested rent{' '}
            <Typography component="span" variant="h5" color="primary">
              ${formatMoney(rent, 2)}
            </Typography>
          </Typography>
          <Typography>{hasBeenUsed}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" color="default">
            Appraisal used{' '}
            <Typography component="span" variant="h5" color="primary">
              {hasBeenUsed ? 'YES' : 'NO'}
            </Typography>
            {hasBeenUsed && (
              <Typography color="default" variant="body2">
                An appraisal can only be used once, suggesting it has already
                been used to create the property
              </Typography>
            )}
          </Typography>
          <Typography>{hasBeenUsed}</Typography>
        </Grid>
      </Grid>
      {property && (
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" color="default">
            Cool WE should include the property created by this appraisal
          </Typography>
        </Grid>
      )}
    </>
  );
};

const AppraisedBy = ({ user: { id, firstName, lastName, email } }) => {
  return (
    <Box>
      {/* <LabelKeyVal label="id" val={id} /> */}
      <LabelKeyVal label="firstName" val={firstName} />
      <LabelKeyVal label="lastName" val={lastName} />
      <LabelKeyVal label="email" val={email} />
    </Box>
  );
};

const RequestedBy = ({ user: { id, firstName, lastName, email } }) => {
  return (
    <Box>
      <LabelKeyVal label="id" val={id} />
      <LabelKeyVal label="firstName" val={firstName} />
      <LabelKeyVal label="lastName" val={lastName} />
      <LabelKeyVal label="email" val={email} />
      <Button startIcon={<EmailIcon />}>{email}</Button>
    </Box>
  );
};

const LabelArrayVal = ({ label, val }) => {
  return (
    <Box>
      <Typography color="default" gutterBottom>
        {label}
      </Typography>
      <Typography component="ul">
        {val.map(item => (
          <Typography key={item} component="li" color="secondary">
            {item}
          </Typography>
        ))}
      </Typography>
    </Box>
  );
};

LabelArrayVal.propTypes = {
  label: PropTypes.any,
  val: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

const LabelKeyVal = ({ label, val }) => {
  return (
    <Typography gutterBottom>
      <Typography color="default" component="span">
        {label}:{' '}
      </Typography>
      <Typography color="secondary" component="span">
        {val}
      </Typography>
    </Typography>
  );
};

LabelKeyVal.propTypes = {
  label: PropTypes.any,
  val: PropTypes.any,
};

export default RentalAppraisalView;
