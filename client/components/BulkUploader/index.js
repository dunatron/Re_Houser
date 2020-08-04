import { useState } from 'react';

import { CSVReader } from 'react-papaparse';
import VirtualList from 'react-virtual-list';

const MyList = ({ virtual, itemHeight }) => (
  <ul style={virtual.style}>
    {virtual.items.map(item => {
      console.log('A rendered Item => ', item);
      return (
        <li key={`item_${item.id}`} style={{ height: itemHeight }}>
          A row rendered in our virtuakl list. Meaning we could have 1million
          items and the dom would noit render then, only the amount we specify.
          Well that was easy
          {item.data.map((cell, cellIdx) => {
            return <span>{cell}</span>;
          })}
        </li>
      );
    })}
  </ul>
);

const BulkUploader = () => {
  const [rows, setRows] = useState([]);

  const handleOnDrop = data => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
    setRows(data);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = data => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  console.log('THE ROWS => ', rows);

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

      {/* {rows.map((row, idx) => {
      return <div>A ROW. We would want to display errors for each row that would be handy yea


          {row.errors && row.errors.map((err, errIdx) => {
              return <div>A row error</div>
          })}
      </div>
  })} */}
    </>
  );
};

export default BulkUploader;
