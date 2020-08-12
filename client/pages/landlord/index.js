import OwnerProperties from '../../components/OwnerProperties/index';
import PleaseSignIn from '../../components/PleaseSignIn';
import ConfirmEmail from '../../components/ConfirmEmail';
import PageHeader from '../../components/PageHeader';
import { Typography } from '@material-ui/core';
import Dashboard from '../../components/Dashboard';
import LANDLORD_DASHBOARD_CONFIG from '../../lib/configs/landlordDashboardConfig';

const LandlordPage = props => {
  const {
    appData: { currentUser },
  } = props;
  const pleaseSignInMessage =
    'You must be signed in to manager your properties';
  return (
    <>
      <PageHeader
        title="Landlord Portal"
        intro="Take back control of your investment properties while still allowing a Property Manager to do the hard yards. 
        Rehouser is structured to show letting property status at every stage of the tenancy lifecycle and notify you of important 
        information at any stage. You can customise those notifications based on your preferences, so you can be as involved as you like."
        children={[
          <Typography gutterBottom>
            We do everything to ensure that your investment is managed
            effectively, acting as a Landlord on your behalf while you can keep
            a finger on the pulse of your investment throughout the tenancy.
          </Typography>,
          <Typography gutterBottom>
            All interactions with Tenants and Property Managers are completed
            via the Rehouser website to ensure a transparent and seamless
            tenancy.
          </Typography>,
          <Typography variant="h6" gutterBottom>
            Marketing of Properties
          </Typography>,
          <Typography gutterBottom>
            We can easily market your property, including an online marketing
            campaign to ensure or target audience is reached, this will be on
            our website, Facebook, and Realestate.co.nz
          </Typography>,
          <Typography variant="h6" gutterBottom>
            Tenant Selection
          </Typography>,
          <Typography gutterBottom>
            Each potential Tenant is required to sign up to the platform where
            they will need to provide employment details, rental history,
            previous landlords contact details, references, credit check, photo
            identification and Tenancy Tribunal check. A face to face meeting
            will then need to be booked with a Rehouser Property Manager for
            final vetting. All information will be stored on the platform where
            it will be readily available to the Property Owner.
          </Typography>,
        ]}
        metaData={{
          title: 'Landlord Portal',
          content:
            'Manage your property portfolio from rehousers landlord portal. It provides you with the tools and data to manage all of your properties',
        }}
      />
      <PleaseSignIn
        currentUser={currentUser}
        message={pleaseSignInMessage}
        alert={
          <p>
            <strong>{pleaseSignInMessage}</strong>
          </p>
        }>
        <ConfirmEmail me={currentUser.data ? currentUser.data.me : null}>
          <Dashboard
            config={LANDLORD_DASHBOARD_CONFIG}
            elevation={10}
            heading="Landlord Portal"
            intro="Here is the tenant portal dashboard"
          />
        </ConfirmEmail>
      </PleaseSignIn>
    </>
  );
};

export default LandlordPage;
