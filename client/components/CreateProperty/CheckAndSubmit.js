import { Paper, Typography } from '@material-ui/core';

const CheckAndSubmit = ({ data }) => {
  console.log('Submitted create form data to check => ', data);

  return (
    <>
      <Typography variant="h6">Check your property details</Typography>
      <Typography variant="h6">{data.location}</Typography>
      <Typography variant="h6">{data.locationLat}</Typography>
      <Typography variant="h6">{data.locationLng}</Typography>
    </>
  );
};

export default CheckAndSubmit;
