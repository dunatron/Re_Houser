import { useQuery } from '@apollo/client';
import { SINGLE_PROPERTY_QUERY } from '@/Gql/queries';

import Error from '@/Components/Error';
import Loader from '@/Components/Loader';
import { Typography } from '@material-ui/core';

const PropertyFullDetails = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_PROPERTY_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading)
    return (
      <Loader loading={loading} text={`Loading Property data for ${id}`} />
    );

  if (error) return <Error error={error} />;

  if (!data) return <Typography>No Data for Property {id}</Typography>;

  return <div>Property Full Details</div>;
};

export default PropertyFullDetails;
