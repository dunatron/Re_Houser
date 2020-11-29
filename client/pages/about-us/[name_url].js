import PropTypes from 'prop-types';

import TEAM_CONFIG from '@/Lib/configs/teamConfig';
import TeamMember from '@/Components/Team/TeamMember';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const TeamMemberPage = ({ query: { name_url } }) => {
  // get the name from query param. use it to find trhe subUrl and pass that member in
  const nameParamLowercase = name_url.toLowerCase();

  const member = TEAM_CONFIG.find(item => item.subUrl === nameParamLowercase);

  if (!member) return `No team member for ${name}`;

  return <TeamMember member={member} />;
};

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx);
  await apolloClient.query({
    query: CURRENT_USER_QUERY,
  });
  return addApolloState(apolloClient, {
    props: {
      query: ctx.query,
    },
  });
}

TeamMemberPage.propTypes = {
  query: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default TeamMemberPage;
