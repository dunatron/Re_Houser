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
import { useCurrentUser } from '../User';
import { toast } from 'react-toastify';

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

  const currentUser = useCurrentUser();
  const me = currentUser.data ? currentUser.data.me : null;
  const keysWithTypes = getKeyTypes(config);
  const preFormattedFormData = formatData(data, keysWithTypes, 'pre');

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    getValues,
    reset,
    clearError,
  } = useForm({
    defaultValues: {
      ...preFormattedFormData,
    },
  });

  const canSubmit = () => {
    var can = true;
    config.forEach(item => {
      if (item.type === 'Signature') {
        if (!me.signature) {
          toast.error(
            <Typography>
              You need to supply a signature before you can progress
            </Typography>,
            {
              autoClose: 3000,
            }
          );
          can = false;
        }
      }
    });
    return can;
  };

  const onSubmit = data => {
    if (!canSubmit()) return;
    const postFormattedFormData = formatData(data, keysWithTypes, 'post');
    props.onSubmit(postFormattedFormData);
  }; // submission when input are valid

  const _createText = () => {
    if (createText) return createText;
    return 'Create ' + title + ' Form';
  };

  const _updateText = () => {
    if (updateText) return updateText;
    return 'Update ' + title + ' Form';
  };

  useEffect(() => {
    return () => {
      const formValsToSave = getValues();
      console.log('formValsToSave => ', formValsToSave);
      // Maybe a bit of a caveat here and will have to be robust
      // ie. saving the form type to redux. if persistState = true
      // Also perhaps a flag to say submitted? Would we have a clear? and a reset?
      // clear would clear out the form. reset would reset to default state like, bank account and prefilled vals based on account
    };
  }, []);

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
                  clearError={clearError}
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
};

export { FormCreator };
export default FormCreator;
