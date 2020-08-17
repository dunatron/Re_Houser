import Dashboard from '../../components/Dashboard';
import INFO_DASHBOARD_CONFIG from '../../lib/configs/infoDashboardConfig';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/Contact/ContactForm';
import RChat from '../../components/RChat';
import ChatsListScreen from '../../components/ChatsListScreen';

const InfoDashboardPage = props => {
  console.log('props for Messages page => ', props);

  const { data, loading, error } = props.appData.currentUser;

  const me = data ? data.me : null;
  return (
    <>
      <PageHeader
        title="Messages"
        intro="This is where you can find a list of chats from people you have interacted with on the system"
        metaData={{
          title: 'Messages',
          content:
            'This is where you can find a list of chats from people you have interacted with on the system',
        }}
      />
      <ChatsListScreen me={me} />
      <RChat />
    </>
  );
};

export default InfoDashboardPage;
