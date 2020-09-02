import React, { useState } from 'react';
import Image from 'material-ui-image';

import { IconButton, Typography, Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ButtonLoader from '../Loader/ButtonLoader';
import IconButtonLoader from '../Loader/IconButtonLoader';

import DownloadIcon from '@material-ui/icons/CloudDownload';

import {
  DEFAULT_IMAGE_FILES,
  FILE_GENERAL_TYPE_IMAGE,
  FILE_GENERAL_TYPE_DOCUMENT,
  findGenericFileType,
} from '../../lib/configs/fileConfigs';

const FilePreviewer = ({ files, remove, isRemoving, removingIds }) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
      }}>
      {files.map((f, idx) => (
        <RenderFileType
          isRemoving={isRemoving}
          file={f}
          remove={() => remove(f)}
          removingIds={removingIds}
        />
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

const RenderFileType = ({ file, remove, isRemoving, removingIds }) => {
  if (!file) return null;
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

  const _isBeingRemoved = () => {
    if (!removingIds) return false;
    if (removingIds.includes(file.id)) return true;
    return false;
  };
  const isBeingRemoved = _isBeingRemoved();
  return (
    <div
      style={{
        height: '180px',
        width: '180px',
        border: '1px solid pink',
        position: 'relative',
      }}>
      <IconButtonLoader
        color="secondary"
        onClick={remove}
        loading={isBeingRemoved}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 900,
        }}>
        <DeleteForeverIcon />
      </IconButtonLoader>

      {Componet}
    </div>
  );
};

const RenderGenericImage = ({ file }) => {
  return <Image src={file.url} />;
};

// createdAt
// updatedAt
// asset_id
// public_id
// version
// version_id
// signature
// width
// height
// format
// resource_type
// created_at
// tags
// pages
// bytes
// type
// etag
// placeholder
// url
// secure_url
// access_mode
// original_filename

const RenderGenericDocument = ({ file }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
      }}>
      <Typography>Generic Document</Typography>
      <Typography>{file.filename}</Typography>
      <Typography>{file.mimetype}</Typography>
      <Typography>{file.encoding}</Typography>
      <Typography>BYTES{file.bytes}</Typography>

      <Button
        href={file.url}
        target="_blank"
        startIcon={<DownloadIcon />}
        size="small">
        download
      </Button>
    </div>
  );
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
