import { useState } from 'react';
import { isEmpty, equals } from 'ramda';
import { useMutation } from '@apollo/client';
import {
  FormControlLabel,
  Switch,
  Button,
  Typography,
  Chip,
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import SaveButtonLoader from '../components/Loader/SaveButtonLoader';
// mutation
import { UPDATE_USER_MUTATION } from '../graphql/mutations';

//icons
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

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

const AdminSettings = ({ me }) => {
  const classes = useStyles();
  const { adminSettings } = me;
  var originalSettings = {
    ...adminSettings,
  };
  delete originalSettings.__typename; // or delete person["age"];
  const [updates, setUpdates] = useState({});
  const [originalValues, setOriginalValues] = useState(originalSettings);
  console.log('Admin Settings me => ', me);

  const saveToUpdates = e => {
    setUpdates({ ...updates, [e.target.name]: e.target.checked });
  };

  const handleOnCompleted = data => {
    setUpdates({});
  };

  const [updateUser, { loading, error, data }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      onCompleted: handleOnCompleted,
      variables: {
        data: {
          adminSettings: adminSettings
            ? {
                update: {
                  ...updates,
                },
              }
            : {
                create: {
                  ...updates,
                },
              },
        },
      },
    }
  );

  console.log('updateUser data => ', data);

  const handleChange = e => {
    console.log('e => ', e);
    console.log('e.target.checked => ', e.target.checked);
    console.log('E.name => ', e.name);
    console.log('E.target.name => ', e.target.name);
    setState({
      ...state,
      [e.target.name]: e.target.checked,
    });
  };

  const canSave = () => {
    if (isEmpty(updates)) return false;
    console.log('original Values => ', originalValues);
    console.log('update Values => ', updates);
    if (equals(originalValues, updates)) return false;
    return true;
  };

  const items = [
    {
      label: 'Appraisal Created Subscription',
      name: 'appraisalCreatedSub',
      subtitle: 'Subscribe to new rental appraisals that get created',
    },
    {
      label: 'Property Created Subscription',
      name: 'propertyCreatedSub',
      subtitle: 'Subscribe to new rental properties that get added',
    },
    {
      label: 'Rental Application Created Subscription',
      name: 'rentalApplicationCreatedSub',
      subtitle: 'Subscribe to new rental applications that users create',
    },
    {
      label: 'Lease Created Subscription',
      name: 'leaseCreatedSub',
      subtitle:
        'Subscribe to new leases that get created when a landlord approves a rental application',
    },
  ];

  return (
    <div>
      {canSave() && (
        <div className={classes.saveButtonContainer}>
          <SaveButtonLoader loading={loading} onClick={() => updateUser()} />
        </div>
      )}
      {items &&
        items.map((item, idx) => (
          <div>
            {item.subtitle && (
              <Typography variant="subtitle1">{item.subtitle}</Typography>
            )}
            <FormControlLabel
              control={
                <Switch
                  // checked={state.appraisalCreatedSub}
                  defaultChecked={adminSettings[item.name]}
                  onChange={saveToUpdates}
                  name={item.name}
                  color="primary"
                />
              }
              label={item.label}
            />
            {adminSettings[item.name] === true ? (
              <Chip
                size="small"
                variant="outlined"
                icon={<NotificationsActiveIcon />}
                label="SUBSCRIBED"
                // clickable
                color="secondary"
              />
            ) : null}
          </div>
        ))}
      {/* <Typography variant="subtitle1">
        Subscribe to new rental appraisals that get created
      </Typography>
      <FormControlLabel
        control={
          <Switch
            // checked={state.appraisalCreatedSub}
            defaultChecked={adminSettings.appraisalCreatedSub}
            onChange={saveToUpdates}
            name="appraisalCreatedSub"
            color="primary"
          />
        }
        label="Appraisal Created Subscription"
      /> */}
    </div>
  );
};

export default AdminSettings;
