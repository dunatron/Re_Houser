import { useMutation } from '@apollo/client';

// mutation
import { UPDATE_USER_MUTATION } from '../graphql/mutations';

// material-ui
import {
  Input,
  Typography,
  IconButton,
  Icon,
  Badge,
  Button,
  Tooltip,
} from '@material-ui/core';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

const SubscriberBell = ({ me, variable, title }) => {
  const handleOnCompleted = () => {};

  const [updateUser, { loading, error, data }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      onCompleted: handleOnCompleted,
    }
  );

  if (!me) return null;
  const { adminSettings } = me;
  if (!adminSettings) return null;
  return (
    <div>
      <Tooltip
        title={
          adminSettings[variable]
            ? `Subscribed: Click to unsubscribe from ${title}`
            : `Unsubscribed: Click to subscribe to ${title}`
        }
        aria-label="add">
        <IconButton
          onClick={() =>
            updateUser({
              variables: {
                data: {
                  adminSettings: {
                    update: {
                      [variable]: !adminSettings[variable],
                    },
                  },
                },
              },
            })
          }>
          <NotificationsActiveIcon
            color={adminSettings[variable] ? 'secondary' : 'default'}
          />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default SubscriberBell;
