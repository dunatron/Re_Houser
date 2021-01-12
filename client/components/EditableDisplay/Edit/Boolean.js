import { TextField } from '@material-ui/core';
import BooleanInput from '@/Components/Inputs/Boolean';

// name,
// label,
// helperText,
// defaultChecked,
// handleChange,
const BooleanEdit = ({ item, onChange }) => {
  return (
    <div>
      <BooleanInput
        name={item.key}
        id={`${item.key}-boolean-edit-field`}
        label={item.label}
        variant="standard"
        color="primary"
        defaultChecked={item.value}
        handleChange={thruthly => onChange(thruthly)}
      />
    </div>
  );
};

export default BooleanEdit;
