import React, { createContext, useReducer } from 'react';

const initialState = {
  newRentalAppraisalCount: 0,
  newRentalApplicationsCount: 0,
  newPropertiesCount: 0,
  loginModalOpen: false,
  sideBarOpen: false,
  chatsListOpen: false,
  openChats: [],
  activeChat: null,
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'setNewRentalAppraisalCount':
        return {
          ...state,
          newRentalAppraisalCount: action.payload,
        };
      case 'updateState':
        return {
          ...state,
          ...action.payload,
        };
      case 'openLoginModal':
        return {
          ...state,
          loginModalOpen: true,
        };
      case 'closeLoginModal':
        return {
          ...state,
          loginModalOpen: false,
        };
      case 'closeChat':
        return {
          ...state,
          openChats: [
            ...state.openChats.filter((c, i) => c.id !== action.payload),
          ],
        };
      case 'openChat':
        const openChatIds = state.openChats
          ? state.openChats.map(c => c.id)
          : [];

        if (openChatIds.includes(action.payload.id))
          return {
            ...state,
            activeChat: { ...action.payload },
          };
        return {
          ...state,
          openChats: [...state.openChats, { ...action.payload }],
          activeChat: { ...action.payload },
        };
      case 'setActiveChat':
        return {
          ...state,
          activeChat: action.payload ? { ...action.payload } : null,
        };
      case 'openChatsList':
        return {
          ...state,
          chatsListOpen: action.payload,
        };

      default:
        throw new Error();
    }
  }, initialState);

  console.log('render: store.js');

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
