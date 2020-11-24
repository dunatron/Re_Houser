import { useState } from 'react';
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from 'cloudinary-react';
import { Button } from '@material-ui/core';

const UploadWidget = ({ options, onUploadCompleted }) => {
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
    if (onUploadCompleted) {
      onUploadCompleted(result);
    }
  };

  return (
    <>
      <div>
        <Button onClick={() => widget.open()}>Upload Files</Button>
      </div>
    </>
  );
};

export default UploadWidget;
