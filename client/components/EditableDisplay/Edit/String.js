// import { TextField } from '@material-ui/core';
import TextInput from '@/Components/Inputs/TextInput';

const StringEdit = ({ item, onChange }) => {
  return (
    <div>
      <TextInput
        id={`${item.key}-string-edit-field`}
        label={item.label}
        variant="standard"
        color="primary"
        defaultValue={item.value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

export default StringEdit;
