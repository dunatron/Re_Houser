import PropTypes from "prop-types";
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

import { Typography } from '@material-ui/core';

const LeaseChat = ({ leaseId }) => {
  return (
    <div>
      <Typography variant="h6">
        You may leave comments here that will persisit across the lease
      </Typography>
      <Comments href={`http://www.facebook.com/rehousernz/lease/${leaseId}`} />
    </div>
  );
};

LeaseChat.propTypes = {
  leaseId: PropTypes.any
}

export default LeaseChat;
