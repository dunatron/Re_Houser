import React from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../../Inputs/TextInput';
import InputFieldType from '../InputFieldType/index';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import FormErrors from '../FormErrors';
import FIELDS_CONFIG from './fieldsConf';

const _formatInsulationData = data => {
  console.log('How to best format the data...');

  // you need to format values that would not fit the gql PrimitiveType
  const formattedData = {
    // ...data.filter(dItem => dItem !== null),
    ...data.filter,
    meetsMinCeilingReq: data['meetsMinCeilingReq'] === 'Yes' ? true : false,
    meetsMinUnderfloorReq:
      data['meetsMinUnderfloorReq'] === 'Yes' ? true : false,
    // meetsMinCeilingReqReason: data['meetsMinCeilingReqReason']
    //   ? data['meetsMinCeilingReqReason']
    //   : null,
  };

  console.log('Formatted Data => ', formattedData);

  return formattedData;
};

const _preFormatCheckReason = () => {};

const _formatCheckReason = val => {
  // console.log('_formatCheckReason => ', val);
  // if (val === undefined) return null;
  // if (val === undefined) return null;
  // if (!val) return null;
  if (val === true) return 'Yes';
  if (val === false) return 'No';
  return val;
};

// this needs to take to data from an InsulationFrom object in the backend and transform it to nice values
const _formatPrismaData = data => {
  const filtered = Object.entries(data).reduce(
    (a, [k, v]) => (v == null ? a : { ...a, [k]: v }),
    {}
  );

  console.log('_formatPrismaData filteredData => ', filtered);
  return {
    ...filtered,
    meetsMinCeilingReq: _formatCheckReason(
      data ? data['meetsMinCeilingReq'] : null
    ),
    meetsMinUnderfloorReq: _formatCheckReason(
      data ? data['meetsMinUnderfloorReq'] : null
    ),
  };
  return {};
};

const InsulationStatementForm = props => {
  const { data } = props;

  const formattedToFormData = _formatPrismaData(data);

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      // firstName: 'bill',
      // lastName: 'luo',
      // email: 'bluebill1049@hotmail.com',
      // pets: ['dog', 'cat'],
      ...formattedToFormData,
    },
  }); // initalise the hook
  const onSubmit = data => {
    console.log('InsulationStatementForm onSubmit data => ', data);
    const formattedData = _formatInsulationData(data);
    props.onSubmit(formattedData);
  }; // submission when input are valid

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <form onSubmit={handleSubmit(onSubmit)}>
      {FIELDS_CONFIG.map((item, idx) => {
        return (
          <div
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
              defaultValues={formattedToFormData}
              defaultValue={
                formattedToFormData
                  ? formattedToFormData[item.fieldProps.name]
                  : null
              }
              //   inputRef={register(item.refConf)}
            />
            {errors[item.name] && item.errorMessage}
          </div>
        );
      })}
      <FormErrors errors={errors} />
      {/* <Button type="submit" variant="outlined">
        SUbmit Insulation STatement
      </Button> */}
      <Button
        variant="contained"
        onClick={handleSubmit(onSubmit)}
        color="primary">
        Submit Insulation STatement
      </Button>
      {/* <Button
        variant="outlined"
        onClick={() => props.onSubmit({ test: 'ahahahaha' })}>
        Submit Insulation STatement
      </Button> */}
    </form>
  );
};

export { InsulationStatementForm };
export default InsulationStatementForm;
