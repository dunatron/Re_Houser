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

// material-icons
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

const SubscriberBell = ({ me, variable, title }) => {
  const handleOnCompleted = () => {};

  const [updateUser, { loading, error, data }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      onCompleted: handleOnCompleted,
      //   variables: {
      //     data: {
      //       update: {
      //         ...updates,
      //       },
      //     },
      //   },
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
