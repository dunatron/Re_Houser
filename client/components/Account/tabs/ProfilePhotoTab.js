import PropTypes from 'prop-types';
import UploadProfilePhoto from '../UploadProfilePhoto';
import RehouserPaper from '@/Styles/RehouserPaper';

import { Typography } from '@material-ui/core';

const ProfilePhotoTab = ({ me }) => {
  return (
    <RehouserPaper>
      <Typography variant="h5">Profile photo</Typography>
      <Typography variant="subtitle1">
        your profile photo that will also be public
      </Typography>
      <UploadProfilePhoto me={me} />
    </RehouserPaper>
  );
};

ProfilePhotoTab.propTypes = {
  me: PropTypes.any.isRequired
};

export default ProfilePhotoTab;
