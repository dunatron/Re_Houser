import PropTypes from 'prop-types';
import Modal from '@/Components/Modal';
import SuperLogin from '@/Components/SuperLogin';
import { useRecoilState } from 'recoil';
import { loginModalState } from '@/Recoil/loginModalState';

const LoginModal = props => {
  const [loginModal, setLoginModal] = useRecoilState(loginModalState);

  const _close = () => {
    setLoginModal({
      ...loginModal,
      open: false,
    });
  };

  const handleSignedIn = data => {
    _close();
  };

  return (
    <Modal
      title="Login / Signup / Reset"
      open={loginModal.open}
      close={_close}
      disableBackdrop>
      <SuperLogin handleSignedIn={handleSignedIn} />
    </Modal>
  );
};

export default LoginModal;
