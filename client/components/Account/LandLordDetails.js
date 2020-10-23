import PropTypes from 'prop-types';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { isEmpty } from 'ramda';
import { useMutation } from '@apollo/client';

import { LANDLORD_USER_CONF } from '@/Lib/configs/landlordUserConf';
import RenderInput from '@/Components/RenderInput';

import { UPDATE_USER_MUTATION } from '@/Gql/mutations/index';

import DynamicCompletionIcon from './CompletionIcon';
import SaveButtonLoader from '@/Components/Loader/SaveButtonLoader';

import { _postFormatBankAccount } from '@/Components/Forms/formatters/formatBankAccount';

const useStyles = makeStyles(theme => ({
  inputGrid: {
    display: 'grid',
    gridGap: '32px',
    width: '100%',
    padding: '16px',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr 1fr ',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
    },
  },
  textField: {
    fontSize: '32px',
  },
  saveButtonContainer: {
    position: 'fixed',
    bottom: '16px',
    right: '16px',
    zIndex: 10,
  },
}));

const UserDetails = ({ me }) => {
  const classes = useStyles();
  const [updates, setUpdates] = useState({});
  const [updateUser, { error, loading }] = useMutation(UPDATE_USER_MUTATION);

  const saveToUpdates = (name, val) => {
    if (name === 'bankDetails') {
      setUpdates({
        ...updates,
        bankDetails: val
          ? {
              create: {
                ..._postFormatBankAccount(val),
              },
            }
          : {},
      });
    } else {
      setUpdates({ ...updates, [name]: val });
    }
  };

  const canSave = () => {
    if (isEmpty(updates)) return false;
    return true;
  };

  const _updateUser = async () => {
    updateUser({
      variables: {
        data: {
          ...updates,
        },
        where: {
          id: me.id,
        },
      },
    });
  };

  return (
    <div>
      {canSave() && (
        <div className={classes.saveButtonContainer}>
          <SaveButtonLoader
            loading={loading}
            onClick={() => {
              _updateUser();
            }}
          />
        </div>
      )}
      <div className={classes.inputGrid}>
        {LANDLORD_USER_CONF.map(item => {
          const { type, fieldProps } = item;
          if (!fieldProps) return 'No field props for config item';
          return (
            <div key={item.key}>
              <DynamicCompletionIcon val={me[item.variableName]} />
              <RenderInput
                type={type}
                fieldProps={fieldProps}
                defaultValue={me[fieldProps.name]}
                onChange={v => saveToUpdates(fieldProps.name, v)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

UserDetails.propTypes = {
  me: PropTypes.any,
};

export default UserDetails;
