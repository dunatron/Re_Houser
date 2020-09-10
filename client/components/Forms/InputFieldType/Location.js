import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import InputFieldType from './index';

// components
import LocationPicker from '../../LocationPicker';
import FieldError from './FieldError';

const useStyles = makeStyles(theme => ({}));

const Location = props => {
  const {
    register,
    config,
    setValue, // is from useForm
    errors,
    rawData,
    fieldError,
    reset,
    defaultValues,
  } = props;

  const { fieldProps, refConf, mapToObjectKey, inners } = config;

  const [placeId, setPlaceId] = useState(
    rawData ? rawData[config.fieldProps.fieldMaps['placeId']] : null
  );

  const defaultLocation = {
    placeId: rawData ? rawData[config.fieldProps.fieldMaps['placeId']] : null,
    desc: rawData ? rawData[config.fieldProps.fieldMaps['desc']] : null,
    lat: rawData ? rawData[config.fieldProps.fieldMaps['lat']] : null,
    lng: rawData ? rawData[config.fieldProps.fieldMaps['lng']] : null,
  };

  useEffect(() => {
    for (const [key, value] of Object.entries(config.fieldProps.fieldMaps)) {
      if (mapToObjectKey) {
        const str = `${mapToObjectKey}.${value}`;

        register({ name: str }, { ...config.refConf });
      } else {
        register({ name: value }, { ...config.refConf });
      }
    }
  }, [register, config.fieldProps.fieldMaps, mapToObjectKey, config.refConf]);

  const canDisplayInner = () => {
    if (!placeId) return false;
    return true;
  };

  if (!fieldProps) return 'This form component needs fieldProps';
  if (!fieldProps.fieldMaps) {
    return 'This form component needs fieldProps.fieldMaps to know how to map the values to your prisma ready object';
  }

  return (
    <>
      {fieldError ? <Typography color="error">{fieldError}</Typography> : null}
      <FieldError errors={errors} name={config.fieldProps.name} />
      {config.fieldProps.label && (
        <Typography variant="body1">{config.fieldProps.label}</Typography>
      )}
      <LocationPicker
        defaultLocation={defaultLocation}
        selection={data => {
          setPlaceId(data.placeId);
          for (const [key, value] of Object.entries(
            config.fieldProps.fieldMaps
          )) {
            if (mapToObjectKey) {
              setValue(`${mapToObjectKey}.${value}`, data[key]);
            } else {
              setValue(value, data[key]);
            }
          }
        }}
      />
      {inners &&
        inners.map((inner, idx) => {
          if (!canDisplayInner()) return null;
          return (
            <div key={inner.key} style={{ marginTop: '16px' }}>
              <InputFieldType
                {...props}
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

Location.propTypes = {
  config: PropTypes.shape({
    fieldProps: PropTypes.shape({
      fieldMaps: PropTypes.any,
      label: PropTypes.any,
      name: PropTypes.any
    }),
    refConf: PropTypes.any
  }).isRequired,
  defaultValues: PropTypes.any.isRequired,
  errors: PropTypes.any.isRequired,
  fieldError: PropTypes.any.isRequired,
  rawData: PropTypes.any.isRequired,
  register: PropTypes.func.isRequired,
  reset: PropTypes.any.isRequired,
  setValue: PropTypes.func.isRequired
}

export default Location;
