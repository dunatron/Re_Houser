import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Mutation } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Form from '../../styles/Form';
import Error from '../ErrorMessage/index';
import { CURRENT_USER_QUERY } from '../User/index';
// import { OWNER_PROPERTIES_QUERY } from "../OwnerProperties/index"
import {
  PROPERTIES_QUERY,
  OWNER_PROPERTIES_QUERY,
} from '../../graphql/queries/index';
import { CREATE_PROPERTY_MUTATION } from '../../graphql/mutations/index';
import FabButton from '../../styles/FabButton';

import TextInput from '../../styles/TextInput';
import DateInput from '../Inputs/DateInput';
import LocationPicker from '../LocationPicker/index';
import ImagePicker from '../ImagePicker';
import DragDropUploader from '../DragDropUploader/index';
import { adopt } from 'react-adopt';
import { useCurrentUser } from '../User/index';
import MultiSelectChip from '../Inputs/MultiSelectChip';
import SelectOption from '../Inputs/SelectOption';
import { INDOOR_FEATURES_CONF } from '../../lib/configs/indoorFeaturesConf';
import { OUTDOOR_FEATURES_CONF } from '../../lib/configs/outdoorFeaturesConf';
import { PROPERTY_TYPES_CONF } from '../../lib/configs/propertyTypesConf';
import moment from 'moment';
import ChangeRouteButton from '../Routes/ChangeRouteButton';
import LeaseLength from '../LeaseManager/LeaseLengthInfo';

import PreFormTaskChecks from './PreFormTaskChecks';
import AccommodationCreator from './AccommodationCreator';
import NavigationIcon from '@material-ui/icons/Navigation';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
  },
  paper: {
    width: '100%',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formSection: {
    width: '100%',
    padding: theme.spacing(2),
    borderRadius: 0,
    color: theme.palette.text.secondary,
    margin: '0 0 16px 0',
  },
}));

import Loader from '../Loader';

