import Dashboard from '../../components/Dashboard';
import INFO_DASHBOARD_CONFIG from '../../lib/configs/infoDashboardConfig';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/Contact/ContactForm';

const InfoDashboardPage = () => {
  return (
    <>
      <PageHeader
        title="Info"
        intro="You can find sections with different information about Rehouser and how things work including our policies"
        metaData={{
          title: 'info',
          content:
            'Information about different entry points into more information about specific system function',
        }}
      />
      <Dashboard
        config={INFO_DASHBOARD_CONFIG}
        elevation={0}
        heading=""
        intro=""
      />
      <ContactForm />
    </>
  );
};

export default InfoDashboardPage;
