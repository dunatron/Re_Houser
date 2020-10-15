import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import SearchUsers from './SearchUsers';
import { Typography, Button, IconButton } from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';

// icons
import VisibilityIcon from '@material-ui/icons/Visibility';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle, theme) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  //   background: isDragging ? 'lightgreen' : 'grey',
  background: isDragging ? theme.palette.primary.main : 'grey',
  color: isDragging ? theme.palette.primary.contrastText : 'black',
  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver, theme) => ({
  //   background: isDraggingOver ? 'lightblue' : 'lightgrey',
  //   background: isDraggingOver ? theme.palette.primary.main : 'lightgrey',
  background: isDraggingOver ? theme.palette.secondary.main : 'lightgrey',
  color: isDraggingOver ? theme.palette.secondary.contrastText : 'black',
  padding: grid,
  width: 250,
});

const AddUserToList = ({ selected, add, remove, me, loading }) => {
  const theme = useTheme();
  const [seconds, setSeconds] = useState(0);

  const [state, setState] = useState({
    items: [],
    selected: selected,
  });

  const handleSetHits = hits => {
    // filter out hits that have our selected users durrr
    const selectedIds = state.selected.map(slctd => slctd.id);
    const filteredHits = hits.filter(hit => !selectedIds.includes(hit.id));
    setState({
      ...state,
      items: filteredHits,
    });
  };

  const handleSetSelected = () => {
    const selectedIds = selected.map(slctd => slctd.id);
    const filteredHits = state.items.filter(
      hit => !selectedIds.includes(hit.id)
    );
    setState({
      items: filteredHits,
      selected: selected,
    });
  };

  const viewItem = item => {
    alert('ToDo: view user item');
  };

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  const id2List = {
    droppable: 'items',
    droppable2: 'selected',
  };

  const getList = id => state[id2List[id]];

  //   const onDragEnd = result => {
  //     const { source, destination } = result;

  //     // dropped outside the list
  //     if (!destination) {
  //       return;
  //     }

  //     if (source.droppableId === destination.droppableId) {
  //       const items = reorder(
  //         getList(source.droppableId),
  //         source.index,
  //         destination.index
  //       );

  //       //   let state = { items };

  //       //   if (source.droppableId === 'droppable2') {
  //       //     state = { selected: items };
  //       //   }

  //       //   setState(state);
  //     } else {
  //       const result = move(
  //         getList(source.droppableId),
  //         getList(destination.droppableId),
  //         source,
  //         destination
  //       );

  //       setState({
  //         items: result.droppable,
  //         selected: result.droppable2,
  //       });
  //     }
  //   };

  const onDragEnd = result => {
    const { source, destination, draggableId } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    // from selected to items
    if (
      destination.droppableId === 'droppable' &&
      source.droppableId === 'droppable2'
    ) {
      const itemFromSelected = state.selected.find(
        slcted => slcted.id === draggableId
      );
      remove(itemFromSelected);
      // remove(result);
      return;
    }

    // from items to selected
    if (
      destination.droppableId === 'droppable2' &&
      source.droppableId === 'droppable'
    ) {
      const itemFromList = state.items.find(
        slcted => slcted.id === draggableId
      );
      add(itemFromList);
      return;
    }

    // if (source.droppableId === destination.droppableId) {
    //   const items = reorder(
    //     getList(source.droppableId),
    //     source.index,
    //     destination.index
    //   );

    //   alert('Same Place');

    //   //   let state = { items };

    //   //   if (source.droppableId === 'droppable2') {
    //   //     state = { selected: items };
    //   //   }

    //   //   setState(state);
    // } else {
    //   alert('SO MOVE');
    //   //   const result = move(
    //   //     getList(source.droppableId),
    //   //     getList(destination.droppableId),
    //   //     source,
    //   //     destination
    //   //   );
    //   //   setState({
    //   //     items: result.droppable,
    //   //     selected: result.droppable2,
    //   //   });
    // }
  };

  useEffect(() => {
    handleSetSelected();
  }, [selected.length]);

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            width: '100%',
          }}>
          <SearchUsers me={me} setHits={handleSetHits} />
          {loading && <div>Loading...</div>}
        </div>
        <Droppable droppableId="droppable" isDropDisabled={loading}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver, theme)}>
              <Typography gutterBottom>User List</Typography>
              {state.items.length === 0 && (
                <Typography gutterBottom>No items. Use the search</Typography>
              )}
              {state.items.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                  isDragDisabled={loading}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        theme
                      )}>
                      <div>
                        <Typography variant="body1">
                          {item.firstName} {item.lastName}
                        </Typography>
                        {item.permissions &&
                          item.permissions.map((perm, idx) => {
                            return (
                              <Typography variant="caption">
                                {perm},{' '}
                              </Typography>
                            );
                          })}
                        <Button onClick={() => viewItem(item)}>View</Button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="droppable2" isDropDisabled={loading}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver, theme)}>
              <Typography gutterBottom>Selected List</Typography>
              {state.selected.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                  isDragDisabled={loading}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        theme
                      )}>
                      <div>
                        <Typography variant="body1">
                          {item.firstName} {item.lastName}
                        </Typography>
                        <Typography variant="caption">Agent</Typography>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default AddUserToList;
