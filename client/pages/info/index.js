import Dashboard from '../../components/Dashboard';
import INFO_DASHBOARD_CONFIG from '../../lib/configs/infoDashboardConfig';

const InfoDashboardPage = () => {
  return (
    <>
      <Dashboard
        config={INFO_DASHBOARD_CONFIG}
        elevation={0}
        heading="Rehouser Info"
        intro="You can find sections with different information about rehouser and how things work including our policies"
      />
    </>
  );
};

export default InfoDashboardPage;
