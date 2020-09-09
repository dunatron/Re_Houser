import React from 'react';
import dynamic from 'next/dynamic';

// https://github.com/bl00mber/react-phone-input-2
// Regions - https://github.com/bl00mber/react-phone-input-2#regions
// Area codes - https://github.com/bl00mber/react-phone-input-2#local-area-codes
// Predefined localization - https://github.com/bl00mber/react-phone-input-2#predefined-localization
// Local Area codes - https://github.com/bl00mber/react-phone-input-2#local-area-codes
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

export default PhoneInput;
