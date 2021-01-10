/**
 * The idea is that we will recieve a type, and value and we will display it in a nice format for its type. Perhaps a grid system.
 * - render display value
 * - open a modal with the value in an editable field
 * - when a value change is detected render a save button
 * - can we pass in a mutation query? like updateProperty? then each field can have an onSave?
 * - needs to handlePermissions if they are set. two types editPermissions, displayPermissions, permssions. if permissions apply to both
 */

/**
 * case String
 * case Email
 * case CheckReason
 * case CheckboxText
 * case SelectOneWithText
 * case CheckMultipleWithText
 * case Entity
 * case SelectMultipleEnum
 * case SelectOneEnum
 * case Location
 * case Boolean
 * case Checkbox
 * case Money
 * case BankAccount
 * case Phone
 * case Int
 * case Float
 * case Date
 * case DateTime
 * case AcceptTerms
 * case Info
 * case File
 * case Signature
 * case Image
 */

// fieldProps: {
//     label: 'Email ',
//     name: 'email',
//     variant: 'standard',
//   },

import { useState } from 'react';
import ViewValue from './ViewValue';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { Typography, IconButton } from '@material-ui/core';

const EditableDisplay = ({ item }) => {
  // item props
  const {
    type,
    key,
    value,
    fieldProps,
    label,
    editable = true,
    permissions,
    displayPermssions,
    editPermssions,
  } = item;

  // component state
  const [state, setState] = useState({
    editing: false,
  });

  // state functions
  const openEditing = () => setState({ ...state, editing: true });
  const closeEditng = () => setState({ ...state, editing: false });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '16px',
      }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1">{label}</Typography>
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
      {!state.editing && <ViewValue item={item} />}
      {state.editing && (
        <Typography>ToDo: Edit components for displays</Typography>
      )}
    </div>
  );
};

export default EditableDisplay;
