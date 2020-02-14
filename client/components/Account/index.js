import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { isEmpty, equals } from 'ramda';
import styled from 'styled-components';

import { UPDATE_USER_MUTATION } from '../../graphql/mutations/index';
import { CURRENT_USER_QUERY } from '../../graphql/queries/index';
// configs
import { USER_PROFILE_CONF } from '../../lib/configs/userProfileConfig';
import { withStyles, makeStyles } from '@material-ui/core/styles';
// components
// swiping tabs
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// completion rating
import CompletionRating from './CompletionRating';
// CompletionIcon
import DynamicCompletionIcon from './CompletionIcon';
// PhotoIdentification
import PhotoIdentification from './PhotoIdentification';
// ProfilePhoto
import UploadProfilePhoto from './UploadProfilePhoto';
import TabContainer from './TabContainer';
// import TextInput from "../../styles/TextInput"
import TextField from '@material-ui/core/TextField';
// Credit card tab
import CreditCardTab from './CreditCardTab';
import SaveButtonLoader from '../Loader/SaveButtonLoader';

//Errors
import ErrorMessage from '../ErrorMessage';

// Icons
import EditIcon from '../../styles/icons/EditIcon';
import MoreIcon from '../../styles/icons/MoreIcon';
import DetailsIcon from '../../styles/icons/DetailsIcon';
import CameraIcon from '../../styles/icons/CameraIcon';

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
}));

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

const AccountComponent = () => {
  const classes = useStyles();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const user = useQuery(CURRENT_USER_QUERY);
  const [updateUser, updateUserProps] = useMutation(UPDATE_USER_MUTATION);

  // updates for user mutation
  const [updates, setUpdates] = useState({});

  const saveToUpdates = e => {
    setUpdates({ ...updates, [e.target.name]: e.target.value });
  };
  const _updateUser = async () => {
    const res = await updateUser({
      variables: {
        data: {
          ...updates,
        },
      },
    });
    if (res.data) {
      setUpdates({});
    }
    closeModal();
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const openModal = () => {
    setModalIsOpen(true);
  };
  const handleTabChange = (event, value) => {
    setTabIndex(value);
  };
  const handleChangeIndex = index => {
    setTabIndex(index);
  };
  const update = (cache, payload) => {};

  const canSave = () => {
    if (isEmpty(updates)) return false;
    return true;
  };

  if (user.loading) {
    return 'Loading';
  }
  if (user.error) {
    return 'error: ToDo: use error component';
  }
  const me = user.data.me;
  if (!me) return null;
  return (
    <div>
      {canSave() && (
        <div
          style={{
            position: 'fixed',
            bottom: '16px',
            right: '16px',
            zIndex: 10,
          }}>
          <SaveButtonLoader
            loading={updateUserProps.loading}
            onClick={() => {
              _updateUser();
            }}
          />
        </div>
      )}

      <CompletionRating me={me} />
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth">
        <Tab label="Personal Details" icon={<DetailsIcon />} />
        <Tab label="Photo Identification" icon={<CameraIcon />} />
        <Tab label="Profile Photo" icon={<CameraIcon />} />
        <Tab label="Extras" icon={<MoreIcon />} />
      </Tabs>
      <SwipeableViews index={tabIndex} onChangeIndex={handleChangeIndex}>
        <TabContainer>
          <h4>UserID => {me.id}</h4>
          <ErrorMessage error={updateUserProps.error} />
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
                    // value={me[item.variableName]}
                    defaultValue={me[item.variableName]}
                    onChange={saveToUpdates}></StyledInput>
                </div>
              );
            })}
          </div>
        </TabContainer>
        <TabContainer
          containerStyles={{
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
          <PhotoIdentification
            me={me}
            updateVariable={(name, val) => {
              setUpdates({
                ...updates,
                [name]: val,
              });
            }}
          />
        </TabContainer>
        <TabContainer
          containerStyles={{
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
          <UploadProfilePhoto me={me} />
        </TabContainer>
        <TabContainer>
          <CreditCardTab me={me} />
        </TabContainer>
      </SwipeableViews>
    </div>
  );
};

export default AccountComponent;
