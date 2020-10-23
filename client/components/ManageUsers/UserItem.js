import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Avatar } from '@material-ui/core';
import RPaper from '@/Styles/RehouserPaper';
import UserDetails from './UserDetails';
import useStyles from './useStyles';
import Image from 'material-ui-image';

const UserItem = ({ user, me, isWizard }) => {
  const classes = useStyles();
  return (
    <RPaper className={classes.root}>
      <Box className={classes.details}>
        <Box className={classes.detailItem}>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
            }}>
            {user.profilePhoto && (
              <Avatar
                style={{
                  marginRight: '16px',
                }}
                alt={`${user.firstName} ${user.lastName}`}
                src={user.profilePhoto && user.profilePhoto.url}
              />
            )}
            <Typography variant="body2">
              {user.firstName} {user.lastName}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.detailItem}>{user.email}</Box>
        <Typography className={classes.detailItem} variant="body2">
          Permissions:{' '}
          {user.permissions.map((perm, idx) => {
            return (
              <Box key={idx} component="span">
                {perm},{' '}
              </Box>
            );
          })}
        </Typography>
      </Box>
      <UserDetails userId={user.id} me={me} />
    </RPaper>
  );
};

export default UserItem;
