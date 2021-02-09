import React, { Component, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Alert from '@/Components/Alert';

import { makeStyles } from '@material-ui/core/styles';

import { InsulationStatementForm } from '@/Components/Forms/index';
import { SINGLE_OWNER_PROPERTY_QUERY } from '@/Gql/queries/index';

import Map from '@/Components/Map/index';
import CarouselSlider from '@/Components/CarouselSlider';
import DetailItem from '@/Components/PropertyCard/DetailItem';
import {
  IconButton,
  Button,
  Switch,
  Typography,
  Paper,
  ButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import RehouserPaper from '@/Styles/RehouserPaper';
import Card from '@/Styles/Card';
//icons
import CameraIcon from '@/Styles/icons/CameraIcon';
// Update variable components ToDo: move to own file
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import ChangeRouteButton from '@/Components/Routes/ChangeRouteButton';

import {
  NowToDate,
  LongDatePretty,
  LeaseLength,
} from '@/Components/LeaseManager/LeaseLengthInfo';

import UserDetails from '@/Components/UserDetails';
import PropertyPublicDetails from '@/Components/Property/PublicDetails';

import { FileInfoFragment } from '@/Gql/fragments/fileInfo';
import { PropertyInfoFragment } from '@/Gql/fragments/propertyInfo';
import DetailItems from './DetailItems';
import ImportantDetails from './ImportantDetails';
import PropertyImages from './Images';

import DynamicAddUserToList from '@/Components/User/DynamicAddUserToList';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DisplayJson from '../DisplayJson';

import SaveButtonLoader from '@/Components/Loader/SaveButtonLoader';
import EnumMultiSelectChip from '@/Components/Inputs/EnumMultiSelectChip';
import { isEmpty } from 'ramda';
import EditableDisplayItems from '@/Components/EditableDisplay/EditableDisplayItems';
import EditableDisplay from '@/Components/EditableDisplay';

import PROPERTY_DETAILS_EDITABLE_DISPLAY_CONF from '@/Lib/configs/editableDisplays/propertyDetails';
import Modal from '@/Components/Modal';
import ForeignLinksTable from '@/Components/Tables/ForeignLinksTable';

// icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  detailsWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(2),
  },
  detailItem: {
    padding: '0 16px 16px 0',
    display: 'flex',
    alignItems: 'center',
  },
  variablesHeader: {
    marginTop: '16px',
    marginLeft: '16px',
  },
  saveButtonContainer: {
    position: 'fixed',
    bottom: '16px',
    right: '16px',
    zIndex: 1200,
  },
}));

