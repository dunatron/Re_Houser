import { useState } from 'react';
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from 'cloudinary-react';
import { Button } from '@material-ui/core';

const UploadWidget = ({ options }) => {
  const [uploaded, setUploaded] = useState([]);

  let widget = window.cloudinary.createUploadWidget(
    {
      cloudName: `dkhe0hx1r`,
      uploadPreset: `tutorial`,
      folder: 'widget',
      maxFiles: 2,
      showPoweredBy: false, // only works for paid
      singleUploadAutoClose: true,
      showAdvancedOptions: true,
      showCompletedButton: true,
      ...options,
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        logSuccess(result);
      }
    }
  );

  /**
   *
   * We then want to save the result in Prisma DB under File __type
   * just a few like public id and perhaps url and maybe type and access_mode
   * the challenge will be to handle images that have been uploaded? or is it. we could show them locally in reaact...
   */
  const logSuccess = result => {
    console.log('Cloudinary upload result => ', result);
    setUploaded([...uploaded, result.info]);
  };

  return (
    <>
      {uploaded.length > 0 &&
        uploaded.map((file, idx) => {
          return <RenderType file={file} />;
        })}
      <div>
        <Button onClick={() => widget.open()}>Upload Files</Button>
      </div>
    </>
  );
};

const RenderType = ({ file }) => {
  switch (file.resource_type) {
    case 'image':
      return <RenderImage file={file} />;
    case 'video':
      return <RenderVideo file={file} />;
    default:
      return <div>Cannot display</div>;
  }
};

const RenderVideo = ({ file }) => {
  return (
    <Video cloudName="dkhe0hx1r" publicId={file.public_id} controls="true">
      <Transformation
        overlay="text:arial_60:Rehouser tutorial"
        gravity="north"
        y="20"
      />
    </Video>
  );
};

const RenderImage = ({ file }) => {
  return (
    <Image
      cloudName="dkhe0hx1r"
      publicId={file.public_id}
      width="300"
      crop="scale">
      <Transformation width="200" crop="scale" angle="10" />
      <Transformation effect="trim" angle="45" crop="scale" width="600">
        <Transformation overlay="text:Arial_100:STAGED" />
      </Transformation>
    </Image>
  );
};

export default UploadWidget;
