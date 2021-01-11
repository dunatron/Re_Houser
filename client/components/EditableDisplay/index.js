/**
 * The idea is that we will recieve a type, and value and we will display it in a nice format for its type. Perhaps a grid system.
 * - render display value
 * - open a modal with the value in an editable field
 * - when a value change is detected render a save button
 * - can we pass in a mutation query? like updateProperty? then each field can have an onSave?
 * - needs to handlePermissions if they are set. two types editPermissions, displayPermissions, permssions. if permissions apply to both
 */
import { useState, useEffect } from 'react';

import { Collapse, Fade, Typography, IconButton } from '@material-ui/core';
import { useMutation } from '@apollo/client';

// icons
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

import Error from '@/Components/ErrorMessage';

import ViewValue from './ViewValue';
import EditValue from './Edit';

import getMutation from './getMutation';
import useStyles from './useStyles';

const EditableDisplay = ({ item }) => {
  // item props
  const {
    type,
    __typename = 'Property', // e.g Property
    where,
    key,
    value,
    fieldProps,
    label,
    editable = true,
    permissions,
    displayPermssions,
    editPermssions,
  } = item;
  const classes = useStyles();

  // mutation
  const EDITABLE_DISPLAY_MUTATION = getMutation(__typename, key);

  // state
  const [state, setState] = useState({
    editing: false,
    originalVal: item.value,
    updateVal: null,
  });

  useEffect(() => {
    if (value !== state.originalVal) {
      setState({
        ...state,
        originalVal: value,
      });
    }
    return () => {};
  }, [value]);

  const handleOnSaveCompleted = data =>
    setState({ ...state, editing: false, updateVal: null });

  const [save, saveProps] = useMutation(EDITABLE_DISPLAY_MUTATION, {
    onCompleted: handleOnSaveCompleted,
  });

  // state functions
  const openEditing = () => setState({ ...state, editing: true });
  const closeEditng = () => setState({ ...state, editing: false });

  const handleOnChange = value => setState({ ...state, updateVal: value });

  const handleSaveButtonClick = () =>
    save({
      variables: {
        data: {
          [key]: state.updateVal,
        },
        where: {
          ...where,
        },
      },
    });

  return (
    <div className={classes.editableDisplay}>
      <div className={classes.displayHeader}>
        <Typography variant="body1">{label}</Typography>
        {saveProps.loading && <div>Saving</div>}
        {state.updateVal !== null && state.editing && (
          <IconButton size="small" onClick={handleSaveButtonClick}>
            <SaveIcon fontSize="small" />
          </IconButton>
        )}
        {!state.editing && editable && (
          <IconButton size="small" onClick={openEditing}>
            <EditIcon fontSize="small" />
          </IconButton>
        )}
        {state.editing && (
          <IconButton size="small" onClick={closeEditng}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </div>
      <Collapse in={!state.editing}>
        <ViewValue item={item} />
      </Collapse>
      <Collapse in={state.editing}>
        <EditValue
          item={item}
          editing={state.editing}
          onChange={handleOnChange}
        />
      </Collapse>
      <Error error={saveProps.error} />
    </div>
  );
};


export default EditableDisplay;
