import { atom } from 'recoil';

const loginModalState = atom({
  key: 'loginModalState',
  default: {
    open: false,
    tabIndex: 0,
  },
});

// const setLoginModalTabIdx = maybe we can do this from here?

export { loginModalState };
