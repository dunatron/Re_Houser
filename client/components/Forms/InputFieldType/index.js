import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../Inputs/TextInput';
import moment from 'moment';
import { is } from 'ramda';

import FieldError from '../InputFieldType/FieldError';

//Material Components
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import CheckReason from './CheckReason';
import CheckboxText from './CheckboxText';
import SelectOneWithText from './SelectOneWithText';
import CheckMultipleWithText from './CheckMultipleWithText';
import SelectMultipleEnum from './SelectMultipleEnum';
import SelectOneEnum from './SelectOneEnum';
import Location from './Location';
import LocationPicker from '../../LocationPicker';
import FormSection from './FormSection';
import EntityFormType from './Entity';
import FileUploader from './../../FileUploader';
import File from './File';

import { Typography, Checkbox, Paper } from '@material-ui/core';

const extractErrorFromErrors = (errors, name) => {
  if (!errors || !name) return null;
  return errors[name] ? errors[name].message : null;
};

const InputFieldType = props => {
  // const { onChange, errors, errorMessage, name, fieldProps } = props;
  const {
    config,
    onChange,
    register,
    errors,
    getValues,
    setValue,
    reset,
    defaultValues,
    defaultValue,
    updateCacheOnRemovedFile,
  } = props;
  const { type, fieldProps, refConf } = config;
  const name = fieldProps ? fieldProps.name : null;
  const label = fieldProps ? fieldProps.label : null;
  const TypeToRender = () => {
    switch (type) {
      case 'Header':
        return <Typography variant="h4">{label}</Typography>;
      case 'Subheader':
        return <Typography variant="h5">{label}</Typography>;
      case 'Section':
        return <FormSection {...props} />;
      case 'String':
        return (
          <>
            <TextInput
              variant="outlined"
              {...fieldProps}
              defaultValue={defaultValue}
              label={label}
              style={{ marginTop: 0 }}
              error={extractErrorFromErrors(errors, name) ? true : false}
              helperText={extractErrorFromErrors(errors, name)}
              inputRef={register ? register(refConf) : null}
            />
          </>
        );
      case 'CheckReason':
        return <CheckReason {...props} />;
      case 'CheckboxText':
        return <CheckboxText {...props} />;
      case 'SelectOneWithText':
        return <SelectOneWithText {...props} />;
      case 'CheckMultipleWithText':
        return <CheckMultipleWithText {...props} />;
      case 'Entity':
        return (
          <EntityFormType
            {...fieldProps}
            __type={config.__type}
            onChange={() => {}}
            {...props}
          />
        );
      case 'SelectMultipleEnum':
        return (
          <SelectMultipleEnum
            {...fieldProps}
            {...props}
            __type={config.__type}
            onChange={() => {}}
            helperText={extractErrorFromErrors(errors, name)}
          />
        );
      case 'SelectOneEnum':
        return (
          <SelectOneEnum
            {...fieldProps}
            {...props}
            __type={config.__type}
            onChange={() => {}}
            helperText={extractErrorFromErrors(errors, name)}
          />
        );
      case 'Location':
        return (
          <Location
            {...props}
            extractErrorFromErrors={extractErrorFromErrors}
          />
        );
      case 'Boolean':
        return (
          <>
            <FormControlLabel
              control={<Switch {...props} aria-label="LoginSwitch" />}
              label={props.label ? props.label : fieldProps.label}
            />
            {config.inners &&
              config.inners.map((inner, idx) => (
                <InputFieldType
                  config={inner}
                  key={idx}
                  setValue={setValue}
                  register={register}
                  errors={errors}
                />
              ))}
          </>
        );
      case 'Int':
        return (
          <TextInput
            variant="outlined"
            {...fieldProps}
            inputRef={register(refConf)}
            type="number"
            style={{ marginTop: 0 }}
            error={extractErrorFromErrors(errors, name) ? true : false}
            helperText={extractErrorFromErrors(errors, name)}
          />
        );
      case 'Float':
        return (
          <TextInput
            variant="outlined"
            {...fieldProps}
            inputRef={register(refConf)}
            type="number"
            style={{ marginTop: 0 }}
            error={extractErrorFromErrors(errors, name) ? true : false}
            helperText={extractErrorFromErrors(errors, name)}
          />
        );

      case 'Date':
        return (
          <TextInput
            variant="outlined"
            {...fieldProps}
            type={'date'}
            inputRef={register(refConf)}
            style={{ marginTop: 0 }}
            error={extractErrorFromErrors(errors, name) ? true : false}
            helperText={extractErrorFromErrors(errors, name)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        );
      case 'DateTime':
        return (
          <TextInput
            variant="outlined"
            {...fieldProps}
            defaultValue={defaultValue}
            inputRef={register(refConf)}
            error={extractErrorFromErrors(errors, name) ? true : false}
            helperText={extractErrorFromErrors(errors, name)}
            style={{ marginTop: 0 }}
            type={fieldProps.type ? fieldProps.type : 'datetime-local'}
            InputLabelProps={{
              shrink: true,
            }}
          />
        );
      case 'AcceptTerms':
        return (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
              }}>
              <Typography style={{ maxWidth: '800px' }}>
                {config.terms}
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    {...fieldProps}
                    defaultChecked={defaultValue}
                    aria-label="LoginSwitch"
                    inputRef={register(refConf)}
                  />
                }
                label={config.fieldProps.label}
              />
            </div>
            <FieldError errors={errors} name={name} />
          </>
        );
      case 'Info':
        return (
          <>
            {config.content}
            <FieldError errors={errors} name={name} />
          </>
        );
      case 'File':
        return (
          <File {...props} extractErrorFromErrors={extractErrorFromErrors} />
        );
      // register({ name: config.key }, { ...config.refConf });
      // if (config.fieldProps.isMultiple) {
      //   setValue(config.key, []);
      // }
      // const currVals = getValues();
      // // const filesData = currVals[config.key];
      // const filesData = defaultValues[config.key];

      // return (
      //   <FileUploader
      //     title={fieldProps.label}
      //     description={fieldProps.description}
      //     isMultiple={config.fieldProps.isMultiple}
      //     files={is(Array, filesData) ? [...filesData] : []}
      //     maxFilesAllowed={config.fieldProps.maxFilesAllowed}
      //     recieveFile={file => {
      //       if (!config.fieldProps.isMultiple) {
      //         setValue(config.key, file);
      //       }
      //       if (config.fieldProps.isMultiple) {
      //         const currFormVals = getValues();
      //         const combineVals = [...currFormVals[config.key], file];
      //         setValue(config.key, combineVals);
      //       }
      //     }}
      //     removeFile={file => {
      //       if (!config.fieldProps.isMultiple) setValue(config.key);
      //       if (config.fieldProps.isMultiple) {
      //         const currFormVals = getValues();
      //         const newFileVals = currFormVals[config.key].filter(
      //           f => f.id !== file.id
      //         );
      //         setValue(config.key, newFileVals);
      //       }
      //     }}
      //     updateCacheOnRemovedFile={updateCacheOnRemovedFile} // we actually want to get the files again
      //   />
      // );
      default:
        return (
          <Typography>
            This Item has no type specified for a form input type of {type}
          </Typography>
        );
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '16px',
      }}>
      {TypeToRender()}
    </div>
  );
};

