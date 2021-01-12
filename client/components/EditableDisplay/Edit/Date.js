import { TextField } from '@material-ui/core';
import DatePicker from '@/Components/Pickers/DatePicker';

const DateEdit = ({ item, onChange }) => {
  const { fieldProps } = item;
  return (
    <div>
      <DatePicker
        // inputVariant={fieldProps.variant ? fieldProps.variant : 'outlined'}
        label={item.label}
        value={item.value}
        format="YYYY-MM-DDTkk:mm" // Umm you need to have it output unfortuanetely. The format matters. Look into a display vs val format
        minDate={fieldProps.minDate}
        maxDate={fieldProps.maxDate}
        inputProps={{
          name: item.key,
          id: `${item.key}-date-edit-field`,
        }}
        // error={fieldError ? true : false}
        // helperText={fieldError}
        onChange={onChange}
      />
    </div>
  );
};

export default DateEdit;
