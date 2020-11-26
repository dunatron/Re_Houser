import PropTypes from 'prop-types';
import TeamComponent from '@/Components/Team';
import { SITE_NAME } from '@/Lib/const';
import PageHeader from '@/Components/PageHeader';
import TeamInfoText from '@/Components/Team/TeamInfoText';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const AboutUsPage = () => {
  return (
    <>
      <PageHeader
        title="About Us"
        metaData={{
          title: `${SITE_NAME} | About Us`,
          content: `${SITE_NAME} team who make the platform happen`,
        }}
        children={[<TeamInfoText key={1} />]}
      />
      <TeamComponent />
    </>
  );
};

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx.req.headers);
  await apolloClient.query({
    query: CURRENT_USER_QUERY,
  });
  return addApolloState(apolloClient, {
    props: {},
  });
}

AboutUsPage.propTypes = {};

export default AboutUsPage;
