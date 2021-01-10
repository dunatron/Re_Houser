import { Chip } from '@material-ui/core';
import useViewStyles from './useViewStyles';

import RToolTip from '@/Styles/RToolTip';

const BankAccountDisplay = ({ item }) => {
  const classes = useViewStyles();

  const notValid = (
    <Chip
      className={classes.chip}
      size="small"
      label="Not a valid BankDetail __type"
    />
  );
  if (!item.value) return notValid;
  if (!item.value.__typename) return notValid;
  if (item.value.__typename !== 'BankDetail') return notValid;
  return (
    <div>
      <RToolTip title="Bank Number">
        <Chip
          className={classes.chip}
          size="small"
          label={item.value.bankNumber}
        />
      </RToolTip>
      -
      <RToolTip title="Branch Number">
        <Chip
          className={classes.chip}
          size="small"
          label={item.value.branchNumber}
        />
      </RToolTip>
      -
      <RToolTip title="Account Number">
        <Chip
          className={classes.chip}
          size="small"
          label={item.value.accountNumber}
        />
      </RToolTip>
      -
      <RToolTip title="Suffix">
        <Chip className={classes.chip} size="small" label={item.value.suffix} />
      </RToolTip>
    </div>
  );
};

export default BankAccountDisplay;
