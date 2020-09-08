import useStyles from './useStyles';
import { Typography, Link } from '@material-ui/core';

import BankAccount from '../RenderInput/BankAccount';
import Date from '../RenderInput/Date';
import DateTime from '../RenderInput/DateTime';
import Email from '../RenderInput/Email';
import Phone from '../RenderInput/Phone';
import String from '../RenderInput/String';
import StyledInput from '../RenderInput/StyledInput';

const RenderInputExamples = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}>
      <div
        style={{
          width: '100%',
        }}>
        <Typography gutterBottom>
          For more fieldProps visit{' '}
          <Link
            href="https://material-ui.com/api/text-field/"
            onClick={e => e.preventDefault()}>
            https://material-ui.com/api/text-field/
          </Link>
        </Typography>
      </div>
      <BankAccount
        defaultValue={null}
        onChange={v => console.log(v)}
        fieldProps={{
          name: 'bankAccount',
          label: 'BankAccount',
        }}
      />
      <Date
        onChange={v => console.log(v)}
        fieldProps={{
          name: 'date',
          label: 'Date',
        }}
      />
      <DateTime
        onChange={v => console.log(v)}
        fieldProps={{
          name: 'dateTime',
          label: 'DateTime',
        }}
      />
      <Email
        onChange={v => console.log(v)}
        fieldProps={{
          name: 'email',
          label: 'Email',
        }}
      />
      <Phone
        onChange={v => console.log(v)}
        fieldProps={{
          name: 'phone',
          label: 'Phone',
        }}
      />
      <String
        onChange={v => console.log(v)}
        fieldProps={{
          name: 'string',
          label: 'String',
        }}
      />
      <String
        onChange={v => console.log(v)}
        fieldProps={{
          variant: 'filled',
          size: 'small',
          name: 'string',
          label: 'String filled',
        }}
      />
      <String
        onChange={v => console.log(v)}
        fieldProps={{
          variant: 'outlined',
          size: 'small',
          name: 'string',
          label: 'String outlined',
        }}
      />
      <String
        onChange={v => console.log(v)}
        fieldProps={{
          size: 'small',
          name: 'string',
          label: 'String fullWidth',
          fullWidth: true,
        }}
      />
      <String
        onChange={v => console.log(v)}
        fieldProps={{
          size: 'small',
          name: 'string',
          label: 'String multiline row:2 maxRow:5',
          multiline: true,
          rows: 2,
          rowsMax: 5,
        }}
      />
    </div>
  );
};

export { RenderInputExamples };
export default RenderInputExamples;
