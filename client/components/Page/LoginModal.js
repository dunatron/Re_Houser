import { useContext } from 'react';
import Modal from '../../components/Modal';
import SuperLogin from '../../components/SuperLogin';
import { store } from '../../store';

const LoginModal = () => {
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;

  const _close = () => dispatch({ type: 'closeLoginModal' });

  console.log('RENDER=====LOGIN MODAL RENDER=====');

  return (
    <Modal open={state.loginModalOpen} close={_close}>
      <SuperLogin handleSignedIn={_close} />
    </Modal>
  );
};

export default LoginModal;
