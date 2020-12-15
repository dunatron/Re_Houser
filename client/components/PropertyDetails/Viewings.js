import { useState } from 'react';
import PropTypes from 'prop-types';
import Viewings from '@/Components/Viewings';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

const PropertyViewings = ({ propertyId, me, isAgent }) => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      {isAgent && (
        <Viewings
          propertyId={propertyId}
          me={me}
          where={{
            property: {
              id: propertyId,
            },
          }}
        />
      )}
      {!isAgent && (
        <Collapse in={open}>
          <Alert
            severity="info"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }>
            Only "Agents" can create viewings!
          </Alert>
        </Collapse>
      )}
    </div>
  );
};

PropertyViewings.propTypes = {
  me: PropTypes.any,
  propertyId: PropTypes.any,
};

export default PropertyViewings;
