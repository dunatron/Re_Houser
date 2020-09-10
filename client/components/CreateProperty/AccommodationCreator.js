import PropTypes from "prop-types";
import React, { useState, Fragment } from 'react';
import TextInput from '../../styles/TextInput';
import Button from '@material-ui/core/Button';
import { Paper, Grid, Typography } from '@material-ui/core';

const AccommodationCreator = props => {
  const { accommodation, add, update, duplicate, remove } = props;
  const [adding, setAdding] = useState(false);
  return (
    <Fragment>
      <Typography variant="body1" gutterBottom>
        There are {accommodation.length} rooms available for this property
      </Typography>
      <RenderAccommodation
        accommodation={accommodation}
        update={update}
        duplicate={duplicate}
        remove={remove}
      />
      {adding && (
        <CreateAccommodation
          add={res => {
            add(res);
            setAdding(false);
          }}
        />
      )}
      <Button
        data-cy="add-accomodation-btn"
        onClick={() => setAdding(!adding)}
        color={adding ? 'secondary' : 'primary'}>
        {adding ? 'Quit Adding accommodation' : 'Add Accommodation'}
      </Button>
    </Fragment>
  );
};

AccommodationCreator.propTypes = {
  accommodation: PropTypes.shape({
    length: PropTypes.any
  }).isRequired,
  add: PropTypes.func.isRequired,
  duplicate: PropTypes.any.isRequired,
  remove: PropTypes.any.isRequired,
  update: PropTypes.any.isRequired
}

const CreateAccommodation = ({ accommodation, add, type }) => {
  const [roomSize, setRoomSize] = useState(
    accommodation ? accommodation.roomSize : null
  );
  const [rent, setRent] = useState(accommodation ? accommodation.rent : null);
  const [expenses, setExpenses] = useState(
    accommodation ? accommodation.expenses : null
  );
  const [description, setDescription] = useState(
    accommodation ? accommodation.description : null
  );
  const resetState = () => {
    setRoomSize(null);
    setRent(null);
    setExpenses(null);
    setDescription(null);
  };
  const addAccommodation = () => {
    const accommodation = {
      roomSize,
      rent,
      expenses,
      description,
    };
    add({ accommodation });
    resetState();
  };
  return (
    <Fragment>
      <Grid container spacing={3} style={{ marginBottom: '8px' }}>
        <Grid item xs={12} sm={6} lg={3}>
          <TextInput
            id="roomSize"
            inputProps={{
              'data-cy': 'accomodation-room-size',
            }}
            label="roomSize"
            type="number"
            fullWidth={false}
            name="roomSize"
            value={roomSize}
            placeholder={8}
            onChange={e => setRoomSize(parseFloat(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <TextInput
            id="rent"
            inputProps={{
              'data-cy': 'accomodation-room-rent',
            }}
            label="rent"
            type="number"
            fullWidth={false}
            name="rent"
            value={rent}
            placeholder={150}
            onChange={e => setRent(parseFloat(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <TextInput
            id="expenses"
            inputProps={{
              'data-cy': 'accomodation-room-expenses',
            }}
            label="expenses"
            type="number"
            fullWidth={false}
            name="expenses"
            value={expenses}
            placeholder={20}
            onChange={e => setExpenses(parseFloat(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <TextInput
            id="description"
            inputProps={{
              'data-cy': 'accomodation-room-description',
            }}
            label="Room Description"
            fullWidth={true}
            name="description"
            value={description}
            placeholder="This room is at the far end of the house. It gets the morning sun."
            onChange={e => setDescription(e.target.value)}
          />
        </Grid>
      </Grid>

      <Button
        onClick={() => addAccommodation()}
        data-cy="create-accomodation-btn"
        color="primary"
        variant="outlined">
        {type === 'update' ? 'update' : 'Create'} Accommodation
      </Button>
    </Fragment>
  );
};

CreateAccommodation.propTypes = {
  accommodation: PropTypes.shape({
    description: PropTypes.any,
    expenses: PropTypes.any,
    rent: PropTypes.any,
    roomSize: PropTypes.any
  }).isRequired,
  add: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
}

const RenderAccommodation = ({ accommodation, update, duplicate, remove }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  return (
    <Fragment>
      {accommodation.map((accom, i) => {
        if (editingIndex === i)
          return (
            <Fragment key={i}>
              <EditAccommodation
                index={i}
                accommodation={accom}
                update={res => {
                  update(res);
                  setEditingIndex(null);
                }}
              />
              <Button onClick={() => setEditingIndex(null)}>
                Quit Editing
              </Button>
            </Fragment>
          );
        return (
          <div key={i}>
            <p>Room Size {accom.roomSize}</p>
            <p>rent for room {accom.rent}</p>
            <p>expenses {accom.expense}</p>
            <p>room description {accom.description}</p>
            <Button onClick={() => setEditingIndex(i)}>Edit</Button>
            <Button onClick={() => duplicate({ accommodation: accom })}>
              Duplicate
            </Button>
            <Button onClick={() => remove({ removeIndex: i })}>Remove</Button>
          </div>
        );
      })}
    </Fragment>
  );
};

RenderAccommodation.propTypes = {
  accommodation: PropTypes.shape({
    map: PropTypes.func
  }).isRequired,
  duplicate: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired
}

const EditAccommodation = ({ index, accommodation, update }) => {
  const updateAccommodation = ({ accommodation }) => {
    const data = {
      updateIndex: index,
      accommodation: accommodation,
    };
    update(data);
  };
  return (
    <CreateAccommodation
      accommodation={accommodation}
      type="update"
      add={accommodation => updateAccommodation(accommodation)}
    />
  );
};

EditAccommodation.propTypes = {
  accommodation: PropTypes.any.isRequired,
  index: PropTypes.any.isRequired,
  update: PropTypes.func.isRequired
}

export default AccommodationCreator;
