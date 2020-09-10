import PropTypes from "prop-types";
import React, { useState, useEffect, Component, memo, useMemo } from 'react';
import encodeImage from '../../lib/encodeImage';

const contentAsSrc = content => {
  const src = 'data:image/png;base64,' + encodeImage(content);
  return src;
};

/**
 * Could optimize further, in the parent wrap it in a memo with dateStamp,
 * i.e when they change the image change the datestamp to now
 */
const PreUploadImage = ({ file }) => {
  const memoizedContent = useMemo(() => contentAsSrc(file.content), [
    file.content,
  ]);
  return <img className="preUpload__image" src={memoizedContent} />;
};

PreUploadImage.propTypes = {
  file: PropTypes.shape({
    content: PropTypes.any
  }).isRequired
}

export default PreUploadImage;
