import PropTypes from 'prop-types';
import OwnerProperties from '@/Components/OwnerProperties/index';
import PleaseSignIn from '@/Components/PleaseSignIn';
import PageHeader from '@/Components/PageHeader';
import { Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import { OWNER_PROPERTIES_QUERY } from '@/Gql/queries';

const PropertiesPage = props => {
  console.log('props on the actual page => ', props);
  return (
    <>
      <div>SUper Interesting</div>
    </>
  );
};

PropertiesPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default PropertiesPage;
