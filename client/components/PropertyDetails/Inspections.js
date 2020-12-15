import { useState } from 'react';
import PropTypes from 'prop-types';
import InspectionsTable from '@/Components/Tables/InspectionsTable';
import CreateInspection from '@/Components/Inspections/CreateInspection';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

const InspectionsTab = ({ property, me, isAgent }) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      {isAgent && (
        <CreateInspection
          connectName="property"
          connectId={property.id}
          property={property}
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
            Only "Agents" can add new inspections!
          </Alert>
        </Collapse>
      )}

      <InspectionsTable
        where={{
          property: {
            id: property.id,
          },
        }}
      />
    </>
  );
};

InspectionsTab.propTypes = {
  me: PropTypes.any,
  property: PropTypes.any,
};

export default InspectionsTab;