// const InputFieldType = props => {
//   // const { onChange, errors, errorMessage, name, fieldProps } = props;
//   const {
//     config,
//     onChange,
//     register,
//     errors,
//     setValue,
//     reset,
//     defaultValues,
//     defaultValue,
//   } = props;
//   const { type, fieldProps, refConf } = config;
//   const name = fieldProps ? fieldProps.name : null;
//   const label = fieldProps ? fieldProps.label : null;
//   switch (type) {
//     case 'Header':
//       return <Typography variant="h4">{label}</Typography>;
//     case 'Subheader':
//       return <Typography variant="h5">{label}</Typography>;
//     case 'Section':
//       return <FormSection {...props} />;
//     case 'String':
//       return (
//         <>
//           <TextInput
//             variant="outlined"
//             {...fieldProps}
//             defaultValue={defaultValue}
//             label={label}
//             style={{ marginTop: 0 }}
//             error={extractErrorFromErrors(errors, name) ? true : false}
//             helperText={extractErrorFromErrors(errors, name)}
//             inputRef={register ? register(refConf) : null}
//           />
//         </>
//       );
//     case 'CheckReason':
//       return <CheckReason {...props} />;
//     case 'CheckboxText':
//       return <CheckboxText {...props} />;
//     case 'SelectOneWithText':
//       return <SelectOneWithText {...props} />;
//     case 'CheckMultipleWithText':
//       return <CheckMultipleWithText {...props} />;
//     case 'Entity':
//       return (
//         <EntityFormType
//           {...fieldProps}
//           __type={config.__type}
//           onChange={() => {}}
//           {...props}
//         />
//       );
//     case 'SelectMultipleEnum':
//       return (
//         <SelectMultipleEnum
//           {...fieldProps}
//           {...props}
//           __type={config.__type}
//           onChange={() => {}}
//           helperText={extractErrorFromErrors(errors, name)}
//         />
//       );
//     case 'SelectOneEnum':
//       return (
//         <SelectOneEnum
//           {...fieldProps}
//           {...props}
//           __type={config.__type}
//           onChange={() => {}}
//           helperText={extractErrorFromErrors(errors, name)}
//         />
//       );
//     case 'Location':
//       register(
//         { name: 'location' },
//         {
//           required: {
//             value: true,
//             message: 'You need a location to appraise a property...',
//           },
//         }
//       );
//       register({ name: 'locationLat' }, { required: true });
//       register({ name: 'locationLng' }, { required: true });
//       const locationErr = extractErrorFromErrors(errors, 'location');
//       return (
//         <>
//           {locationErr ? (
//             <Typography color="error">{locationErr}</Typography>
//           ) : null}
//           <LocationPicker
//             // {...props}
//             selection={data => {
//               setValue('location', data.desc);
//               setValue('locationLat', data.lat);
//               setValue('locationLng', data.lng);
//             }}
//           />
//         </>
//       );

