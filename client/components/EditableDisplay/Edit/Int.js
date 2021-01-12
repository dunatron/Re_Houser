import TextInput from '@/Components/Inputs/TextInput';

const IntEdit = ({ item, onChange }) => {
  return (
    <div>
      <TextInput
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
