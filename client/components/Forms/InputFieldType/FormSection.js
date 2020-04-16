import { Paper } from '@material-ui/core';
import InputFieldType from './index';

const FormSection = props => {
  const {
    register,
    config,
    errors,
    errorMessage,
    setValue,
    reset,
    defaultValue,
  } = props;
  const { type, inners, fieldProps, refConf } = config;
  const { name, label } = fieldProps;
  const { options } = fieldProps;
  console.log('CHeck Paper props bro => ', props);
  return (
    <Paper style={{ padding: '8px' }}>
      <h1>Check FormSection</h1>
      {inners &&
        inners.map((inner, idx) => {
          return (
            <InputFieldType
              {...props}
              config={inner}
              key={idx}
              register={register}
              errors={errors}
            />
          );
        })}
      {/* <h1>
        Inners not quite rsolving u see. Types dont get the keys and resolve to
        correct type yet
      </h1> */}
      {/* Umm is this not input field types? map inners  */}
      {/* <InputFieldType
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
      /> */}
      {/* <InputFieldType
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
                /> */}
      {/* {inners &&
        inners.map((inner, idx) => {
          return (
            <InputFieldType
              {...props}
              config={inner}
              key={idx}
              register={register}
              errors={errors}
            />
          );
        })} */}
    </Paper>
  );
};

export default FormSection;

// const _preFormatCheckedOptions = (options, values) => {
//   const valuesAsKeys = values
//     ? values.reduce((obj, key) => {
//         obj[key] = true;
//         return obj;
//       }, {})
//     : {};
//   return valuesAsKeys;
// };

// const CheckMultipleWithText = props => {
//   const {
//     register,
//     config,
//     errors,
//     errorMessage,
//     setValue,
//     reset,
//     defaultValue,
//   } = props;

//   console.log('Well wtf cunt', props);
//   const { type, inners, fieldProps, refConf } = config;
//   const { name, label } = fieldProps;
//   const { options } = fieldProps;

//   // const [state, setState] = useState({ PARTIAL: true });
//   const [state, setState] = useState(
//     _preFormatCheckedOptions(options, defaultValue)
//   );

//   const handleChange = (event, optName) => {
//     setState({ ...state, [optName]: event.target.checked });
//   };

//   const canDisplayInner = (opt, inner) => {
//     const optionsStateValue = state[opt.name] ? state[opt.name] : false;
//     const validInnerForOpt = inner.showOn.values.includes(opt.name);
//     if (optionsStateValue && validInnerForOpt) return true;
//     return false;
//   };

//   return (
//     <FormControl component="fieldset">
//       <FormLabel component="legend">{label}</FormLabel>
//       <FieldError errors={errors} name={name} />
//       <FormGroup>
//         {options &&
//           options.map((opt, i) => (
//             <div key={i}>
//               <FormControlLabel
//                 value={opt.name}
//                 control={
//                   <Checkbox
//                     checked={state[opt.name] ? state[opt.name] : false}
//                     onChange={e => handleChange(e, opt.name)}
//                     inputRef={register ? register(refConf) : null}
//                     name={name}
//                   />
//                 }
//                 label={opt.label}
//               />
//               {inners &&
//                 inners.map((inner, idx) => {
//                   if (!canDisplayInner(opt, inner)) return null;
//                   return (
//                     <InputFieldType
//                       config={inner}
//                       key={idx}
//                       register={register}
//                       errors={errors}
//                     />
//                   );
//                 })}
//             </div>
//           ))}
//       </FormGroup>
//     </FormControl>
//   );
// };

// export default CheckMultipleWithText;
