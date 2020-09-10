import PropTypes from 'prop-types';
import React from 'react';
import dynamic from 'next/dynamic';

// https://github.com/bl00mber/react-phone-input-2
// Regions - https://github.com/bl00mber/react-phone-input-2#regions
// Area codes - https://github.com/bl00mber/react-phone-input-2#local-area-codes
// Predefined localization - https://github.com/bl00mber/react-phone-input-2#predefined-localization
// Local Area codes - https://github.com/bl00mber/react-phone-input-2#local-area-codes
// const NoSSRSMuiPhoneNumber = dynamic(() => import('material-ui-phone-number'), {
//   ssr: false,
// });

const NoSSRSMuiPhoneNumber = dynamic(() => import('material-ui-phone-number'), {
  ssr: false,
});

const PhoneInput = ({ id, name, label, onChange, ...rest }) => {
  return (
    <NoSSRSMuiPhoneNumber
      defaultCountry={'nz'}
      regions={['oceania']}
      name={name}
      label={label}
      onChange={v => onChange(v)}
      {...rest}
    />
  );
};

PhoneInput.propTypes = {
  id: PropTypes.any.isRequired,
  label: PropTypes.any.isRequired,
  name: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PhoneInput;
