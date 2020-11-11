import { ToastContainer, toast } from 'react-toastify';

const CustomToastContainer = () => {
  return (
    <ToastContainer
      rtl={false}
      style={{
        minWidth: '280px',
      }}
      position="top-right"
      autoClose={10000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default CustomToastContainer;
