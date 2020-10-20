import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  INSULATION_FORM_QUERY,
  SINGLE_OWNER_PROPERTY_QUERY,
} from '@/Gql/queries';
import {
  UPDATE_INSULATION_FORM_MUTATION,
  UPDATE_PROPERTY_MUTATION,
} from '@/Gql/mutations';

import FormCreator from '@/Components/Forms/FormCreator';
import { INSULATION_STATEMENT_FORM_CONF } from '@/Lib/configs/insulationStatementForm';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Typography, IconButton, CircularProgress } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@/Components/Modal';
import { toast } from 'react-toastify';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Error from '@/Components/ErrorMessage';
import FileUploader from '@/Components/FileUploader';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const InsulationStatementForm = ({
  insulationFormId,
  propertyId,
  placeId,
  property,
  recieveFile,
}) => {
  const classes = useStyles();
  const [open, setIsOpen] = useState(false);

  const [loadForm, { called, loading, data }] = useLazyQuery(
    INSULATION_FORM_QUERY,
    {
      variables: {
        where: {
          id: insulationFormId,
        },
      },
      // onCompleted: handleLazyComplete,
      fetchPolicy: 'network-only', // simply becaus emutation isnt updating lazyQuery. at very least should retrigger network fetch
      partialRefetch: true,
    }
  );

  const [createInsulationForm, createInsulationFormProps] = useMutation(
    UPDATE_PROPERTY_MUTATION,
    {
      variables: {
        id: propertyId,
      },
      onCompleted: () => {
        toast.success(
          <p>
            <strong>Updated/Created insulationForm</strong>
          </p>
        );
        setIsOpen(false);
      },
      refetchQueries: [
        {
          query: SINGLE_OWNER_PROPERTY_QUERY,
          variables: {
            id: propertyId,
          },
        },
      ],
    }
  );

  const [updateInsulationForm, updateInsulationFormProps] = useMutation(
    UPDATE_INSULATION_FORM_MUTATION,
    {
      variables: {
        where: {
          id: insulationFormId,
        },
      },
      onCompleted: () => {
        toast.success(
          <p>
            <strong>Updated insulationForm</strong>
          </p>
        );
        setIsOpen(false);
      },
    }
  );

  const handleSubmittedData = data => {
    if (!insulationFormId) {
      createInsulationForm({
        variables: {
          id: propertyId,
          data: {
            insulationForm: insulationFormId
              ? {
                  update: {
                    ...data,
                  },
                }
              : {
                  create: {
                    ...data,
                  },
                },
          },
          refetchQueries: [
            {
              query: INSULATION_FORM_QUERY,
              variables: {
                where: {
                  id: insulationFormId,
                },
              },
            },
          ],
        },
      });
    } else {
      updateInsulationForm({
        variables: {
          data: {
            ...data,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (data && data.insulationForm && !loading) {
      setIsOpen(true);
    }
  }, [data, loading]);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: false,
  });

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'start',
      }}>
      <AssignmentIcon
        style={{
          margin: '16px 0 16px 16px',
        }}
      />
      {/* {called && 'Has been called'}
      {loading && 'Is loading lazy'} */}
      {/* {!insulationFormId && <AddIcon onClick={() => setIsOpen(true)} />} */}
      {!insulationFormId && (
        <div className={classes.wrapper}>
          <IconButton
            onClick={() => setIsOpen(true)}
            className={buttonClassname}
            color="secondary">
            <AddIcon />
          </IconButton>
          {/* <CircularProgress size={58} className={classes.fabProgress} /> */}
          {loading && (
            <CircularProgress size={58} className={classes.fabProgress} />
          )}
        </div>
      )}
      {insulationFormId && (
        // <IconButton onClick={() => (called ? setIsOpen(true) : loadForm())}>

        <div className={classes.wrapper}>
          <IconButton
            onClick={() => loadForm()}
            className={buttonClassname}
            color="secondary">
            <EditIcon />
          </IconButton>
          {/* <CircularProgress size={58} className={classes.fabProgress} /> */}
          {loading && (
            <CircularProgress size={58} className={classes.fabProgress} />
          )}
        </div>
      )}

      <Typography>Insulation Statement</Typography>
      {insulationFormId ? (
        <CheckIcon
          color={'primary'}
          style={{
            margin: '16px',
          }}
        />
      ) : (
        <CloseIcon
          color={'secondary'}
          style={{
            margin: '16px',
          }}
        />
      )}
      <Modal
        disableBackdrop={true}
        open={open}
        close={() => setIsOpen(false)}
        title={`${
          insulationFormId ? 'Edit' : 'Create'
        } INSULATION STATEMENT Form`}>
        <FormCreator
          forceFormUpdates={true}
          title="Insulation Form"
          data={data ? data.insulationForm : null}
          isNew={propertyId ? false : true}
          // posting={updateInsulationFormProps.loading}
          config={INSULATION_STATEMENT_FORM_CONF}
          // data={{ wallCoverage: null }}
          onSubmit={handleSubmittedData}
        />
        <Error error={createInsulationFormProps.error} />
        <Error error={updateInsulationFormProps.error} />
      </Modal>
      <FileUploader
        files={[property.insulationStatementFile]}
        fileParams={{
          folder: `properties/${placeId}/insulationStatementFile`,
          type: 'private',
        }}
        recieveFile={recieveFile}
      />
    </div>
  );
};

InsulationStatementForm.propTypes = {
  insulationFormId: PropTypes.any,
  placeId: PropTypes.any,
  property: PropTypes.shape({
    insulationStatementFile: PropTypes.any,
  }).isRequired,
  propertyId: PropTypes.any,
};

export { InsulationStatementForm };
export default InsulationStatementForm;
