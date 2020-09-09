import PropTypes from 'prop-types';
import TeamComponent from '../../components/Team';
import { SITE_NAME } from '../../lib/const';
import PageHeader from '../../components/PageHeader';
import TeamInfoText from '../../components/Team/TeamInfoText';

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

AboutUsPage.propTypes = {};

export default AboutUsPage;
