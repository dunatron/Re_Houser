import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { isEmpty, is } from 'ramda';

import InputFieldType from './InputFieldType/index';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import FormErrors from './FormErrors';
import formatData from './formatters/formatData';

// const configisNotEmpty = config => {
//   if (isEmpty(config)) return true;
//   return false;
// };

const configIsValid = config => {
  // let valid =
  // if (isEmpty(config)) return true;
  // // return false;
  // return false;
  // return false;
  // if (is(Object, config)) return true;
  // // if (isEmpty(config)) return false;
  // if (is(Array, config)) {
  //   // return config;
  //   return true;
  // }
  // return false;

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
 *
 * ToDo: needs a lot of attention and a smart decision
 * it basically takes the key and type from a config object and makes sure its type is converted properly between pre and post data
 * I'm possibly trying to make it not fail when editing a config in the docs
 */
const getKeyTypes = conf => {
  // handle empty obj
  // return {};
  // if (isEmpty(conf)) return {};
  // if (!is(Array, conf))
  //   return conf.reduce((acc, c) => {
  //     const newItem = extractKeyType(c);
  //     if (!c.key) return { ...acc };
  //     return { ...acc, ...newItem };
  //   }, {});
  // return {};
  if (isEmpty(conf)) return {};
  return conf.reduce((acc, c) => {
    const newItem = extractKeyType(c);
    if (!c.key) return { ...acc };
    return { ...acc, ...newItem };
  }, {});
};

const FormCreator = props => {
  const { title, data, config, isNew, posting } = props;

  console.log('form config => ', config);

  const keysWithTypes = getKeyTypes(config);

  console.log('keysWithTypes => ', keysWithTypes);

  const preFormattedFormData = formatData(data, keysWithTypes, 'pre');

  console.log('preFormattedFormData => ', preFormattedFormData);

  //ToDo: we should have a way to see if the form has been touched
  // maybe see if we can get recently updated values. that would potentially work better

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      ...preFormattedFormData,
    },
  }); // initalise the hook
  const onSubmit = data => {
    console.group('FORM SUBITTED!!!');
    console.log('data => ', data);
    // const formattedData = _formatInsulationData(data);
    const postFormattedFormData = formatData(data, keysWithTypes, 'post');
    console.log('data => ', data);
    console.log('keysWithTypes => ', keysWithTypes);
    console.log('postFormattedFormData => ', postFormattedFormData);
    console.groupEnd();
    props.onSubmit(postFormattedFormData);
  }; // submission when input are valid

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <form onSubmit={handleSubmit(onSubmit)}>
      {configIsValid(config) &&
        config.map((item, idx) => {
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '16px',
              }}>
              <InputFieldType
                config={item}
                //   onChange={val => console.log('onOnCnage...', val)}
                key={idx}
                register={register}
                reset={reset}
                errors={errors}
                setValue={setValue}
                defaultValues={preFormattedFormData}
                // defaultValue={
                //   configIsValid(config)
                //     ? preFormattedFormData[item.fieldProps.name]
                //     : null
                // }
                defaultValue={
                  configIsValid(config)
                    ? preFormattedFormData[
                        item.fieldProps ? item.fieldProps.name : null
                      ]
                    : null
                }
                // defaultValue={
                //   preFormattedFormData
                //     ? preFormattedFormData[item.fieldProps.name]
                //     : null
                // }
                // name={'yay'}
                //   inputRef={register(item.refConf)}
              />
              {errors[item.name] && item.errorMessage}
            </div>
          );
        })}
      {/* {configIsValid(config) &&
        config.map((item, idx) => {
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '16px',
              }}>
              <InputFieldType
                config={item}
                //   onChange={val => console.log('onOnCnage...', val)}
                key={idx}
                register={register}
                reset={reset}
                errors={errors}
                setValue={setValue}
                defaultValues={preFormattedFormData}
                defaultValue={
                  preFormattedFormData
                    ? preFormattedFormData[item.fieldProps.name]
                    : null
                }
                //   inputRef={register(item.refConf)}
              />
              {errors[item.name] && item.errorMessage}
            </div>
          );
        })} */}
      <FormErrors errors={errors} />
      <Button
        variant="contained"
        disabled={posting}
        onClick={handleSubmit(onSubmit)}
        color="primary">
        {`${isNew ? 'create' : 'update'}: ${title ? title : 'Form'}`}
      </Button>
    </form>
  );
};

FormCreator.propTypes = {
  name: PropTypes.string,
  config: PropTypes.arrayOf(
    // PropTypes.shape({
    //   type: PropTypes.oneOf(['CheckboxText', 'CheckMultipleWithText']),
    //   key: PropTypes.string,
    // })
    PropTypes.instanceOf(InputFieldType)
  ),
};

export { FormCreator };
export default FormCreator;
