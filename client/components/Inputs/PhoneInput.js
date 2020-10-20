import PropTypes from 'prop-types';
import React from 'react';
import dynamic from 'next/dynamic';

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
  id: PropTypes.any,
  label: PropTypes.any,
  name: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default PhoneInput;
