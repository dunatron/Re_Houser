const counterRed = {
  increment: (oldState, action) => ({
    ...oldState,
    counter: oldState.counter + 1,
  }),
  decrement: (oldState, action) => ({
    ...oldState,
    counter: oldState.counter - 1,
  }),
};

export default ChatsReducer;
