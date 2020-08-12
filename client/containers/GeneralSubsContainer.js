import AdminAlertNewRentalApplicationSub from '../components/SubscriptionComponents/AdminAlertNewRentalApplicationSub';
import AdminNewPropertyAppraisalSub from '../components/SubscriptionComponents/AdminNewPropertyAppraisalSub';
import GeneralUserUpdatesSub from '../components/SubscriptionComponents/GeneralUserUpdatesSub';
import User from '../components/User/index';

const GeneralSubsContainer = props => {
  console.log('GeneralUserUpdatesSub: Container');
  return (
    <>
      <User>
        {({ data }) => {
          const me = data ? data.me : null;
          if (!me) return null;
          return (
            <>
              <GeneralUserUpdatesSub me={me} />
            </>
          );
        }}
      </User>
    </>
  );
};

export default GeneralSubsContainer;
