import PropTypes from 'prop-types';
import { useContext } from 'react';
import Modal from '@/Components/Modal';
import SuperLogin from '@/Components/SuperLogin';
import { store } from '@/Store/index';

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
