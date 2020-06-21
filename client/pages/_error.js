import PageHeader from '../components/PageHeader';

const LookPage = props => (
  <PageHeader
    title="Page not found"
    intro="This page does not exist"
    metaData={{
      title: 'rehouser | page not found',
      content: 'Rehouser page not found',
    }}
  />
);

export default LookPage;
