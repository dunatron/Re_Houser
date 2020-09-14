import PropTypes from 'prop-types';
import TeamComponent from '@/Components/Team';
import { SITE_NAME } from '@/Lib/const';
import PageHeader from '@/Components/PageHeader';
import TeamInfoText from '@/Components/Team/TeamInfoText';

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
