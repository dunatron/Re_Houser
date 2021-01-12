/**
 * The idea is that we will recieve a type, and value and we will display it in a nice format for its type. Perhaps a grid system.
 * - render display value
 * - open a modal with the value in an editable field
 * - when a value change is detected render a save button
 * - can we pass in a mutation query? like updateProperty? then each field can have an onSave?
 * - needs to handlePermissions if they are set. two types editPermissions, displayPermissions, permssions. if permissions apply to both
 */
import { useState, useEffect } from 'react';

import {
  Collapse,
  Fade,
  Typography,
  ButtonGroup,
  IconButton,
  Button,
  Divider,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';

import clsx from 'clsx';

// icons
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';

import Error from '@/Components/ErrorMessage';

import ViewValue from './ViewValue';
import EditValue from './Edit';

import getMutation from './getMutation';
import useStyles from './useStyles';

import SaveButtonLoader from '@/Components/Loader/SaveButtonLoader';

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

  const handleReset = () =>
    setState({ ...state, updateVal: state.originalVal });

  const _canSave = () => {
    state.updateVal !== null && state.editing;
    if (state.updateVal === null) return false;
    if (state.updateVal === state.originalVal) return false;
    if (state.editing) return true;
  };

  const canSave = _canSave();

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

  const editableDisplayClasses = clsx(
    classes.editableDisplay,
    state.editing && classes.isEditing
  );

  const displayHeaderClasses = clsx(
    classes.displayHeader,
    state.editing && classes.displayHeaderEditing
  );

  const headerActionClasses = clsx(
    classes.headerActions,
    state.editing && classes.headerActionsEditing
  );

  return (
    <div className={editableDisplayClasses}>
      <div className={displayHeaderClasses}>
        <Typography variant="body1">{label}</Typography>
        <div className={headerActionClasses}>
          {canSave && (
            <SaveButtonLoader
              size="small"
              loading={saveProps.loading}
              onClick={handleSaveButtonClick}
            />
          )}
          {canSave && (
            <IconButton size="small" onClick={handleReset}>
              <UndoIcon fontSize="small" />
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
        <ButtonGroup
          style={{ marginBottom: '16px' }}
          disabled={saveProps.loading}
          color="secondary"
          aria-label="outlined secondary button group">
          {canSave && <Button onClick={handleSaveButtonClick}>Save</Button>}
          {canSave && <Button onClick={handleReset}>Reset</Button>}
          <Button onClick={closeEditng}>Stop Editing</Button>
        </ButtonGroup>
      </Collapse>
      <Error error={saveProps.error} />
    </div>
  );
};

export default EditableDisplay;
