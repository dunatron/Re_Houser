import PhotoIdentification from '../PhotoIdentification';
import RehouserPaper from '../../../styles/RehouserPaper';
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

export default PhotoIdTab;
