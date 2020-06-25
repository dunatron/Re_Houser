import React from 'react';
import Image from 'material-ui-image';

import {
  DEFAULT_IMAGE_FILES,
  FILE_GENERAL_TYPE_IMAGE,
  FILE_GENERAL_TYPE_DOCUMENT,
  findGenericFileType,
} from '../../lib/configs/fileConfigs';

const FilePreviewer = ({ files, remove }) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
      }}>
      {files.map((f, idx) => (
        <RenderFileType file={f} remove={() => remove(f)} />
      ))}
    </div>
  );

  return files.map((f, idx) => {
    return <RenderFileType file={f} />;
    return (
      <div
        style={{
          width: '100%',
        }}>
        <h3>{f.id}</h3>
        <p>{f.url}</p>
        <p>{f.createdAt}</p>
        <p>{f.encoding}</p>
        <p>{f.filename}</p>
        <p>{f.mimetype}</p>
        <p>{f.updatedAt}</p>
        <p>{f.__typename}</p>
      </div>
    );
  });
};

const RenderFileType = ({ file, remove }) => {
  const genericType = findGenericFileType(file);
  let Componet = undefined;
  switch (genericType) {
    case FILE_GENERAL_TYPE_IMAGE:
      Componet = <RenderGenericImage file={file} />;
      break;
    case FILE_GENERAL_TYPE_DOCUMENT:
      Componet = <RenderGenericDocument file={file} />;
      break;
    default:
    // return <div>NOT A DEFAULT FILE TYPE BUT ITS HERE</div>;
  }
  return (
    <div
      style={{
        height: '180px',
        width: '180px',
        border: '1px solid pink',
        position: 'relative',
      }}>
      <div
        onClick={remove}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 900,
        }}>
        Remove
      </div>
      {Componet}
    </div>
  );
};

const RenderGenericImage = ({ file }) => {
  return <Image src={file.url} />;
};

const RenderGenericDocument = ({ file }) => {
  return <div>Generic Document</div>;
};

// createdAt: "2020-05-16T05:22:34.440Z"
// encoding: "7bit"
// filename: "luxury-house-modern-lights-750x1334.jpg"
// id: "cka96p7bcc1640963qzmdbkx1"
// mimetype: "image/jpeg"
// updatedAt: "2020-05-16T05:22:34.440Z"
// url: "https://res.cloudinary.com/dkhe0hx1r/image/upload/v1589606553/ustpxoagepj6usx2xzeb.jpg"
// __typename: "File"

export default FilePreviewer;
