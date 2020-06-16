import { useState } from 'react';
import { Typography, TextField } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { isEmpty, equals } from 'ramda';
import { useMutation } from '@apollo/client';

import { USER_PROFILE_CONF } from '../../lib/configs/userProfileConfig';

import { UPDATE_USER_MUTATION } from '../../graphql/mutations/index';

import DynamicCompletionIcon from './CompletionIcon';
import SaveButtonLoader from '../Loader/SaveButtonLoader';

const StyledInput = withStyles({
  root: {},
  formControl: {},
  label: {
    textTransform: 'uppercase',
    fontSize: '18px',
  },
  textField: {
    fontSize: '32px',
  },
})(TextField);

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

  const saveToUpdates = e => {
    setUpdates({ ...updates, [e.target.name]: e.target.value });
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
          return (
            <div>
              <DynamicCompletionIcon val={me[item.variableName]} />
              <StyledInput
                className={classes.textField}
                fullWidth={true}
                label={item.label}
                name={item.variableName}
                defaultValue={me[item.variableName]}
                helperText={me[item.variableName]}
                onChange={saveToUpdates}></StyledInput>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserDetails;