const Details = props => {
  const { property, isAdmin, me, isOwner, isAgent } = props;
  const classes = useStyles();

  const [updates, setUpdates] = useState({});
  const [publicDetailsModalIsOpen, setPublicDetailsModalIsOpen] = useState(
    false
  );

  const handleClosePublicDetailsModal = () =>
    setPublicDetailsModalIsOpen(false);
  const handleOpenPublicDetailsModal = () => setPublicDetailsModalIsOpen(true);

  const PROPERTY_SINGLE_PROPERTY_MUTATION = gql`
    mutation UPDATE_PROPERTY_MUTATION(
      $data: PropertyUpdateInput!
      $where: PropertyWhereUniqueInput!
    ) {
      updateProperty(data: $data, where: $where) {
        id
        images {
          ...fileInfo
        }
        ...propertyInfo
      }
    }
    ${PropertyInfoFragment}
    ${FileInfoFragment}
  `;
  const [updateProperty, updatePropertyPayload] = useMutation(
    PROPERTY_SINGLE_PROPERTY_MUTATION
  );

  const _submitUpdates = () => {};

  const handleAddOwner = result =>
    updateProperty({
      variables: {
        where: {
          id: property.id,
        },
        data: {
          owners: {
            connect: {
              id: result.id,
            },
          },
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateProperty: {
          __typename: 'Property',
          ...property,
          owners: [
            ...property.owners,
            {
              ...result,
              __typename: 'User',
            },
          ],
        },
      },
    });

  const handleRemoveOwner = result =>
    updateProperty({
      variables: {
        id: property.id,
        data: {
          owners: {
            disconnect: {
              id: result.id,
            },
          },
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateProperty: {
          __typename: 'Property',
          ...property,
          owners: property.owners.filter(a => a.id !== result.id),
        },
      },
    });

  const handleAddAgent = result =>
    updateProperty({
      variables: {
        where: {
          id: property.id,
        },
        data: {
          agents: {
            connect: {
              id: result.id,
            },
          },
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateProperty: {
          __typename: 'Property',
          ...property,
          agents: [
            ...property.agents, // there may not be agents already?
            {
              email: result.email ? result.email : '',
              firstName: result.firstName
                ? `Adding agent ${result.firstName}`
                : 'Adding Agent',
              id: result.id ? result.id : '',
              lastName: result.lastName ? result.lastName : '',
              phone: result.phone ? result.phone : '',
              profilePhoto: result.profilePhoto ? result.profilePhoto : '',
              rehouserStamp: result.rehouserStamp ? result.rehouserStamp : '',
              __typename: 'User',
            },
          ],
        },
      },
    });

  const handleRemoveAgent = result =>
    updateProperty({
      variables: {
        where: {
          id: property.id,
        },
        data: {
          agents: {
            disconnect: {
              id: result.id,
            },
          },
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateProperty: {
          __typename: 'Property',
          ...property,
          agents: property.agents.filter(a => a.id !== result.id),
        },
      },
    });

  return (
    <div>
      {!isEmpty(updates) && (
        <div className={classes.saveButtonContainer}>
          <SaveButtonLoader
            loading={updatePropertyPayload.loading}
            onClick={() => {
              _submitUpdates();
            }}
          />
        </div>
      )}
      {isOwner && (
        <RehouserPaper attrs={{ disablePadding: true }}>
          <Alert>
            <Typography gutterBottom variant="h6">
              You are an owner of the Property
            </Typography>
            {property.rehouserManaged && (
              <Typography gutterBottom variant="body2">
                The Property is now managed by Rehouser at this point. You will
                recieve updates from us along the way allowing you to see the
                progress of your property
              </Typography>
            )}
          </Alert>
        </RehouserPaper>
      )}
      {me.isWizard && (
        <RehouserPaper attrs={{ disablePadding: true }}>
          <Alert severity="info">
            <Typography gutterBottom variant="h6">
              You are A Wizard
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              style={{ whiteSpace: 'pre-line' }}>
              As A Wizard you will need to add an "Agent" against this property
              for it to be managed. An agent acts for rehouser on behalf of the
              property owner {'\n'}
              {'\n'}
              Agents on property: {property.agents.length}
            </Typography>
            <Button
              aria-label="read-more"
              href="#agent-section"
              endIcon={<ArrowDownwardIcon fontSize="large" />}
              color="secondary">
              Add Agents
            </Button>
          </Alert>
        </RehouserPaper>
      )}
      {me.isAgent ||
        (me.isWizard && (
          <DisplayJson
            title="Show property properties"
            json={property}></DisplayJson>
        ))}

      <RehouserPaper>
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group">
          <Button onClick={handleOpenPublicDetailsModal}>
            View Public Details
          </Button>
          {isAdmin && (
            <ChangeRouteButton
              title="Edit with Original Form"
              route={`/landlord/properties/${property.id}/edit`}
            />
          )}
        </ButtonGroup>
      </RehouserPaper>

      {isAgent && (
        <RehouserPaper attrs={{ disablePadding: true }}>
          <Alert severity="info">
            <Typography gutterBottom variant="h6">
              You are an Agent for this property
            </Typography>
            <Typography gutterBottom variant="body2">
              As an Agent you will be in charge of advertising the property and
              getting a lease signed as soon as possible
            </Typography>
          </Alert>
        </RehouserPaper>
      )}

      <ImportantDetails property={property} />
      {isAdmin && (
        <DetailItems
          title={isAdmin ? 'Admin Section' : 'Admins Only'}
          property={property}
          items={
            isAdmin
              ? [
                  {
                    name: 'onTheMarket',
                    label: 'On The Market',
                    type: 'boolean',
                    icon: <CameraIcon color="default" />,
                    disabled: true,
                  },
                  {
                    name: 'rehouserManaged',
                    label: 'Managed by Rehouser',
                    type: 'boolean',
                    icon: <CameraIcon color="default" />,
                    disabled: true,
                  },
                ]
              : []
          }
        />
      )}
      <RehouserPaper
        square
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        <InsulationStatementForm
          data={null}
          propertyId={property.id}
          property={property}
          insulationFormId={
            property.insulationForm ? property.insulationForm.id : null
          }
          onSubmit={data => {}}
          recieveFile={file => {
            updateProperty({
              variables: {
                where: {
                  id: property.id,
                },
                data: {
                  insulationStatementFile: {
                    connect: {
                      id: file.id,
                    },
                  },
                },
              },
            });
          }}
        />
      </RehouserPaper>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography className={classes.heading}>Editable Displays</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RehouserPaper>
            <EditableDisplayItems
              __typename="Property"
              data={property}
              items={PROPERTY_DETAILS_EDITABLE_DISPLAY_CONF}
              where={{ id: property.id }}
            />
          </RehouserPaper>
        </AccordionDetails>
      </Accordion>

      <DetailItems
        title="Property Variables"
        property={property}
        items={[
          {
            name: 'rent',
            label: 'Rent',
            type: 'money',
            icon: <CameraIcon color="default" />,
          },
          {
            name: 'moveInDate',
            label: 'Move in Date',
            type: 'date',
            icon: <CameraIcon color="default" />,
          },
          {
            name: 'expiryDate',
            label: 'Expiry date',
            type: 'date',
            icon: <CameraIcon color="default" />,
          },
          {
            name: 'rooms',
            label: 'Rooms',
            type: 'int',
            icon: <CameraIcon color="default" />,
          },
          {
            name: 'chattels',
            label: 'chattels',
            type: 'enum',
            fieldProps: {
              __type: '',
              variant: 'multi',
            },
            icon: <CameraIcon color="default" />,
          },
        ]}
      />

      <RehouserPaper>
        <EnumMultiSelectChip
          label="Chattels"
          __type="PropertyChattel"
          values={updates.chattels ? updates.chattels : property.chattels}
          handleChange={values => {
            setUpdates({
              ...updates,
              chattels: values,
            });
          }}
        />
      </RehouserPaper>
      <RehouserPaper>
        <LeaseLength
          title="Lease will be for"
          moveInDate={property.moveInDate}
          expiryDate={property.expiryDate}
        />
      </RehouserPaper>
      <RehouserPaper>
        <Typography>Property creator</Typography>
        <UserDetails me={me} user={property.creator} />
      </RehouserPaper>
      <RehouserPaper>
        <Typography>Owners</Typography>
        {property.owners.length > 0 &&
          property.owners.map((owner, idx) => {
            return <UserDetails me={me} user={owner} />;
          })}
        {me.isWizard && (
          <DynamicAddUserToList
            id="properties-owners"
            filters=""
            selected={property.owners}
            me={me}
            add={handleAddOwner}
            remove={handleRemoveOwner}
            selectedListLabel="Properties Owners"
          />
        )}
      </RehouserPaper>
      <RehouserPaper id="agent-section">
        <Typography gutterBottom>Agents</Typography>
        {isOwner && (
          <Typography gutterBottom>
            Agents will act on your behalf and will be your property manager
          </Typography>
        )}
        {property.agents.length === 0 && (
          <Alert severity="info">
            There are no Agents for this property. rehouser will assign an Agent
            as soon as possible
          </Alert>
        )}
        {property.agents.length > 0 &&
          property.agents.map((agent, idx) => {
            return <UserDetails me={me} user={agent} />;
          })}
        {me.isWizard && (
          <DynamicAddUserToList
            id="properties-agents"
            filters="(permissions:ADMIN OR permissions:WIZARD)"
            selected={property.agents}
            me={me}
            add={handleAddAgent}
            remove={handleRemoveAgent}
            selectedListLabel="Properties Agents"
          />
        )}
      </RehouserPaper>
      <Card attrs={{ disablePadding: true }}>
        <PropertyImages property={property} updateProperty={updateProperty} />
      </Card>
      <Card attrs={{ disablePadding: true }}>
        <Map
          center={{
            lat: property.locationLat,
            lng: property.locationLng,
          }}
        />
      </Card>
      <ForeignLinksTable
        type="property"
        id={property.id}
        where={{
          property: {
            id: property.id,
          },
        }}
      />
      <Modal
        open={publicDetailsModalIsOpen}
        close={handleClosePublicDetailsModal}>
        <PropertyPublicDetails id={property.id} />
      </Modal>
    </div>
  );
};

Details.propTypes = {
  property: PropTypes.shape({
    expiryDate: PropTypes.any,
    id: PropTypes.any,
    images: PropTypes.shape({
      map: PropTypes.func,
    }),
    insulationForm: PropTypes.shape({
      id: PropTypes.any,
    }),
    isLeased: PropTypes.any,
    leaseId: PropTypes.any,
    locationLat: PropTypes.any,
    locationLng: PropTypes.any,
    moveInDate: PropTypes.any,
    onTheMarket: PropTypes.any,
    placeId: PropTypes.any,
    rent: PropTypes.any,
    rooms: PropTypes.any,
  }).isRequired,
};

export default Details;
