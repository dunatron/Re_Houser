import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import formatMoney from '@/Lib/formatMoney';

const RentalAppraisalView = ({
  rentalAppraisal: {
    id,
    placeId,
    location,
    rooms,
    bathrooms,
    heatSources,
    requestedBy,
    rent,
    hasBeenUsed,
    property,
  },
}) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box
            style={{
              flexWrap: 'wrap',
            }}>
            <Typography variant="h5" color="secondary" gutterBottom>
              Appraisal
            </Typography>
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
          <RequestedBy user={requestedBy} />
        </Grid>
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

const RequestedBy = ({ user: { id, firstName, lastName, email } }) => {
  return (
    <Box>
      <LabelKeyVal label="id" val={id} />
      <LabelKeyVal label="firstName" val={firstName} />
      <LabelKeyVal label="lastName" val={lastName} />
      <LabelKeyVal label="email" val={email} />
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
