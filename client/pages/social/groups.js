import {
  Share,
  ShareButton,
  Initialize,
  Comments,
  Page,
  CustomChat,
  SendToMessenger,
  Subscribe,
  Status,
  CommentsCount,
  Group,
} from 'react-facebook';
import PropTypes from 'prop-types';

const groupsConf = [
  {
    label: 'Dunedin',
    href:
      'https://www.facebook.com/groups/1188617168164715/?source_id=115899600192696',
  },
];

const SocialGroupsPage = () => {
  return (
    <div>
      {/* Dunedin Group */}

      {groupsConf.map((conf, confIdx) => {
        return (
          <Group
            key={confIdx}
            href={conf.href}
            width="300"
            showSocialContext={true}
            showMetaData={true}
            skin="light"
          />
        );
      })}
    </div>
  );
};

SocialGroupsPage.propTypes = {};

export default SocialGroupsPage;
