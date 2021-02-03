import PropTypes from 'prop-types';
import { Typography, TextField } from '@material-ui/core';

// components
import CompletionRating from '../CompletionRating';
import PublicUserDetails from '@/Components/User/PublicUserDetails';
import UserDetails from '../UserDetails';
import LandLordDetails from '../LandLordDetails';
import Signature from '@/Components/Signature';

import Referees from '@/Components/Referees/index';

import RehouserPaper from '@/Styles/RehouserPaper';
import UserDetailsFromManger from '@/Components/ManageUsers/UserDetails';

const DetailsTab = ({ me }) => {
  return (
    <>
      <UserDetailsFromManger me={me} userId={me.id} />
      <RehouserPaper>
        <CompletionRating me={me} />
      </RehouserPaper>
      {/* public profile */}
      <RehouserPaper>
        <Typography variant="h5">View your public profile</Typography>
        <PublicUserDetails id={me.id} />
      </RehouserPaper>
      {/* user signature */}
      <RehouserPaper>
        <Typography variant="h5">Online signature</Typography>
        <Typography variant="subtitle1">
          Create an online signature to use when needed
        </Typography>
        <Signature me={me} />
      </RehouserPaper>
      {/* user details/editable */}
      <RehouserPaper>
        <Typography variant="h5">Your user details</Typography>
        <Typography variant="subtitle1">
          These details are used across the system to make the experience as
          seamless as possible
        </Typography>
        <UserDetails me={me} />
      </RehouserPaper>
      <RehouserPaper>
        <Typography variant="h5" gutterBottom>
          Your Referees
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          These referee details are used across the system to prefill
          information where needed
        </Typography>
        <Referees me={me} />
      </RehouserPaper>
      <RehouserPaper>
        <Typography variant="h5">Landlord specific details</Typography>
        <Typography variant="subtitle1">
          These details are used across the system to make the experience as
          seamless as possible
        </Typography>
        <LandLordDetails me={me} />
      </RehouserPaper>
    </>
  );
};

DetailsTab.propTypes = {
  me: PropTypes.any,
};

export default DetailsTab;
