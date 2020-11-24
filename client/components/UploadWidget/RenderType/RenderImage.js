import { useState } from 'react';
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from 'cloudinary-react';
import { Button, Paper } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const RenderImage = ({ file }) => {
  return (
    <Card
      style={{
        height: '80px',
        marginRight: '16px',
        marginBottom: '16px',
      }}>
      <Image
        cloudName="dkhe0hx1r"
        publicId={file.public_id}
        // width="300"
        // height="300"
        width="160"
        height="90"
        crop="scale">
        {/* <Transformation width="200" crop="scale" angle="10" /> */}
        {/* <Transformation effect="trim" angle="45" crop="scale" width="600">
          <Transformation overlay="text:Arial_100:Rehouser" />
        </Transformation> */}
        {/* <Transformation effect="trim" crop="scale" width="600">
          <Transformation overlay="text:Arial_100:Rehouser" />
        </Transformation> */}
      </Image>
    </Card>
  );

  return (
    <Image
      cloudName="dkhe0hx1r"
      publicId={file.public_id}
      width="300"
      crop="scale">
      {/* <Transformation width="200" crop="scale" angle="10" /> */}
      {/* <Transformation effect="trim" angle="45" crop="scale" width="600">
        <Transformation overlay="text:Arial_100:Rehouser" />
      </Transformation> */}
      {/* <Transformation effect="trim" crop="scale" width="600">
        <Transformation overlay="text:Arial_100:Rehouser" />
      </Transformation> */}
    </Image>
  );
};

export default RenderImage;
