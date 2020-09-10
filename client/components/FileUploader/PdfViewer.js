import PropTypes from "prop-types";
import React, { useState } from 'react';
// import { Document, Page } from 'react-pdf';
import { Document, Page, Outline } from 'react-pdf/dist/esm/entry.webpack';
// https://www.npmjs.com/package/react-pdf

function RenderPdfDocument({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Outline />
        <Page pageNumber={pageNumber} scale={1.0} height={600} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

RenderPdfDocument.propTypes = {
  fileUrl: PropTypes.any.isRequired
}

export default RenderPdfDocument;
