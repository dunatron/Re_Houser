import React, { createContext, useReducer } from 'react';

const initialState = [
  {
    key: 'BLM',
    text: 'Black Lives Matter Movement',
    url: 'https://blacklivesmatter.com/',
    type: 'offsite',
  },
  {
    key: 'example',
    text: 'Landlord Portal Promotion',
    url: '/landlord/properties/add',
    type: 'onsite',
  },
];
const announcementStore = createContext(initialState);
const { Provider } = announcementStore;

const AnnouncementProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'addAnnouncement':
        return [...state, action.payload];
      case 'rmAnnouncement':
        return [...state.filter((item, i) => action.payload !== i)];
      case 'rmAnnouncementByKey':
        return [...state.filter((item, i) => action.payload !== item.key)];
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { announcementStore, AnnouncementProvider };
