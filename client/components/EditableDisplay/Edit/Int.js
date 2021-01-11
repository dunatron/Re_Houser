import { TextField } from '@material-ui/core';

const IntEdit = ({ item, onChange }) => {
  return (
    <div>
      <TextField
        id={`${item.key}-int-edit-field`}
        type="number"
        label={item.label}
        variant="standard"
        color="primary"
        defaultValue={item.value}
        onChange={e => onChange(parseInt(e.target.value))}
      />
    </div>
  );
};

export default IntEdit;
