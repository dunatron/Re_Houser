import { Typography, Chip } from '@material-ui/core';
import useViewStyles from './useViewStyles';
import { formatCentsToDollarsVal } from '@/Lib/formatCentsToDollars';
import { is } from 'ramda';

// Displays
import StringDisplay from './String';
import IntDisplay from './Int';
import BooleanDisplay from './Boolean';
import MoneyDisplay from './Money';
import SelectMultipleEnumDisplay from './SelectMultipleEnum';
import DateDisplay from './Date';
import DateTimeDisplay from './DateTime';
import BankAccountDisplay from './BankAcount';
import RichTextDisplay from './RichText';

/**
 * case String ✔️
 * case Email
 * case CheckReason
 * case CheckboxText
 * case SelectOneWithText
 * case CheckMultipleWithText
 * case Entity
 * case SelectMultipleEnum ✔️
 * case SelectOneEnum ✔️
 * case Location
 * case Boolean ✔️
 * case Checkbox
 * case Money ✔️
 * case BankAccount
 * case Phone
 * case Int ✔️
 * case Float
 * case Date ✔️
 * case DateTime ✔️
 * case AcceptTerms
 * case Info
 * case File
 * case Signature
 * case Image
 */

const ViewValue = ({ item }) => {
  const { type, key, value, label, fieldProps } = item;
  const classes = useViewStyles();
  const TypeToRender = () => {
    switch (type) {
      case 'String':
        return <StringDisplay item={item} />;
      case 'Int':
        return <IntDisplay item={item} />;
      case 'Boolean':
        return <BooleanDisplay item={item} />;
      case 'Date':
        return <DateDisplay item={item} />;
      case 'DateTime':
        return <DateTimeDisplay item={item} />;
      case 'Money':
        return <MoneyDisplay item={item} />;
      case 'BankAccount':
        return <BankAccountDisplay item={item} />;
      case 'SelectOneEnum':
        return <StringDisplay item={item} />;
      case 'SelectMultipleEnum':
        return <SelectMultipleEnumDisplay item={item} />;
      case 'RichText':
        return <RichTextDisplay />;
      default:
        return <StringDisplay item={item} />;
    }
  };
  return <div>{TypeToRender()}</div>;
};

export default ViewValue;
