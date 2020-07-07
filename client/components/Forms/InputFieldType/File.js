import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FileUploader from './../../FileUploader';
import { useForm } from 'react-hook-form';
import { isEmpty, is } from 'ramda';

// components
import LocationPicker from '../../LocationPicker';

const useStyles = makeStyles(theme => ({}));

const File = props => {
  const classes = useStyles();
  const {
    __type,
    values,
    defaultValue,
    label,
    selectID,
    handleChange,
    removeItem,
    register,
    config,
    setValue, // is from useForm
    getValues,
    defaultValues,
    errors,
    extractErrorFromErrors,
    refetchQueries,
  } = props;

  // we essentially dont want to set any files that have already been added
  const { fieldProps, refConf } = config;

  const [serverFiles, setServerFiles] = useState(
    is(Array, filesData) ? [...filesData] : []
  );

  if (!fieldProps) return 'This form component needs fieldProps';

  const handleRecieveFile = file => {
    // maybe not the best, but only register on new files added
    register({ name: config.key }, { ...config.refConf });
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
  };

  const filesData = defaultValues[config.key];

  return (
    <FileUploader
      title={fieldProps.label}
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
  );
};

export default File;
