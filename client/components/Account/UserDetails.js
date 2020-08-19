import { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { isEmpty, equals } from 'ramda';
import { useMutation } from '@apollo/client';

import { USER_PROFILE_CONF } from '../../lib/configs/userProfileConfig';
import RenderInput from '../../components/RenderInput';

import { UPDATE_USER_MUTATION } from '../../graphql/mutations/index';

import DynamicCompletionIcon from './CompletionIcon';
import SaveButtonLoader from '../Loader/SaveButtonLoader';

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
    setUpdates({ ...updates, [name]: val });
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
        {USER_PROFILE_CONF.map(item => {
          const { type, fieldProps } = item;
          if (!fieldProps) return 'No field props for config item';
          return (
            <div>
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

export default UserDetails;
