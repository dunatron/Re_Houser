import PropTypes from 'prop-types';
import PhotoIdentification from '../PhotoIdentification';
import RehouserPaper from '@/Styles/RehouserPaper';
// material
import { Typography } from '@material-ui/core';

const PhotoIdTab = ({ me }) => {
  return (
    <RehouserPaper>
      <Typography variant="h5">Upload Photo Identifications</Typography>
      <Typography variant="subtitle1">
        Valid id includes: NZ drivers license, passport
      </Typography>
      <PhotoIdentification me={me} />
    </RehouserPaper>
  );
};

PhotoIdTab.propTypes = {
  me: PropTypes.any
};

export default PhotoIdTab;
