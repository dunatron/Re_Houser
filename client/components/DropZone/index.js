import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const MyDropzone = ({ receiveFile }) => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log('Accepted Files => ', acceptedFiles);
    console.log('Accepted SIngle Files => ', acceptedFiles[0]);
    // receiveFile(acceptedFiles[0]);
    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        // const binaryStr = reader.result;
        // console.log(binaryStr);
        receiveFile({
          name: file.name,
          size: file.size,
          type: file.type,
          content: new Uint8Array(reader.result),
          raw: file,
        });
        // callback({
        //     name: file.name,
        //     size: file.size,
        //     type: file.type,
        //     content: new Uint8Array(this.result),
        //     raw: file,
        //   });
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default MyDropzone;
