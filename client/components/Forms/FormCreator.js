import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { isEmpty, is } from 'ramda';
import Errors from '../ErrorMessage';

import InputFieldType from './InputFieldType/index';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import FormErrors from './FormErrors';
import formatData from './formatters/formatData';
import useDeepCompareEffect from 'use-deep-compare-effect';

// const configisNotEmpty = config => {
//   if (isEmpty(config)) return true;
//   return false;
// };

const configIsValid = config => {
  if (isEmpty(config)) return false;
  if (!is(Array, config)) return false;
  return true; // yay your valid
};

const extractKeyType = obj => {
  let extras = {};
  if (obj.inners) {
    extras = getKeyTypes(obj.inners);
  }
  return {
    [obj.key]: obj.type,
    ...extras,
  };
};

/**
 * I'm at your face like NamKhan, and you can not reach me on my Samsung,
 * I'm busy fucking the world, and gicung the universe my damned tounge
 */

/**
 *
 * ToDo: needs a lot of attention and a smart decision
 * it basically takes the key and type from a config object and makes sure its type is converted properly between pre and post data
 * I'm possibly trying to make it not fail when editing a config in the docs
 */
const getKeyTypes = conf => {
  if (isEmpty(conf)) return {};
  if (conf == undefined) return {};
  return conf.reduce((acc, c) => {
    const newItem = extractKeyType(c);
    return { ...acc, ...newItem };
  }, {});
};

const FormCreator = props => {
  const {
    title,
    data,
    config,
    isNew,
    posting,
    error,
    fileRemovedFromServer,
    updateCacheOnRemovedFile,
    forceFormUpdates,
    createText,
    updateText,
    refetchQueries,
  } = props;

  const keysWithTypes = getKeyTypes(config);

  const preFormattedFormData = formatData(data, keysWithTypes, 'pre');

  console.log('Preformatted format data => ', preFormattedFormData);

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    getValues,
    reset,
    // refetchQueries,
  } = useForm({
    defaultValues: {
      ...preFormattedFormData,
    },
  }); // initalise the hook
  const onSubmit = data => {
    const postFormattedFormData = formatData(data, keysWithTypes, 'post');
    props.onSubmit(postFormattedFormData);
  }; // submission when input are valid

  // requires that the data is supplied with all the keys before hand, such is that of hooks
  // if (forceFormUpdates) {
  //   Object.keys(data).forEach(key =>
  //     useEffect(() => {
  //       const preFormattedFormDataReset = formatData(
  //         data,
  //         keysWithTypes,
  //         'pre'
  //       );
  //       const newResetObj = {
  //         [key]: preFormattedFormDataReset[key],
  //       };
  //       reset(newResetObj);
  //     }, [data[key]])
  //   );
  // }
  // if (forceFormUpdates) {
  //   useDeepCompareEffect(
  //     () => {
  //       Object.keys(data).forEach(key => {
  //         const preFormattedFormDataReset = formatData(
  //           data,
  //           keysWithTypes,
  //           'pre'
  //         );
  //         const newResetObj = {
  //           [key]: preFormattedFormDataReset[key],
  //         };
  //         reset(newResetObj);
  //       });
  //     },
  //     // query is a string, but variables is an object. With the way Query is used
  //     // in the example above, `variables` will be a new object every render.
  //     // useDeepCompareEffect will do a deep comparison and your callback is only
  //     // run when the variables object actually has changes.
  //     [data]
  //   );
  // }
  // useDeepCompareEffect(
  //   () => {
  //     // Object.keys(data).forEach(key => {
  //     //   const preFormattedFormDataReset = formatData(
  //     //     data,
  //     //     keysWithTypes,
  //     //     'pre'
  //     //   );
  //     //   const newResetObj = {
  //     //     [key]: preFormattedFormDataReset[key],
  //     //   };
  //     //   reset(newResetObj);
  //     // });
  //     // reset(preFormattedFormData);
  //     // setValue
  //     // Object.keys(data).forEach(key => {
  //     //   const preFormattedFormDataReset = formatData(
  //     //     data,
  //     //     keysWithTypes,
  //     //     'pre'
  //     //   );
  //     //   const newResetObj = {
  //     //     [key]: preFormattedFormDataReset[key],
  //     //   };
  //     //   setValue(key, preFormattedFormDataReset[key]);
  //     // });
  //   },
  //   // query is a string, but variables is an object. With the way Query is used
  //   // in the example above, `variables` will be a new object every render.
  //   // useDeepCompareEffect will do a deep comparison and your callback is only
  //   // run when the variables object actually has changes.
  //   [data]
  // );

  // useDeepCompareEffect(
  //   () => {
  //     // make an HTTP request or whatever with the query and variables
  //     // optionally return a cleanup function if necessary
  //     console.log('Deep COmpare DAta RERENDER');
  //   },
  //   // query is a string, but variables is an object. With the way Query is used
  //   // in the example above, `variables` will be a new object every render.
  //   // useDeepCompareEffect will do a deep comparison and your callback is only
  //   // run when the variables object actually has changes.
  //   [data]
  // );

  const _createText = () => {
    if (createText) return createText;
    return 'Create ' + title + ' Form';
  };

  const _updateText = () => {
    if (updateText) return updateText;
    return 'Update ' + title + ' Form';
  };

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <>
      <div
        style={{
          marginBottom: '16px',
        }}>
        {configIsValid(config) &&
          config.map((item, idx) => {
            return (
              <div key={idx}>
                <InputFieldType
                  config={item}
                  key={idx}
                  register={register}
                  reset={reset}
                  errors={errors}
                  setValue={setValue}
                  getValues={getValues}
                  rawData={data}
                  defaultValues={preFormattedFormData}
                  refetchQueries={refetchQueries}
                  updateCacheOnRemovedFile={updateCacheOnRemovedFile}
                  defaultValue={
                    configIsValid(config)
                      ? preFormattedFormData[
                          item.fieldProps ? item.fieldProps.name : null
                        ]
                      : null
                  }
                />
                {errors[item.name] && item.errorMessage}
              </div>
            );
          })}
        <FormErrors errors={errors} />
        <Errors error={error} />
        <Button
          variant="contained"
          disabled={posting}
          onClick={handleSubmit(onSubmit)}
          color="primary">
          {/* {`${isNew ? 'create' : 'update'}: ${title ? title : 'Form'}`} */}
          {isNew ? _createText() : _updateText()}
        </Button>
      </div>
    </>
  );
};

FormCreator.propTypes = {
  name: PropTypes.string,
  // config: PropTypes.arrayOf(
  //   // PropTypes.shape({
  //   //   type: PropTypes.oneOf(['CheckboxText', 'CheckMultipleWithText']),
  //   //   key: PropTypes.string,
  //   // })
  //   PropTypes.instanceOf(InputFieldType)
  // ),
};

export { FormCreator };
export default FormCreator;
