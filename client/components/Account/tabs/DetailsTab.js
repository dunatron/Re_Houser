import { Typography, TextField } from '@material-ui/core';

// components
import CompletionRating from '../CompletionRating';
import UserProfile from '../../UserProfile';
import UserDetails from '../UserDetails';
import Signature from '../../Signature';

import RehouserPaper from '../../../styles/RehouserPaper';

const DetailsTab = ({ me }) => {
  return (
    <>
      <RehouserPaper>
        <CompletionRating me={me} />
      </RehouserPaper>
      {/* public profile */}
      <RehouserPaper>
        <Typography variant="h5">View your public profile</Typography>
        <UserProfile user={me} me={me} />
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
    </>
  );
};

export default DetailsTab;
