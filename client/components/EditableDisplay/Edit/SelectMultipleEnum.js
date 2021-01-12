import { TextField } from '@material-ui/core';
import EnumMultiSelectChip from '@/Components/Inputs/EnumMultiSelectChip';

const SelectOneEnumEdit = ({ item, onChange }) => {
  return (
    <div>
      <EnumMultiSelectChip
        __type={item.__type}
        values={item.value}
        id={`${item.key}-select-one-enum-edit-field`}
        label={item.label}
        variant="standard"
        color="primary"
        defaultValue={item.value}
        handleChange={value => onChange({ set: value })}
      />
    </div>
  );
};

export default SelectOneEnumEdit;
