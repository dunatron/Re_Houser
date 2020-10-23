import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { isEmpty, is } from 'ramda';
import Errors from '@/Components/ErrorMessage';
import InputFieldType from './InputFieldType/index';
import { Typography, Button, ButtonGroup } from '@material-ui/core';
import FormErrors from './FormErrors';
import formatData from './formatters/formatData';
import { useCurrentUser } from '../User';
import { toast } from 'react-toastify';

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

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
    updateCacheOnRemovedFile,
    createText,
    updateText,
    refetchQueries,
    folder,
    watchFields = [],
    handleWatchChanges,
    hasCancel,
    cancel,
  } = props;

  const currentUser = useCurrentUser();
  const me = currentUser.data ? currentUser.data.me : null;
  const keysWithTypes = getKeyTypes(config);
  const preFormattedFormData = formatData(data, keysWithTypes, 'pre');

  const {
    register,
    unregister,
    handleSubmit,
    errors,
    setValue,
    getValues,
    reset,
    clearError,
    watch,
  } = useForm({
    defaultValues: {
      ...preFormattedFormData,
    },
  });

  if (handleWatchChanges) {
    handleWatchChanges(watch(watchFields));
  }

  const handleClearError = name => {
    console.log('handleClearError name => ', name);
    console.log('handleClearError errors => ', errors);
    if (errors[name]) {
      clearError(name);
    }
  };

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
    console.log('date bug postFormattedFormData => ', postFormattedFormData);
    props.onSubmit(postFormattedFormData);
  };

  const _createText = () => {
    if (createText) return createText;
    return 'Create ' + title;
  };

  const _updateText = () => {
    if (updateText) return updateText;
    return 'Update ' + title;
  };

  useEffect(() => {
    // maybe you can get the default form values
    return () => {
      // get the values from useForm and save it somewhere when component dismounts
      // ahhh hmmmm, well lets have something called. FormContext.
      // basically we will give formCreators a unique key and they will greate objects and values etc. Genius I know.
      // To think about is if we post format. I dont think we do. Its for like creating and shit right.
      // mmm not true. I think maybe we do want to postFormat and preFormat
      const formValsToSave = getValues();
      // alert('ToDo: CreateForm COntext which will handle all form values');
      console.log('formValsToSave => ', formValsToSave);
      // Maybe a bit of a caveat here and will have to be robust
      // ie. saving the form type to redux. if persistState = true
      // Also perhaps a flag to say submitted? Would we have a clear? and a reset?
      // clear would clear out the form. reset would reset to default state like, bank account and prefilled vals based on account
    };
  });

  // clearError('test');

  return (
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
                  {...props}
                  config={item}
                  key={idx}
                  register={register}
                  unregister={unregister}
                  reset={reset}
                  errors={errors}
                  setValue={setValue}
                  getValues={getValues}
                  clearError={handleClearError}
                  rawData={data}
                  folder={folder}
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

        <ButtonGroup
          style={{
            marginTop: '16px',
          }}
          color="primary"
          aria-label="outlined primary button group square">
          <Button
            disabled={posting}
            onClick={handleSubmit(onSubmit)}
            startIcon={isNew ? <AddIcon /> : <EditIcon />}>
            {/* {`${isNew ? 'create' : 'update'}: ${title ? title : 'Form'}`} */}

            {isNew ? _createText() : _updateText()}
          </Button>
          {hasCancel && (
            <Button disabled={posting} onClick={cancel}>
              {/* {`${isNew ? 'create' : 'update'}: ${title ? title : 'Form'}`} */}
              <AddIcon />
              Cancel
            </Button>
          )}
        </ButtonGroup>
      </div>
    </>
  );
};

FormCreator.propTypes = {
  config: PropTypes.array.isRequired,
  createText: PropTypes.any,
  data: PropTypes.any,
  error: PropTypes.any,
  folder: PropTypes.any,
  handleWatchChanges: PropTypes.func,
  isNew: PropTypes.any,
  name: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  posting: PropTypes.any,
  refetchQueries: PropTypes.any,
  title: PropTypes.any,
  updateCacheOnRemovedFile: PropTypes.any,
  updateText: PropTypes.any,
  watchFields: PropTypes.array,
};

export { FormCreator };
export default FormCreator;
