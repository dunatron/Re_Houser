import React, { useState } from "react"
import TextInput from "../../styles/TextInput"
import Button from "@material-ui/core/Button"

const AccommodationCreator = props => {
  const { accommodation, add, update, duplicate, remove } = props
  const [adding, setAdding] = useState(false)
  return (
    <div>
      <p>Accommodation Creator</p>
      <RenderAccommodation
        accommodation={accommodation}
        update={update}
        duplicate={duplicate}
        remove={remove}
      />
      {adding && (
        <CreateAccommodation
          add={res => {
            add(res)
            setAdding(false)
          }}
        />
      )}
      <Button
        onClick={() => setAdding(!adding)}
        color={adding ? "primary" : "secondary"}>
        {adding ? "Quit Adding accommodation" : "Add Accommodation"}
      </Button>
    </div>
  )
}

const CreateAccommodation = ({ accommodation, add, type }) => {
  const [roomSize, setRoomSize] = useState(
    accommodation ? accommodation.roomSize : null
  )
  const [rent, setRent] = useState(accommodation ? accommodation.rent : null)
  const [expenses, setExpenses] = useState(
    accommodation ? accommodation.expenses : null
  )
  const [description, setDescription] = useState(
    accommodation ? accommodation.description : null
  )
  const resetState = () => {
    setRoomSize(null)
    setRent(null)
    setExpenses(null)
    setDescription(null)
  }
  const addAccommodation = () => {
    const accommodation = {
      roomSize,
      rent,
      expenses,
      description,
    }
    add({ accommodation })
    resetState()
  }
  return (
    <div>
      <TextInput
        id="roomSize"
        label="roomSize"
        type="number"
        fullWidth={false}
        name="roomSize"
        value={roomSize}
        placeholder={8}
        onChange={e => setRoomSize(parseFloat(e.target.value))}
      />
      <TextInput
        id="rent"
        label="rent"
        type="number"
        fullWidth={false}
        name="rent"
        value={rent}
        placeholder={150}
        onChange={e => setRent(parseFloat(e.target.value))}
      />
      <TextInput
        id="expenses"
        label="expenses"
        type="number"
        fullWidth={false}
        name="expenses"
        value={expenses}
        placeholder={20}
        onChange={e => setExpenses(parseFloat(e.target.value))}
      />
      <TextInput
        id="description"
        label="Room Description"
        fullWidth={true}
        name="description"
        value={description}
        placeholder="This room is at the far end of the house. It gets the morning sun."
        onChange={e => setDescription(e.target.value)}
      />
      <Button onClick={() => addAccommodation()} color="secondary">
        {type === "update" ? "update" : "Create"} Accommodation
      </Button>
    </div>
  )
}

const RenderAccommodation = ({ accommodation, update, duplicate, remove }) => {
  const [editingIndex, setEditingIndex] = useState(null)
  return (
    <div>
      {accommodation.map((accom, i) => {
        if (editingIndex === i)
          return (
            <>
              <EditAccommodation
                index={i}
                accommodation={accom}
                update={res => {
                  update(res)
                  setEditingIndex(null)
                }}
              />
              <Button onClick={() => setEditingIndex(null)}>
                Quit Editing
              </Button>
            </>
          )
        return (
          <div>
            <p>Room Size => {accom.roomSize}</p>
            <p>rent for room => {accom.rent}</p>
            <p>expenses => {accom.expense}</p>
            <p>room description => {accom.description}</p>
            <Button onClick={() => setEditingIndex(i)}>Edit</Button>
            <Button onClick={() => duplicate({ accommodation: accom })}>
              Duplicate
            </Button>
            <Button onClick={() => remove({ removeIndex: i })}>Remove</Button>
          </div>
        )
      })}
    </div>
  )
}

const EditAccommodation = ({ index, accommodation, update }) => {
  const updateAccommodation = ({ accommodation }) => {
    const data = {
      updateIndex: index,
      accommodation: accommodation,
    }
    update(data)
  }
  return (
    <CreateAccommodation
      accommodation={accommodation}
      type="update"
      add={accommodation => updateAccommodation(accommodation)}
    />
  )
}

export default AccommodationCreator
