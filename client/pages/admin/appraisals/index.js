import AppraisalManager from '../../../components/AppraisalManager';

const AppraisalsPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return <AppraisalManager />;
};

export default AppraisalsPage;