//     case 'Boolean':
//       return (
//         <FormControlLabel
//           control={<Switch {...props} aria-label="LoginSwitch" />}
//           label={props.label}
//         />
//       );
//     case 'Int':
//       return (
//         <TextInput
//           variant="outlined"
//           {...fieldProps}
//           inputRef={register(refConf)}
//           type="number"
//           style={{ marginTop: 0 }}
//           error={extractErrorFromErrors(errors, name) ? true : false}
//           helperText={extractErrorFromErrors(errors, name)}
//         />
//       );
//     case 'Float':
//       return (
//         <TextInput
//           variant="outlined"
//           {...fieldProps}
//           inputRef={register(refConf)}
//           type="number"
//           style={{ marginTop: 0 }}
//           error={extractErrorFromErrors(errors, name) ? true : false}
//           helperText={extractErrorFromErrors(errors, name)}
//         />
//       );

//     case 'Date':
//       return (
//         <TextInput
//           variant="outlined"
//           {...fieldProps}
//           type={'date'}
//           inputRef={register(refConf)}
//           style={{ marginTop: 0 }}
//           error={extractErrorFromErrors(errors, name) ? true : false}
//           helperText={extractErrorFromErrors(errors, name)}
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//       );
//     case 'DateTime':
//       return (
//         <TextInput
//           variant="outlined"
//           {...fieldProps}
//           defaultValue={defaultValue}
//           inputRef={register(refConf)}
//           error={extractErrorFromErrors(errors, name) ? true : false}
//           helperText={extractErrorFromErrors(errors, name)}
//           style={{ marginTop: 0 }}
//           type={fieldProps.type ? fieldProps.type : 'datetime-local'}
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//       );
//     case 'AcceptTerms':
//       return (
//         <>
//           <div
//             style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   {...fieldProps}
//                   defaultChecked={defaultValue}
//                   aria-label="LoginSwitch"
//                   inputRef={register(refConf)}
//                 />
//               }
//             />
//             <Typography style={{ maxWidth: '800px' }}>
//               {config.terms}
//             </Typography>
//           </div>
//           <FieldError errors={errors} name={name} />
//         </>
//       );
//     default:
//       return (
//         <Typography>
//           This Item has no type specified for a form input
//         </Typography>
//       );
//   }
// };
InputFieldType.propTypes = {
  type: PropTypes.oneOf([
    'Header',
    'Subheader',
    'String',
    'CheckReason',
    'CheckboxText',
    'SelectOneWithText',
    'CheckMultipleWithText',
    'Boolean',
    'Int',
    'Float',
    'Date',
    'DateTime',
    'AcceptTerms',
  ]),
  inners: PropTypes.arrayOf(PropTypes.instanceOf(InputFieldType)),
};

export default InputFieldType;
