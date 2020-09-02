import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  INSULATION_FORM_QUERY,
  SINGLE_OWNER_PROPERTY_QUERY,
} from '../../../graphql/queries';
import {
  UPDATE_INSULATION_FORM_MUTATION,
  UPDATE_PROPERTY_MUTATION,
} from '../../../graphql/mutations';
import Errors from '../../ErrorMessage';

import FormCreator from '../FormCreator';
import { INSULATION_STATEMENT_FORM_CONF } from '../../../lib/configs/insulationStatementForm';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Paper,
  Typography,
  IconButton,
  CircularProgress,
  Button,
  Fab,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '../../Modal';
import { toast } from 'react-toastify';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import Error from '../../ErrorMessage';
import FileUploader from '../../FileUploader';

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
}) => {
  const classes = useStyles();
  const [open, setIsOpen] = useState(false);

  // const handleLazyComplete = async data => {
  //   await setIsOpen(true);
  // };

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

  // const { data, loading, error } = useQuery(SINGLE_OWNER_PROPERTY_QUERY, {
  //   variables: {
  //     id: id,
  //   },
  // });

  const [updateInsulationForm, updateInsulationFormProps] = useMutation(
    UPDATE_INSULATION_FORM_MUTATION,
    {
      variables: {
        // id: insulationFormId,
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
    // data;
    // if no insulationFormId then we will be needing to create on
    // if we have one we will simply update the form
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

    // if (!insulationFormId) {
    //   createInsulationForm({
    //     variables: {
    //       data: {
    //         insulationForm: {
    //           create: {
    //             ...data,
    //           },
    //         },
    //       },
    //       onCompleted: handleLazyComplete,
    //     },
    //   });
    // }
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
      {/* {property.insulationStatementFile && (
        <h1>WE HAVE insulation statement as a file</h1>
      )} */}

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
        recieveFile={() => {
          alert('ToDo: associated this file with property');
        }}
      />
    </div>
  );
};

export { InsulationStatementForm };
export default InsulationStatementForm;
