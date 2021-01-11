import { TextField } from '@material-ui/core';

const StringEdit = ({ item, onChange }) => {
  return (
    <div>
      <TextField
        id="filled-secondary"
        label="Filled secondary"
        variant="filled"
        color="secondary"
        defaultValue={item.value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

export default StringEdit;
