import PropTypes from 'prop-types';
import { useState } from 'react';

import { CSVReader } from 'react-papaparse';
import VirtualList from 'react-virtual-list';

const MyList = ({ virtual, itemHeight }) => (
  <ul style={virtual.style}>
    {virtual.items.map(item => {
      return (
        <li key={`item_${item.id}`} style={{ height: itemHeight }}>
          A row rendered in our virtuakl list. Meaning we could have 1million
          items and the dom would noit render then, only the amount we specify.
          Well that was easy
          {item.data.map((cell, cellIdx) => {
            return <span key={cellIdx}>{cell}</span>;
          })}
        </li>
      );
    })}
  </ul>
);

MyList.propTypes = {
  itemHeight: PropTypes.any,
  virtual: PropTypes.shape({
    items: PropTypes.shape({
      map: PropTypes.func,
    }),
    style: PropTypes.any,
  }).isRequired,
};

const BulkUploader = () => {
  const [rows, setRows] = useState([]);

  const handleOnDrop = data => {
    setRows(data);
  };

  const handleOnError = (err, file, inputElem, reason) => {};

  const handleOnRemoveFile = data => {};

  const MyVirtualList = VirtualList()(MyList);

  return (
    <>
      <div
        style={{
          height: '180px',
        }}>
        <CSVReader
          onDrop={handleOnDrop}
          onError={handleOnError}
          addRemoveButton
          onRemoveFile={handleOnRemoveFile}
          header={true}
          delimiter=",">
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
      </div>

      <MyVirtualList items={rows} itemHeight={100} />
    </>
  );
};

export default BulkUploader;
