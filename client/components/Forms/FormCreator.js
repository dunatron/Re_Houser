import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { isEmpty, is } from 'ramda';
import Errors from '../ErrorMessage';

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
  const { title, data, config, isNew, posting, error } = props;

  const keysWithTypes = getKeyTypes(config);
  const preFormattedFormData = formatData(data, keysWithTypes, 'pre');

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
    const postFormattedFormData = formatData(data, keysWithTypes, 'post');
    console.log('Well formatted Data => ', postFormattedFormData);
    props.onSubmit(postFormattedFormData);
  }; // submission when input are valid

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <>
      <Errors error={error} />
      <div>
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
                  defaultValues={preFormattedFormData}
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
        <Button
          variant="contained"
          disabled={posting}
          onClick={handleSubmit(onSubmit)}
          color="primary">
          {`${isNew ? 'create' : 'update'}: ${title ? title : 'Form'}`}
        </Button>
      </div>
    </>
  );
};

// const FormCreator = props => {
//   const { title, data, config, isNew, posting, error } = props;

//   const keysWithTypes = getKeyTypes(config);
//   const preFormattedFormData = formatData(data, keysWithTypes, 'pre');

//   //ToDo: we should have a way to see if the form has been touched
//   // maybe see if we can get recently updated values. that would potentially work better

//   const {
//     register,
//     handleSubmit,
//     errors,
//     setValue,
//     getValues,
//     reset,
//   } = useForm({
//     defaultValues: {
//       ...preFormattedFormData,
//     },
//   }); // initalise the hook
//   const onSubmit = data => {
//     const postFormattedFormData = formatData(data, keysWithTypes, 'post');
//     console.log('Well formatted Data => ', postFormattedFormData);
//     props.onSubmit(postFormattedFormData);
//   }; // submission when input are valid

//   return (
//     // <form onSubmit={handleSubmit(onSubmit)}>
//     <>
//       <Errors error={error} />
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {configIsValid(config) &&
//           config.map((item, idx) => {
//             return (
//               <div
//                 key={idx}
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   marginTop: '16px',
//                 }}>
//                 <InputFieldType
//                   config={item}
//                   key={idx}
//                   register={register}
//                   reset={reset}
//                   errors={errors}
//                   setValue={setValue}
//                   defaultValues={preFormattedFormData}
//                   defaultValue={
//                     configIsValid(config)
//                       ? preFormattedFormData[
//                           item.fieldProps ? item.fieldProps.name : null
//                         ]
//                       : null
//                   }
//                 />
//                 {errors[item.name] && item.errorMessage}
//               </div>
//             );
//           })}
//         <FormErrors errors={errors} />
//         <Button
//           variant="contained"
//           disabled={posting}
//           onClick={handleSubmit(onSubmit)}
//           color="primary">
//           {`${isNew ? 'create' : 'update'}: ${title ? title : 'Form'}`}
//         </Button>
//       </form>
//     </>
//   );
// };

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
