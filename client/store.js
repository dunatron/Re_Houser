// import React, { createContext, useReducer } from 'react';

// const initialState = {
//   newRentalAppraisalCount: 0,
//   newRentalApplicationsCount: 0,
//   newPropertiesCount: 0,
//   loginModalOpen: false,
//   chatsListOpen: false,
//   openChats: [],
//   activeChat: null,
// };
// const store = createContext(initialState);
// const { Provider } = store;

// const StateProvider = ({ children }) => {
//   const [state, dispatch] = useReducer((state, action) => {
//     switch (action.type) {
//       case 'setNewRentalAppraisalCount':
//         return {
//           ...state,
//           newRentalAppraisalCount: action.payload,
//         };
//       case 'updateState':
//         return {
//           ...state,
//           ...action.payload,
//         };
//       case 'openLoginModal':
//         return {
//           ...state,
//           loginModalOpen: true,
//         };
//       case 'closeLoginModal':
//         return {
//           ...state,
//           loginModalOpen: false,
//         };
//       case 'closeChat':
//         return {
//           ...state,
//           openChats: [
//             ...state.openChats.filter((c, i) => c.id !== action.payload),
//           ],
//         };
//       case 'openChat':
//         const openChatIds = state.openChats
//           ? state.openChats.map(c => c.id)
//           : [];

//         if (openChatIds.includes(action.payload.id))
//           return {
//             ...state,
//             activeChat: { ...action.payload },
//           };
//         return {
//           ...state,
//           openChats: [...state.openChats, { ...action.payload }],
//           activeChat: { ...action.payload },
//         };
//       case 'setActiveChat':
//         return {
//           ...state,
//           activeChat: action.payload ? { ...action.payload } : null,
//         };
//       case 'openChatsList':
//         return {
//           ...state,
//           chatsListOpen: action.payload,
//         };

//       default:
//         throw new Error();
//     }
//   }, initialState);

//   return <Provider value={{ state, dispatch }}>{children}</Provider>;
// };

// export { store, StateProvider };

// Main
// function combineReducers(reducerDict) {
//   const _initialState = getInitialState(reducerDict);
//   return function(state = _initialState, action) {
//     return Object.keys(reducerDict).reduce((acc, curr) => {
//       let slice = reducerDict[curr](state[curr], action);
//       return { ...acc, [curr]: slice };
//     }, state);
//   };
// }

// function useStore(rootReducer, state) {
//   const initialState = state || rootReducer(undefined, { type: undefined });
//   return useReducer(rootReducer, initialState);
// }

// // Usage
// function reducerA(state, action) {
//   console.log('State for reducer A => ', state);
// }
// function reducerB(state, action) {
//   console.log('State for reducer B => ', state);
// }
// function reducerC(state, action) {
//   console.log('State for reducer C => ', state);
// }

// const rootReducer = {
//   group1: combineReducers({ a: reducerA, b: reducerB }),
//   group2: reducerC,
// };

// // Use this in a Context Provider and get access to state and dispatch
// // anywhere by using useContext.
// const [state, dispatch] = useStore(rootReducer); // optional state object as second arg

// // Helpers
// function getInitialState(reducerDict) {
//   return Object.keys(reducerDict).reduce((acc, curr) => {
//     const slice = reducerDict[curr](undefined, { type: undefined });
//     return { ...acc, [curr]: slice };
//   }, {});
// }

/**
 * We will basically do a cheap store. initial state will just combine the states
 */

// so like

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
