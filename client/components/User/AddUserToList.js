import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import SearchUsers from './SearchUsers';
import { Typography, Button, IconButton } from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';
import { Paper, Card } from '@material-ui/core';
import { toast } from 'react-toastify';
import isBrowser from '@/Lib/isBrowser';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle, theme) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  // background: isDragging
  //   ? theme.palette.primary.main
  //   : theme.palette.background.paper,
  // color: isDragging
  //   ? theme.palette.primary.contrastText
  //   : theme.palette.text.primary,
  // styles we need to apply on draggables
  background: isDragging
    ? theme.palette.primary.main
    : theme.palette.background.default,
  color: isDragging
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
  ...draggableStyle,
});

const getListStyle = (isDraggingOver, theme) => ({
  // background: isDraggingOver
  //   ? theme.palette.secondary.main
  //   : theme.palette.background.default,
  // color: isDraggingOver
  //   ? theme.palette.secondary.contrastText
  //   : theme.palette.text.primary,
  background: isDraggingOver
    ? theme.palette.secondary.main
    : theme.palette.background.paper,
  color: isDraggingOver
    ? theme.palette.secondary.contrastText
    : theme.palette.text.primary,
  padding: grid,
  width: '50%',
  // maxHeight: '500px',
  // overflow: 'auto',
});

const ListInner = props => {
  return (
    <div
      style={{
        maxHeight: '500px',
        overflow: 'auto',
        paddingRight: grid,
      }}>
      {props.children}
    </div>
  );
};

const UserCardItem = ({ provided, snapshot, user, theme, viewItem }) => {
  return (
    <Card
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
          {user.firstName} {user.lastName}
        </Typography>
        {user.permissions &&
          user.permissions.map((perm, idx) => {
            return <Typography variant="caption">{perm}, </Typography>;
          })}
        <Button onClick={() => viewItem(user)}>View</Button>
      </div>
    </Card>
  );
};

const AddUserToList = ({
  id,
  selected,
  add,
  remove,
  me,
  loading,
  filters,
  selectedListLabel,
}) => {
  const droppableId1 = `${id}-droppable`;
  const droppableId2 = `${id}-droppable2`;
  const theme = useTheme();
  const [seconds, setSeconds] = useState(0);

  const [state, setState] = useState({
    items: [],
    selected: selected,
  });

  const mainDiv = isBrowser() ? document.documentElement : undefined;
  const setScrollToSmooth = () => {
    mainDiv.style['scroll-behavior'] = 'smooth';
  };
  const setScrollToAuto = () => {
    mainDiv.style['scroll-behavior'] = 'auto';
  };

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
    toast.info('ToDo: view user item');
  };

  const onDragStart = () => {
    setScrollToAuto();
  };

  const onDragEnd = result => {
    setScrollToSmooth();
    const { source, destination, draggableId } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    // from selected to items
    if (
      destination.droppableId === droppableId1 &&
      source.droppableId === droppableId2
    ) {
      const itemFromSelected = state.selected.find(
        slcted => slcted.id === draggableId
      );
      remove(itemFromSelected);
      // assume this item will be reomved and add to top of items list?
      setState({
        ...state,
        items: [itemFromSelected, ...state.items],
      });
      // remove(result);
      return;
    }

    // from items to selected
    if (
      destination.droppableId === droppableId2 &&
      source.droppableId === droppableId1
    ) {
      const itemFromList = state.items.find(
        slcted => slcted.id === draggableId
      );
      add(itemFromList);
      return;
    }
  };

  useEffect(() => {
    handleSetSelected();
  }, [selected]); // watch for objects in the list changed incase optimistic response gets it wrong

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <div
      id={id}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '16px',
      }}>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Droppable droppableId={droppableId2} isDropDisabled={loading}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver, theme)}>
              <Typography gutterBottom>
                {selectedListLabel ? selectedListLabel : 'Selected List'}{' '}
              </Typography>
              <ListInner>
                {state.selected.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                    isDragDisabled={loading}>
                    {(provided, snapshot) => (
                      <UserCardItem
                        provided={provided}
                        snapshot={snapshot}
                        user={item}
                        theme={theme}
                        viewItem={viewItem}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ListInner>
            </div>
          )}
        </Droppable>
        <Droppable droppableId={droppableId1} isDropDisabled={loading}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver, theme)}>
              <Typography gutterBottom>User List</Typography>
              <SearchUsers me={me} setHits={handleSetHits} filters={filters} />
              {state.items.length === 0 && (
                <Typography gutterBottom>No items. Use the search</Typography>
              )}
              <ListInner>
                {state.items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                    isDragDisabled={loading}>
                    {(provided, snapshot) => (
                      <UserCardItem
                        provided={provided}
                        snapshot={snapshot}
                        user={item}
                        theme={theme}
                        viewItem={viewItem}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ListInner>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default AddUserToList;
