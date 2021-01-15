import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { PROPERTY_LEASES_QUERY } from '@/Gql/queries';

// third party components
import {
  Typography,
  ButtonGroup,
  Button,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from '@material-ui/core';

// components
import Error from '@/Components/ErrorMessage';
import Loading from '@/Components/Loader';
import SplitButtonGroup from '@/Components/Buttons/SplitButtonGroup';
import Modal from '@/Components/Modal';
import DelayedInput from '@/Components/Inputs/DelayedInput';
import LeaseManager from '@/Components/LeaseManager';
import ChargesTable from '@/Components/Tables/ChargesTable';
import PaymentsTable from '@/Components/Tables/PaymentsTable';
import EditableDisplayItems from '@/Components/EditableDisplay/EditableDisplayItems';
import PROPERTY_LEASE_DETAILS_EDITABLE_DISPLAY_CONF from '@/Lib/configs/editableDisplays/leaseDetails';

// local components
import AddManualPayment from './AddManualPayment';
import ChargeLeaseWallet from './ChargeLeaseWallet';
import RehouserPaper from '@/Styles/RehouserPaper';
import { formatCentsToDollarsVal } from '@/Lib/formatCentsToDollars';

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

  const [searchLeases, { called, loading, data, error }] = useLazyQuery(
    PROPERTY_LEASES_QUERY,
    {
      fetchPolicy: 'network-only', // simply becaus emutation isnt updating lazyQuery. at very least should retrigger network fetch
      partialRefetch: true,
    }
  );

  const handleSearchChange = value => {
    if (value.length >= 7) setSearchText(value);
  };

  useEffect(() => {
    if (searchText.length >= 7) {
      searchLeases({
        variables: {
          where: {
            bankRef: searchText,
          },
        },
      });
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
      <Error error={error} />
      <LeaseList leases={data ? data.propertyLeases : []} loading={loading} />
    </div>
  );
};

const LeaseWalletBalance = ({ wallet }) => {
  return (
    <RehouserPaper>
      <Typography>Lease Wallet</Typography>
      <Typography>id: {wallet.id}</Typography>
      <Typography>balance: {formatCentsToDollarsVal(wallet.amount)}</Typography>
    </RehouserPaper>
  );
};

const ViewCharges = ({ wallet }) => {
  return (
    <div>
      <ChargesTable
        walletId={wallet.id}
        where={{
          wallet: {
            id: wallet.id,
          },
        }}
      />
    </div>
  );
};

const ViewPayments = ({ wallet }) => {
  return (
    <div>
      <PaymentsTable
        walletId={wallet.id}
        where={{
          wallet: {
            id: wallet.id,
          },
        }}
      />
    </div>
  );
};

const splitBtnOptions = [
  'Add Payment',
  'View Payments',
  'View Charges',
  'Lease Manager',
  'Lease Details',
  'Charge Lease Wallet',
];

const defaultModalContentIndex = 0;

const getModalContent = ({ index, lease, closeModal, ...rest }) => {
  switch (index) {
    case 0:
      return (
        <AddManualPayment lease={lease} onCompleted={data => closeModal()} />
      );
    case 1:
      return <ViewPayments wallet={lease.wallet} />;
    case 2:
      return <ViewCharges wallet={lease.wallet} />;
    case 3:
      return <LeaseManager leaseId={lease.id} />;
    case 4:
      return (
        <EditableDisplayItems
          __typename="PropertyLease"
          data={lease}
          items={PROPERTY_LEASE_DETAILS_EDITABLE_DISPLAY_CONF}
          where={{ id: lease.id }}
          disableEdit={true}
        />
      );
    case 5:
      return (
        <ChargeLeaseWallet lease={lease} onCompleted={data => closeModal()} />
      );
    default:
      return 'Unknown step';
  }
};

const LeaseStrip = ({ lease }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [contentIndex, setContentIndex] = useState(defaultModalContentIndex);

  const handleCloseModal = () => setModalOpen(false);

  const handleOpenSplitOption = index => {
    setContentIndex(index);
    setModalOpen(true);
  };

  return (
    <RehouserPaper>
      <SplitButtonGroup
        defaultIndex={defaultModalContentIndex}
        options={splitBtnOptions}
        onClick={handleOpenSplitOption}
      />

      <Typography gutterBottom>ID: {lease.id}</Typography>
      <Typography gutterBottom>Stage: {lease.stage}</Typography>
      <Typography gutterBottom>Location: {lease.property.location}</Typography>
      <LeaseWalletBalance wallet={lease.wallet ? lease.wallet : {}} />

      <Modal
        open={modalOpen}
        close={handleCloseModal}
        title={splitBtnOptions[contentIndex]}>
        {getModalContent({
          index: contentIndex,
          lease: lease,
          closeModal: handleCloseModal,
        })}
      </Modal>
    </RehouserPaper>
  );
};

const LeaseList = ({ leases, loading }) => {
  return (
    <>
      {loading && <Loading text="Loading Leases" loading={loading} />}
      {leases.length > 0 && (
        <div>
          {leases.map((l, i) => (
            <LeaseStrip lease={l} />
          ))}
        </div>
      )}
    </>
  );
};

export default AddBankTransferToLease;
