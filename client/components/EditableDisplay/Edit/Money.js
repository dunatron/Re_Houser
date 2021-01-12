import MoneyInput from '@/Components/Inputs/MoneyInput';

const MoneyEdit = ({ item, onChange }) => {
  return (
    <div>
      <MoneyInput
        id={`${item.key}-money-edit-field`}
        label={item.label}
        defaultValue={item.value ? item.value / 100 : null}
        fieldProps={item.fieldProps}
        onChange={e => onChange(parseFloat(e.target.value * 100))}
      />
    </div>
  );
};

export default MoneyEdit;
