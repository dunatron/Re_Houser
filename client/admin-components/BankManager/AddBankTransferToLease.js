import { useState, useEffect } from 'react';

import DelayedInput from '@/Components/Inputs/DelayedInput';

/**
 * Make a lazy useLazyQuery call to getLeases where bankRef = searchText.
 * useEffect will call when searchText Changes and will fire the query if searchText is different
 */
const AddBankTransferToLease = () => {
  const [searchText, setSearchText] = useState('');
  const inputProps = {
    step: 300,
    min: 6,
    maxlength: '7',
  };

  const handleSearchChange = value => {
    if (value.length >= 7) setSearchText(value);
  };

  useEffect(() => {
    if (searchText.length >= 7) {
      //   alert('Fire of lazy query');
    }
    return () => {
      //   cleanup
    };
  }, [searchText]);

  return (
    <div>
      <DelayedInput
        fullwidth={true}
        label="Search lease via bankRef"
        timeout={1000}
        onChanged={handleSearchChange}
        inputProps={inputProps}
        helperText="Will search on 7 characters and after 1s"
      />
    </div>
  );
};

export default AddBankTransferToLease;
