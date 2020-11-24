import { useState } from 'react';
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from 'cloudinary-react';
import { Button, Card } from '@material-ui/core';

const RenderVideo = ({ file }) => {
  return (
    <Card style={{ height: '350px' }}>
      <Video
        cloudName="dkhe0hx1r"
        publicId={file.public_id}
        controls="true"
        height="360"
        width="480">
        {/* <Transformation
          overlay="text:arial_60:Rehouser tutorial"
          gravity="north"
          y="20"
        />
        <Transformation
          crop="pad"
          height="360"
          width="480"
          // quality="70"
          // duration="10"
        /> */}
      </Video>
    </Card>
  );
};

export default RenderVideo;
