import { useState } from 'react';
import {
  Fade,
  Zoom,
  Paper,
  Collapse,
  Typography,
  Chip,
} from '@material-ui/core';

import useEditStyles from './useEditStyles';
// Edits
import StringEdit from './String';
import IntEdit from './Int';
import DateEdit from './Date';
import BooleanEdit from './Boolean';
import MoneyEdit from './Money';
import SelectOneEnumEdit from './SelectOneEnum';
import SelectMultipleEnumEdit from './SelectMultipleEnum';

/**
 * case String ✔️
 * case Email
 * case CheckReason
 * case CheckboxText
 * case SelectOneWithText
 * case CheckMultipleWithText
 * case Entity
 * case SelectMultipleEnum
 * case SelectOneEnum
 * case Location
 * case Boolean
 * case Checkbox
 * case Money
 * case BankAccount
 * case Phone
 * case Int ✔️
 * case Float
 * case Date
 * case DateTime
 * case AcceptTerms
 * case Info
 * case File
 * case Signature
 * case Image
 */

const EditableDisplayEdit = ({ item, onChange }) => {
  const { type, key, value, label, fieldProps } = item;

  const TypeToRender = () => {
    switch (type) {
      case 'String':
        return <StringEdit item={item} onChange={onChange} />;
      case 'Int':
        return <IntEdit item={item} onChange={onChange} />;
      case 'Date':
        return <DateEdit item={item} onChange={onChange} />;
      case 'DateTime':
        return <DateEdit item={item} onChange={onChange} />;
      case 'Boolean':
        return <BooleanEdit item={item} onChange={onChange} />;
      case 'Money':
        return <MoneyEdit item={item} onChange={onChange} />;
      case 'SelectOneEnum':
        return <SelectOneEnumEdit item={item} onChange={onChange} />;
      case 'SelectMultipleEnum':
        return <SelectMultipleEnumEdit item={item} onChange={onChange} />;

      default:
        return <div>Cannot render type: {type}</div>;
    }
  };
  return <div>{TypeToRender()}</div>;
};

// use react transition or something. then instead of this component being excluded when not editing just close the good old fade yea.
const EditableDisplayWithControls = props => {
  const handleOnChange = value => props.onChange(value);

  return (
    <div>
      <EditableDisplayEdit {...props} onChange={handleOnChange} />
    </div>
  );
};

export default EditableDisplayWithControls;
