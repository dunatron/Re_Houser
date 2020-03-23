import TextInput from './TextInput';
import SwitchInput from './SwitchInput';
import DateInput from './DateInput';

// const setAndFormatMoveInDate = date => {
//   setMoveInDate(date);
//   setMoveInDateStamp(moment(date).unix());
// };

const InputFieldType = props => {
  const { onChange } = props;
  switch (props.fieldConf.type) {
    case 'String':
      // return <TextInput {...props} onChange={e => onChange(e.target.value)} />;
      return <TextInput {...props} onChange={e => onChange(e.target.value)} />;
    case 'Boolean':
      return (
        <SwitchInput {...props} onChange={e => onChange(e.target.checked)} />
      );
    case 'Int':
      return (
        <TextInput
          type="number"
          {...props}
          onChange={e => onChange(parseInt(e.target.value))}
        />
      );
    case 'Float':
      return (
        <TextInput
          type="number"
          {...props}
          onChange={e => onChange(parseFloat(e.target.value))}
        />
      );
    case 'DateTime':
      //onChange={date => setAndFormatMoveInDate(date)}
      return (
        // <DateInput {...props} onChange={date => setAndFormatMoveInDate(date)} />
        // <DateInput onChange={date => setAndFormatMoveInDate(date)} />
        <DateInput
          //   {...props}
          value={props.value}
          onChange={date => {
            console.log('InputFieldType DateTime update => ', date);
            onChange(date);
          }}
        />
      );
    default:
      return <TextInput {...props} onChange={e => onChange(e.target.value)} />;
  }
};
export default InputFieldType;
