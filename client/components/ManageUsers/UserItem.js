import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import RPaper from '@/Styles/RehouserPaper';
import UserDetails from './UserDetails';
import useStyles from './useStyles';

const UserItem = ({ user, me, isWizard }) => {
  const classes = useStyles();
  return (
    <RPaper className={classes.root}>
      <Box className={classes.details}>
        <Typography className={classes.detailItem} variant="body2">
          {user.firstName} {user.lastName}
        </Typography>
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
      <UserDetails userId={user.id} />
    </RPaper>
  );
};

export default UserItem;
