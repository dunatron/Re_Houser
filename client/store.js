import React, { createContext, useReducer } from 'react';

const initialState = {
  newRentalAppraisalCount: 0,
  newRentalApplicationsCount: 0,
  newPropertiesCount: 0,
  loginModalOpen: false,
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
      // const newState = // do something with the action
      // return newState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
