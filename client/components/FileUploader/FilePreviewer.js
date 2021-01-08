import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Image from 'material-ui-image';

import { Typography, ButtonGroup, Button } from '@material-ui/core';

import IconButtonLoader from '@/Components/Loader/IconButtonLoader';

import RenderType from '@/Components/UploadWidget/RenderType';

import {
  FILE_GENERAL_TYPE_IMAGE,
  FILE_GENERAL_TYPE_DOCUMENT,
  findGenericFileType,
} from '@/Lib/configs/fileConfigs';
import TempGenericFileDetails from './TempGenericFileDetails';

import { formatFileSizeUnits } from '@/Lib/formatFileSizeUnits';

import Modal from '@/Components/Modal';
import dynamic from 'next/dynamic';
//icons
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import VisibilityIcon from '@material-ui/icons/Visibility';

const DynamicPdfViewer = dynamic('./PdfViewer', {
  ssr: false,
});

const FilePreviewer = ({
  files,
  remove,
  isRemoving,
  removingIds,
  flip,
  disableActions,
}) => {
  const hasFiles = files.length > 0 ? true : false;
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
      }}>
      {hasFiles ? null : <Button onClick={flip}>No files attached. Add</Button>}
      {disableActions && !hasFiles && <Typography>No Files </Typography>}
      {files.map((f, idx) => (
        <RenderFileType
          disableActions={disableActions}
          key={idx}
          isRemoving={isRemoving}
          file={f}
          remove={() => {
            remove(f);
          }}
          removingIds={removingIds}
        />
      ))}
    </div>
  );
};

FilePreviewer.propTypes = {
  files: PropTypes.array.isRequired,
  isRemoving: PropTypes.any,
  remove: PropTypes.func.isRequired,
  removingIds: PropTypes.any,
};

const RenderFileType = ({
  file,
  remove,
  isRemoving,
  removingIds,
  disableActions,
}) => {
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
      return <div>NOT A DEFAULT FILE TYPE BUT ITS HERE</div>;
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
      {!disableActions && (
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
      )}

      {Componet}
    </div>
  );
};

RenderFileType.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.any,
  }).isRequired,
  isRemoving: PropTypes.any,
  remove: PropTypes.any,
  removingIds: PropTypes.array.isRequired,
};

const RenderGenericImage = ({ file }) => {
  return <Image src={file.url} />;
};

RenderGenericImage.propTypes = {
  file: PropTypes.shape({
    url: PropTypes.any,
  }).isRequired,
};

const RenderGenericDocument = ({ file }) => {
  const [preview, setPreview] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
      }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          flexDirection: 'column-reverse',
          height: '100%',
        }}>
        <Typography gutterBottom>{file.mimetype}</Typography>
        <Typography gutterBottom>{formatFileSizeUnits(file.bytes)}</Typography>
      </div>

      <ButtonGroup
        style={{
          padding: '16px',
        }}
        orientation="vertical"
        variant="text"
        color="primary"
        aria-label="text primary button group">
        <Button
          startIcon={<VisibilityIcon />}
          size="small"
          onClick={() => setPreview(true)}>
          Preview
        </Button>

        <Button
          href={file.url}
          target="_blank"
          startIcon={<DownloadIcon />}
          size="small">
          download
        </Button>
      </ButtonGroup>
      {preview && (
        <Modal
          open={preview}
          close={() => setPreview(false)}
          title="File Details">
          {/* <DynamicPdfViewer fileUrl={file.url} /> */}
          <TempGenericFileDetails file={file} />
        </Modal>
      )}
    </div>
  );
};

RenderGenericDocument.propTypes = {
  file: PropTypes.shape({
    bytes: PropTypes.any,
    mimetype: PropTypes.any,
    url: PropTypes.any,
  }).isRequired,
};

export default FilePreviewer;
