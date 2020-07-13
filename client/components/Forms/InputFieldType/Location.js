import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

// components
import LocationPicker from '../../LocationPicker';

const useStyles = makeStyles(theme => ({}));

const Location = props => {
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
    errors,
    rawData,
    fieldError,
  } = props;

  const { fieldProps, refConf } = config;

  if (!fieldProps) return 'This form component needs fieldProps';
  if (!fieldProps.fieldMaps) {
    return 'This form component needs fieldProps.fieldMaps to know how to map the values to your prisma ready object';
  }

  const defaultLocation = {
    placeId: rawData ? rawData[config.fieldProps.fieldMaps['placeId']] : null,
    desc: rawData ? rawData[config.fieldProps.fieldMaps['desc']] : null,
    lat: rawData ? rawData[config.fieldProps.fieldMaps['lat']] : null,
    lng: rawData ? rawData[config.fieldProps.fieldMaps['lng']] : null,
  };

  useEffect(() => {
    for (const [key, value] of Object.entries(config.fieldProps.fieldMaps)) {
      register({ name: value }, { ...config.refConf });
    }
    // maybe see if we can getfaultValues from the value of mapped keys and set those values as defaults
  }, [register]);

  return (
    <>
      {fieldError ? <Typography color="error">{fieldError}</Typography> : null}
      <LocationPicker
        defaultLocation={defaultLocation}
        selection={data => {
          for (const [key, value] of Object.entries(
            config.fieldProps.fieldMaps
          )) {
            setValue(value, data[key]);
          }
        }}
      />
    </>
  );
};

export default Location;
