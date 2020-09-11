import PropTypes from 'prop-types';
import { useContext } from 'react';
import Modal from '../../components/Modal';
import SuperLogin from '../../components/SuperLogin';
import { store } from '../../store';

/**
 * I DO WONDER if the LoginModal requiring store stuff does this.
 * Having a global state is not much fun if everythung rerenders when a store prop changes
 */
// const LoginModal = () => {
//   const globalStore = useContext(store);
//   const { dispatch, state } = globalStore;

//   const _close = () => dispatch({ type: 'closeLoginModal' });

//   console.log('render: LoginModal');

//   return (
//     <Modal open={state.loginModalOpen} close={_close}>
//       <SuperLogin handleSignedIn={_close} />
//     </Modal>
//   );
// };

// const LoginModal = React.memo(props => {
//   const globalStore = useContext(store);
//   const { dispatch, state } = globalStore;

//   const _close = () => dispatch({ type: 'closeLoginModal' });

//   console.log('render: LoginModal');

//   return (
//     <Modal open={state.loginModalOpen} close={_close}>
//       <SuperLogin handleSignedIn={_close} />
//     </Modal>
//   );
// });

/**
 * CONSUMER RERENDER ISSUES https://github.com/facebook/react/issues/15156
 */

const LoginModal = React.memo(props => {
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;

  const _close = () => dispatch({ type: 'closeLoginModal' });

  return <CheapLoginModal open={state.loginModalOpen} handleClose={_close} />;
});

const CheapLoginModal = React.memo(props => (
  <Modal
    title="Login / Signup / Reset"
    open={props.open}
    close={props.handleClose}>
    <SuperLogin handleSignedIn={props.handleClose} />
  </Modal>
));

CheapLoginModal.propTypes = {
  handleClose: PropTypes.any.isRequired,
  open: PropTypes.any.isRequired,
};

export default LoginModal;
