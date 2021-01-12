import { TextField } from '@material-ui/core';

const StringEdit = ({ item, onChange }) => {
  return (
    <div>
      <TextField
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
