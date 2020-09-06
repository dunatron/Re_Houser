import { ToastContainer, toast } from 'react-toastify';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const CustomToastContainer = () => {
  return (
    <ToastContainer
      rtl={false}
      style={{
        minWidth: '280px',
      }}
      closeButton={
        <div>
          <IconButton color={'primary'} aria-label="Delete">
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      }
    />
  );
};

export default CustomToastContainer;
