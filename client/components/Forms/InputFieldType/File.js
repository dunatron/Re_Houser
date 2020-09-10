import React, { useEffect, useState } from 'react';
import FileUploader from './../../FileUploader';
import FieldError from './FieldError';
import InputFieldType from './index';
import { is } from 'ramda';

const File = props => {
  const {
    register,
    config,
    setValue, // is from useForm
    getValues,
    reset,
    errors,
    defaultValues,
    refetchQueries,
    folder,
  } = props;

  const [hasRecievedAFile, setHasRecievedAFile] = useState();

  const filesData = defaultValues[config.key];

  // we essentially dont want to set any files that have already been added
  const { fieldProps, inners } = config;

  // const [serverFiles, setServerFiles] = useState(
  //   is(Array, filesData) ? [...filesData] : []
  // );

  useEffect(() => {
    if (config.refConf) {
      register({ name: config.key }, { ...config.refConf });
    }
  }, []);

  const handleRecieveFile = file => {
    // maybe not the best, but only register on new files added
    // register({ name: config.key }, { ...config.refConf });
    if (config.fieldProps.isMultiple) {
      setValue(config.key, []);
    }
    if (!config.fieldProps.isMultiple) {
      setValue(config.key, file);
    }
    if (config.fieldProps.isMultiple) {
      const currFormVals = getValues();
      const combineVals = [...currFormVals[config.key], file];
      setValue(config.key, combineVals);
    }
    setHasRecievedAFile(true);
  };

  const canDisplayInner = () => {
    // if files is greater than 1 then expose the inners...
    // if (is(Array, filesData) && filesData.length > 0) return true;
    if (hasRecievedAFile) return true;
    return false;
  };

  const createFolder = () => {
    let folderName = '';

    if (fieldProps.prefixFolderName)
      folderName += `${fieldProps.prefixFolderName}/`;

    if (folder) folderName += folder;

    if (fieldProps.appendFolderName)
      folderName += `/${fieldProps.appendFolderName}`;

    if (!fieldProps.appendFolderName)
      folderName += `/${fieldProps.name.replace('.', '/')}`;

    console.log('Create folderName: after append => ', folderName);

    return folderName;
  };

  if (!fieldProps) return 'This form component needs fieldProps';

  const fileParams = fieldProps.fileParams ? fieldProps.fileParams : {};

  return (
    <>
      <FileUploader
        title={fieldProps.label}
        // fileParams={fieldProps.fileParams}
        fileParams={{
          ...fileParams,
          folder: createFolder(),
        }}
        description={fieldProps.description}
        isMultiple={config.fieldProps.isMultiple}
        files={is(Array, filesData) ? [...filesData] : []}
        //   files={serverFiles}
        maxFilesAllowed={config.fieldProps.maxFilesAllowed}
        recieveFile={handleRecieveFile}
        refetchQueries={refetchQueries}
        removeFile={file => {
          if (!config.fieldProps.isMultiple) setValue(config.key);
          if (config.fieldProps.isMultiple) {
            const currFormVals = getValues();
            const newFileVals = currFormVals[config.key].filter(
              f => f.id !== file.id
            );
            setValue(config.key, newFileVals);
          }
        }}
        fileRemovedFromServer={file => {
          if (!config.fieldProps.isMultiple) setValue(config.key);
          if (config.fieldProps.isMultiple) {
            const currFormVals = getValues();
            const newFileVals = currFormVals[config.key].filter(
              f => f.id !== file.id
            );
            setValue(config.key, newFileVals);
          }
        }}
        updateCacheOnRemovedFile={file => {
          // updateCacheOnRemovedFile
        }} // we actually want to get the files again
      />
      <FieldError errors={errors} name={config.key} />
      {inners &&
        inners.map((inner, idx) => {
          if (!canDisplayInner()) return null;
          return (
            <div key={inner.key} style={{ marginTop: '16px' }}>
              <InputFieldType
                config={inner}
                key={idx}
                register={register}
                errors={errors}
                setValue={setValue}
                reset={reset}
                defaultValues={defaultValues}
              />
            </div>
          );
        })}
    </>
  );
};

export default File;
