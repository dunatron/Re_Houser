import { useState } from 'react';
import { FormCreator } from '../Forms';
import { useMutation } from '@apollo/client';
import { CREATE_PROPERTY_MUTATION } from '../../graphql/mutations/index';
import {
  PROPERTIES_QUERY,
  OWNER_PROPERTIES_QUERY,
} from '../../graphql/queries/index';

import {
  Paper,
  Typography,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Chip,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import CREATE_PROPERTY_FORM_CONF from '../../lib/configs/createPropertyForm';
import Error from '../../components/ErrorMessage';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TermsOfEngagement from '../../components/Terms/TermsOfEngagement';
import ChangeRouteButton from '../Routes/ChangeRouteButton';

const CheckAndSubmit = ({ me, formData, handlePropertyCreated }) => {
  const handleCompleted = data => {
    // toast.success(
    //   <div>
    //     <p>New Property Created</p>
    //     <ChangeRouteButton
    //       title="Go to property"
    //       route="/properties/property"
    //       query={{ id: data.createProperty.id }}
    //     />
    //   </div>
    // );
    console.log('Data is being passed here => ', data);
    handlePropertyCreated(data);
  };

  var rent = formData.rent;
  const extractRentFloat = Number(rent.replace(/[^0-9\.-]+/g, ''));
  const rentVal = extractRentFloat * 100;

  console.log('The rentVal => ', rentVal);

  const [createProperty, { loading, error, data }] = useMutation(
    CREATE_PROPERTY_MUTATION,
    {
      onCompleted: handleCompleted,
      refetchQueries: [
        { query: PROPERTIES_QUERY },
        { query: OWNER_PROPERTIES_QUERY },
      ],
    }
  );

  const handleCreate = () => {
    createProperty({
      variables: {
        data: {
          ...formData,
          rent: rentVal,
          onTheMarket: false,
          useAdvancedRent: false,
          owners: {
            connect: {
              id: me.id,
            },
          },
          creator: {
            connect: {
              id: me.id,
            },
          },
          insulationForm: formData.insulationForm
            ? {
                create: {
                  ...formData.insulationForm,
                },
              }
            : {},
        },
      },
    });
  };

  return (
    <>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Terms of Engagement</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TermsOfEngagement me={me} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Typography variant="h6" gutterBottom>
        Check your property details
      </Typography>
      <Typography gutterBottom variant="h5">
        Rehouser Services Contract
      </Typography>
      <Typography component="ol" gutterBottom>
        <Typography component="li">PARTIES</Typography>
        <Typography>Letting Agent: Rehouser Limited.</Typography>
        <Typography>
          Owner: {me.firstName} {me.lastName}
        </Typography>
        <Typography component="li">ADDRESS FOR SERVICE DELIVERY</Typography>
        <Typography component="span">{formData.location}</Typography>
      </Typography>
      <Typography variant="body1" gutterBottom></Typography>
      {/* location */}
      <Typography variant="h6" gutterBottom>
        location: {formData.location}
      </Typography>
      {/* locationLat */}
      <Typography variant="h6" gutterBottom>
        locationLat: {formData.locationLat}
      </Typography>
      {/* locationLng */}
      <Typography variant="h6" gutterBottom>
        locationLng: {formData.locationLng}
      </Typography>
      {/* type */}
      <Typography variant="body1" gutterBottom>
        type: {formData.type}
      </Typography>
      {/* headline */}
      <Typography variant="body1" gutterBottom>
        headline: {formData.headline}
      </Typography>
      {/* rooms */}
      <Typography variant="body1" gutterBottom>
        rooms: {formData.rooms}
      </Typography>
      {/* maximumOccupants */}
      <Typography variant="body1" gutterBottom>
        maximumOccupants: {formData.maximumOccupants}
      </Typography>
      {/* rent */}
      <Typography variant="body1" gutterBottom>
        rent ${formData.rent}
      </Typography>
      {/* bathrooms */}
      <Typography variant="body1" gutterBottom>
        bathrooms: {formData.bathrooms}
      </Typography>
      {/* garageSpaces */}
      <Typography variant="body1" gutterBottom>
        garageSpaces: {formData.garageSpaces}
      </Typography>
      {/* carportSpaces */}
      <Typography variant="body1" gutterBottom>
        carportSpaces {formData.carportSpaces}
      </Typography>
      {/* offStreetSpaces */}
      <Typography variant="body1" gutterBottom>
        offStreetSpaces {formData.offStreetSpaces}
      </Typography>
      {/* indoorFeatures */}
      <Typography variant="body1" gutterBottom>
        indoorFeatures:
        {formData.indoorFeatures &&
          formData.indoorFeatures.set.map((f, i) => (
            <Chip key={i} variant="body1" label={f} size="small">
              {f}
            </Chip>
          ))}
      </Typography>

      {/* outdoorFeatures */}
      <Typography variant="body1" gutterBottoms>
        outdoorFeatures:
        {formData.outdoorFeatures &&
          formData.outdoorFeatures.set.map((f, i) => (
            <Chip key={i} variant="body1" label={f} size="small">
              {f}
            </Chip>
          ))}
      </Typography>
      {/* heatSources */}
      <Typography variant="body1" gutterBottom>
        heatSources:
        {formData.heatSources &&
          formData.heatSources.set.map((f, i) => (
            <Chip key={i} variant="body1" label={f} size="small">
              {f}
            </Chip>
          ))}
      </Typography>
      {/* moveInDate */}
      <Typography variant="body1" gutterBottom>
        moveInDate: {formData.moveInDate}
      </Typography>
      {/* expiryDate */}
      <Typography variant="body1" gutterBottom>
        expiryDate: {formData.expiryDate}
      </Typography>
      {/* leaseLengthInMonths */}
      <Typography variant="body1" gutterBottom>
        leaseLengthInMonths: {formData.leaseLengthInMonths}
      </Typography>
      {/* petsAllowed */}
      <Typography variant="body1" gutterBottom>
        petsAllowed: {formData.petsAllowed ? 'yes' : 'no'}
      </Typography>
      {/* pets */}
      <Typography variant="body1" gutterBottom>
        pets:
        {formData.pets &&
          formData.pets.set.map((f, i) => (
            <Chip key={i} variant="body1" label={f} size="small">
              {f}
            </Chip>
          ))}
      </Typography>
      {/* chattels */}
      <Typography variant="body1" gutterBottom>
        chattels:
        {formData.chattels &&
          formData.chattels.set.map((f, i) => (
            <Chip key={i} variant="body1" label={f} size="small">
              {f}
            </Chip>
          ))}
      </Typography>
      {/* landlordProtectionCover */}
      <Typography variant="body1" gutterBottom>
        landlordProtectionCover:{' '}
        {formData.landlordProtectionCover ? 'Yes' : 'No'}
      </Typography>
      {/* freeGlassCover */}
      <Typography variant="body1" gutterBottom>
        freeGlassCover: {formData.freeGlassCover ? 'Yes' : 'No'}
      </Typography>
      {/* workingAlarms */}
      <Typography variant="body1" gutterBottom>
        workingAlarms: {formData.workingAlarms ? 'Yes' : 'No'}
      </Typography>
      {/* inHallway3mOfEachBedroom */}
      <Typography variant="body1" gutterBottom>
        inHallway3mOfEachBedroom:{' '}
        {formData.inHallway3mOfEachBedroom ? 'Yes' : 'No'}
      </Typography>
      {/* tenYearPhotoelectricAlarms */}
      <Typography variant="body1" gutterBottom>
        tenYearPhotoelectricAlarms:{' '}
        {formData.tenYearPhotoelectricAlarms ? 'Yes' : 'No'}
      </Typography>
      {/* alarmsEachLevel */}
      <Typography variant="body1" gutterBottom>
        alarmsEachLevel: {formData.alarmsEachLevel ? 'Yes' : 'No'}
      </Typography>
      <Typography gutterBottom>
        Stay in ya' lane, I remind these lil' boys This is victory lane, now do
        I need a horn The struggle is real, and the Bible too long I'm writing
        my will, and I'm typing my won'ts
      </Typography>
      <Error error={error} />
      <Button
        disabled={loading}
        color="primary"
        variant="outlined"
        onClick={handleCreate}>
        Create Property
      </Button>
    </>
  );
};

export default CheckAndSubmit;
