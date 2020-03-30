import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@apollo/client';
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
import EnumMultiSelectChip from '../Inputs/EnumMultiSelectChip';
import EnumSelectOption from '../Inputs/EnumSelectOption';
import moment from 'moment';
import ChangeRouteButton from '../Routes/ChangeRouteButton';
import LeaseLength from '../LeaseManager/LeaseLengthInfo';

import PreFormTaskChecks from './PreFormTaskChecks';
import AccommodationCreator from './AccommodationCreator';
import NavigationIcon from '@material-ui/icons/Navigation';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Typography,
  Button,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import MyDropzone from '../DropZone';
import { InsulationStatementForm } from '../Forms/index';
const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
  },
  paper: {
    width: '100%',
    // padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    [theme.breakpoints.up('lg')]: {},
  },
  formSection: {
    width: '100%',
    padding: theme.spacing(2),
    borderRadius: 0,
    color: theme.palette.text.secondary,
    margin: '0 0 16px 0',
    [theme.breakpoints.up('lg')]: {},
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
    bathRooms: null,
    carportSpaces: null,
    garageSpaces: null,
    offStreetSpaces: null,
    isLeased: false,
    insulationForm: {},
  };

  const [state, setState] = useState(defaultState);

  const [completeInsulationLater, setCompleteInsulationLater] = useState(false);

  const [images, setImages] = useState([]);

  const _propertyVariables = () => {
    const theFiles = images
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
        insulationForm: state.insulationForm
          ? {
              create: {
                meetsMinCeilingReq: true,
                ceilingCoverage: 'COMPLETE',
                ceilingTypes: {
                  set: ['SEGMENTS_BLANKETS', 'LOOSE_FILL'],
                },
              },
            }
          : {},
        images: {
          create: [
            ...images
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
  const _createProperty = async () => {
    const res = await createProperty();
    // offer route to this property
    toast.success(
      <div>
        <p>New Property Created</p>
        <ChangeRouteButton
          title="Go to property"
          route="/properties/property"
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
    let currimages = images;
    currimages.splice(idx, 1);
    setImages([...currimages]);
  };
  const setFileInState = file => {
    const files = images;
    files.push({ type: 'rawImage', data: file });
    setImages([...files]);
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

  console.log('The Property Forms STate => ', state);

  return (
    <div className={classes.root}>
      <PreFormTaskChecks me={me} />
      <Form
        data-cy="add_property_form"
        method="post"
        onSubmit={async e => {
          e.preventDefault();
          _createProperty(createProperty);
        }}>
        <div className="form-name">Add Property Form</div>
        <fieldset
          disabled={loading}
          aria-busy={loading}
          className="main-fieldset">
          <Error error={error} />

          {/* Location Section */}
          <Paper className={classes.formSection} elevation={5}>
            <Typography variant="h6" gutterBottom>
              Location Section
            </Typography>
            <Typography variant="body1" gutterBottom>
              Type your address in the search below to bring up your property.
              You need to select it to set the property location
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
                  id="property_location_input"
                  inputProps={{
                    'data-cy': 'property_location_input',
                  }}
                  label="location"
                  disabled={true}
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
                  id="property_latitude_input"
                  inputProps={{
                    'data-cy': 'property_latitude_input',
                  }}
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
                  id="property_longitude_input"
                  inputProps={{
                    'data-cy': 'property_longitude_input',
                  }}
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
              <Grid item xs={12} md={12} lg={3}>
                <EnumSelectOption
                  __type="PropertyType"
                  data-cy="property_type_select"
                  label="Type"
                  name="type"
                  value={state.type}
                  // options={PROPERTY_TYPES_CONF}
                  handleChange={saveToState}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <EnumMultiSelectChip
                  __type="IndoorFeature"
                  data-cy="property_indoorfeatures_multiselect"
                  values={state.indoorFeatures}
                  // options={INDOOR_FEATURES_CONF}
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
                <EnumMultiSelectChip
                  __type="OutdoorFeature"
                  values={state.outdoorFeatures}
                  // options={OUTDOOR_FEATURES_CONF}
                  data-cy="property_outdoorfeatures_multiselect"
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
                  inputProps={{
                    'data-cy': 'property_headline_input',
                  }}
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
                  data-cy="property_bathrooms_input"
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
                  data-cy="property_garages_input"
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
                  data-cy="property_carports_input"
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
                  data-cy="property_offstreet_input"
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
          {/* InsulationStatementForm Section */}

          {/* Dates Section */}
          <Paper className={classes.formSection} elevation={5}>
            <Typography variant="h6" gutterBottom>
              Dates Section
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={6}>
                <DateInput
                  id="moveInDate"
                  label="Move In Date"
                  value={state.moveInDate}
                  onChange={date => setState({ ...state, moveInDate: date })}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
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
          <Paper className={classes.formSection} elevation={5}>
            {state.insulationForm && (
              <Typography>We have an Insulation Form</Typography>
            )}
            <Typography>
              AN insulation statement is required before you can place a
              property on the market
            </Typography>
            <Typography>
              You can however do this at a later date after you have set the
              property up
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={completeInsulationLater}
                  onChange={() =>
                    setCompleteInsulationLater(!completeInsulationLater)
                  }
                  color="primary"
                  name="toggle-create-insualtion-statement"
                />
              }
              label="Complete Insulation form later"
            />
            {!completeInsulationLater && (
              <InsulationStatementForm
                data={state.insulationForm}
                onSubmit={data => {
                  setState({
                    ...state,
                    insulationForm: {
                      ...data,
                    },
                  });
                  setCompleteInsulationLater(true);
                }}
              />
            )}
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
              images={images}
              remove={idx => removeImageFromState(idx)}
            />
            {/* setImages */}
            {/* There is a bug that is clearing the location when an image is dropped its on the receiveFile itself when we do the callback */}
            {/* Kinda solved with the setImages seperated out of state. should also test failing for toast. should get like the error id */}
            <MyDropzone
              receiveFile={file => {
                setFileInState(file);
              }}
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
            data-cy="create-property-mutation-btn"
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
