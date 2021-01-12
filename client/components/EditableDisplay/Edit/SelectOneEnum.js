import { TextField } from '@material-ui/core';
import EnumSelectOption from '@/Components/Inputs/EnumSelectOption';

const SelectOneEnumEdit = ({ item, onChange }) => {
  return (
    <div>
      <EnumSelectOption
        __type={item.__type}
        id={`${item.key}-select-one-enum-edit-field`}
        label={item.label}
        variant="standard"
        color="primary"
        defaultValue={item.value}
        handleChange={value => onChange(value)}
      />
    </div>
  );
};

export default SelectOneEnumEdit;