const CreateProperty = ({ me }) => {
  const classes = useStyles();
  const defaultState = {
    // type: 'HOUSE',
    type: '',
    location: '',
    locationLat: '',
    locationLng: '',
    rooms: 0,
    accommodation: [],
    rent: 0.0,
    moveInDate: moment().format(),
    expiryDate: moment()
      .add(12, 'months')
      .format(),
    images: [],
    indoorFeatures: [],
    outdoorFeatures: [],
    bathRooms: 0,
    carportSpaces: 0,
    garageSpaces: 0,
    offStreetSpaces: 0,
    isLeased: false,
  };

  const [state, setState] = useState(defaultState);

  console.log('STate => ', state);

  const _propertyVariables = () => {
    const theFiles = state.images
      .filter(f => f.type === 'rawImage')
      .map(file => file.data.raw);
    const data = {
      data: {
        type: state.type,
        rent: parseFloat(state.rent),
        location: state.location,
        locationLat: state.locationLat,
        locationLng: state.locationLng,
        rooms: parseInt(state.rooms),
        moveInDate: state.moveInDate,
        expiryDate: state.expiryDate,
        carportSpaces: parseInt(state.carportSpaces),
        garageSpaces: parseInt(state.garageSpaces),
        offStreetSpaces: parseInt(state.offStreetSpaces),
        outdoorFeatures: {
          set: state.outdoorFeatures,
        },
        indoorFeatures: {
          set: state.indoorFeatures,
        },
        owners: {
          connect: {
            id: me.id,
          },
        },
        onTheMarket: false,
        creator: {
          connect: {
            id: me.id,
          },
        },
        images: {
          create: [
            ...state.images
              .filter(img => img.type !== 'rawImage')
              .map((img, i) => {
                return {
                  filename: `${state.location}_${i}`,
                  mimetype: 'MIMETYPE',
                  encoding: 'encoding',
                  url: img.data,
                };
              }),
          ],
        },
        accommodation: {
          create: [...state.accommodation],
        },
      },
      files: theFiles,
    };
    return data;
  };

  const [createProperty, { loading, data, error }] = useMutation(
    CREATE_PROPERTY_MUTATION,
    {
      variables: _propertyVariables(),
      update: (proxy, payload) => {
        // Once application is accepted we can create a newLease
        if (payload.data.acceptRentalApplication.message) {
          toast(
            <div>
              <h1>Application Accepted</h1>
            </div>
          );
        }
      },
      refetchQueries: [
        { query: PROPERTIES_QUERY },
        { query: OWNER_PROPERTIES_QUERY },
      ],
    }
  );

  const saveToState = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const _createProperty = async createProperty => {
    const res = await createProperty();
    // offer route to this property
    toast.success(
      <div>
        <p>New Property Created</p>
        <ChangeRouteButton
          title="Go to property"
          route="/my/property"
          query={{ id: res.data.createProperty.id }}
        />
      </div>
    );
    setState({
      ...defaultState,
    });
  };

  const _renderImages = urls =>
    urls.map((url, i) => <img src={url} height="100" width="100" />);

  const removeImageFromState = idx => {
    let images = state.images;
    images.splice(idx, 1);
    setState({
      ...state,
      images: images,
    });
  };
  const setFileInState = file => {
    const files = state.images;
    files.push({ type: 'rawImage', data: file });

    setState({
      ...state,
      images: files,
    });
  };
  const _canSubmit = () => {
    const { location, locationLat, locationLng } = state;
    if (!me.primaryCreditCard) {
      return false;
    }
    if (location.length < 1) {
      return false;
    }
    return true;
  };
  const addAccommodation = ({ accommodation }) => {
    const updatedAccommodation = [...state.accommodation, accommodation];
    setState({
      ...state,
      accommodation: [...state.accommodation, accommodation],
    });
  };
  const updateAccommodation = props => {
    const updatedAccommodation = [...state.accommodation];
    updatedAccommodation[props.updateIndex] = props.accommodation;
    setState({
      ...state,
      accommodation: updatedAccommodation,
    });
  };

  const removeAccommodation = ({ removeIndex }) => {
    const updatedAccommodation = [...state.accommodation];
    updatedAccommodation.splice(removeIndex, 1);
    setState({
      ...state,
      accommodation: updatedAccommodation,
    });
  };

  return (
    <div className={classes.root}>
      <PreFormTaskChecks me={me} />
      <Form
        method="post"
        onSubmit={async e => {
          e.preventDefault();
          _createProperty(createProperty);
        }}>
        <div className="form-name">Add Property Form</div>
        <fieldset disabled={loading} aria-busy={loading}>
          <Error error={error} />

          {/* Location Section */}
          <Paper className={classes.formSection} elevation={5}>
            <Typography variant="h6" gutterBottom>
              Location Section
            </Typography>
            <Typography variant="body1" gutterBottom>
              Type your address in the search below to bring up your property. You need to select it to set the property location
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <LocationPicker
                  selection={data =>
                    setState({
                      ...state,
                      locationLat: data.lat,
                      locationLng: data.lng,
                      location: data.desc,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <TextInput
                  id="location"
                  label="location"
                  disabled={false}
                  fullWidth={true}
                  type="text"
                  name="location"
                  placeholder="please enter your location"
                  value={state.location}
                  onChange={saveToState}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <TextInput
                  id="latitude"
                  label="Latitude"
                  disabled={true}
                  fullWidth={true}
                  type="text"
                  name="locationLat"
                  value={state.locationLat}
                  onChange={saveToState}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <TextInput
                  id="longitude"
                  label="Longitude"
                  disabled={true}
                  fullWidth={true}
                  type="text"
                  name="locationLng"
                  value={state.locationLng}
                  onChange={saveToState}
                />
              </Grid>
            </Grid>
          </Paper>
          {/* Details Section */}
          <Paper className={classes.formSection} elevation={5}>
            <Typography variant="h6" gutterBottom>
              Details Section
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <SelectOption
                  label="Type"
                  name="type"
                  value={state.type}
                  options={PROPERTY_TYPES_CONF}
                  handleChange={saveToState}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MultiSelectChip
                  values={state.indoorFeatures}
                  options={INDOOR_FEATURES_CONF}
                  label="Indoor Feature"
                  handleChange={value =>
                    setState({ ...state, indoorFeatures: value })
                  }
                  removeItem={v => {
                    const indoorFeatures = state.indoorFeatures;
                    const featureIdx = indoorFeatures.findIndex(
                      feature => feature === v
                    );
                    indoorFeatures.splice(featureIdx, 1);
                    setState({
                      ...state,
                      indoorFeatures: indoorFeatures,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MultiSelectChip
                  values={state.outdoorFeatures}
                  options={OUTDOOR_FEATURES_CONF}
                  label="Outdoor Feature"
                  handleChange={value =>
                    setState({ ...state, outdoorFeatures: value })
                  }
                  removeItem={v => {
                    const outdoorFeatures = state.outdoorFeatures;
                    const featureIdx = outdoorFeatures.findIndex(
                      feature => feature === v
                    );
                    outdoorFeatures.splice(featureIdx, 1);
                    setState({
                      ...state,
                      outdoorFeatures: outdoorFeatures,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  gutterBottom
                  id="headline"
                  label="Headline for property advertisement"
                  fullWidth={true}
                  name="headline"
                  value={state.headline}
                  onChange={saveToState}
                />
              </Grid>
            </Grid>
          </Paper>
          {/* Accommodation Section */}
          <Paper className={classes.formSection} elevation={5}>
            <Typography variant="h6" gutterBottom>
              Accommodation Section
            </Typography>
            <Typography variant="body1" gutterBottom>
              For each room you want to be rented out you will need to add
              accommodation.
            </Typography>
            {/* Other Details Grid */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <AccommodationCreator
                  accommodation={state.accommodation}
                  add={accommodation => addAccommodation(accommodation)}
                  update={data => updateAccommodation(data)}
                  duplicate={accommodation => addAccommodation(accommodation)}
                  remove={res => removeAccommodation(res)}
                />
              </Grid>
            </Grid>
          </Paper>
          {/* Details Section */}
          <Paper className={classes.formSection} elevation={5}>
            <Typography variant="h6" gutterBottom>
              Details Section
            </Typography>
            {/* Other Details Grid */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={3}>
                <TextInput
                  id="bathRooms"
                  label="Number of Bath Rooms"
                  fullWidth={true}
                  type="number"
                  name="bathRooms"
                  value={state.bathRooms}
                  onChange={saveToState}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <TextInput
                  id="garageSpaces"
                  label="Garage spaces"
                  fullWidth={true}
                  type="number"
                  name="garageSpaces"
                  value={state.garageSpaces}
                  onChange={saveToState}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <TextInput
                  id="carportSpaces"
                  label="Car port spaces"
                  fullWidth={true}
                  type="number"
                  name="carportSpaces"
                  value={state.carportSpaces}
                  onChange={saveToState}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <TextInput
                  id="offStreetSpaces"
                  label="Street parks"
                  fullWidth={true}
                  type="number"
                  name="offStreetSpaces"
                  value={state.offStreetSpaces}
                  onChange={saveToState}
                />
              </Grid>
            </Grid>
          </Paper>
          {/* Dates Section */}
          <Paper className={classes.formSection} elevation={5}>
            <Typography variant="h6" gutterBottom>
              Dates Section
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={3}>
                <DateInput
                  id="moveInDate"
                  label="Move In Date"
                  value={state.moveInDate}
                  onChange={date => setState({ ...state, moveInDate: date })}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <DateInput
                  id="expiryDate"
                  label="Expiry Date"
                  value={state.expiryDate}
                  onChange={date => setState({ ...state, expiryDate: date })}
                />
              </Grid>
              <Grid item xs={12}>
                <LeaseLength
                  moveInDate={state.moveInDate}
                  expiryDate={state.expiryDate}
                />
              </Grid>
            </Grid>
          </Paper>
          {/* Image Section */}
          <Paper className={classes.formSection} elevation={5}>
            <Typography variant="h6" gutterBottom>
              Image Section
            </Typography>
            <Typography variant="body1">
              Please upload relevant photos of the property.
              <br /> You can upload a maximum of six images
            </Typography>
            <Typography variant="body1" gutterBottom>
              We suggest making the first image a panaramic of the property
              followed by some shots of the property inside
            </Typography>
            <ImagePicker
              images={state.images}
              remove={idx => removeImageFromState(idx)}
            />
            <DragDropUploader
              disabled={loading}
              multiple={true}
              types={['image']}
              extensions={['.jpg', '.png']}
              // setFile in state will need to only have a max of 6 images
              receiveFile={file => setFileInState(file)}
            />
          </Paper>

          <FabButton
            disabled={!_canSubmit()}
            type="submit"
            variant="extended"
            color="primary"
            aria-label="Add"
            style={{ minWidth: 160 }}>
            <NavigationIcon style={{ marginRight: 5 }} />
            Add Housing
          </FabButton>
        </fieldset>
      </Form>
    </div>
  );
};

export default CreateProperty;
