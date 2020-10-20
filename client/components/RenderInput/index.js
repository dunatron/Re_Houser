import PropTypes from "prop-types";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';

const StyledInput = withStyles({
  root: {},
  formControl: {},
  label: {
    textTransform: 'uppercase',
    fontSize: '18px',
  },
  textField: {
    fontSize: '32px',
  },
})(TextField);

// Inputs
import String from './String';
import Email from './Email';
import Phone from './Phone';
import Date from './Date';
import DateTime from './DateTime';
import BankAccount from './BankAccount';

const RenderInput = ({ type, fieldProps, defaultValue, onChange }) => {
  const handleFieldChange = value => {
    // cal props onChange onChange
    onChange(value);
  };

  switch (type) {
    case 'Email':
      return (
        <Email
          fieldProps={fieldProps}
          defaultValue={defaultValue}
          onChange={handleFieldChange}
        />
      );
    case 'String':
      return (
        <String
          fieldProps={fieldProps}
          defaultValue={defaultValue}
          onChange={handleFieldChange}
        />
      );
    case 'Phone':
      return (
        <Phone
          fieldProps={fieldProps}
          defaultValue={defaultValue}
          onChange={handleFieldChange}
        />
      );
    case 'Date':
      return (
        <Date
          fieldProps={fieldProps}
          defaultValue={defaultValue}
          onChange={handleFieldChange}
        />
      );
    case 'DateTime':
      return (
        <DateTime
          fieldProps={fieldProps}
          defaultValue={defaultValue}
          onChange={handleFieldChange}
        />
      );
    case 'BankAccount':
      return (
        <BankAccount
          fieldProps={fieldProps}
          defaultValue={defaultValue}
          onChange={handleFieldChange}
        />
      );

    default:
      return (
        <Typography>
          This Item has no type for RenderInput for type {type}
        </Typography>
      );
  }
};

RenderInput.propTypes = {
  defaultValue: PropTypes.any,
  fieldProps: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.any
}

export default RenderInput;
