import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  listItem: {
    // background: 'red',
  },
  listItemCurrent: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  listItemIcon: {},
  listItemText: {},
  listItemTextCurrent: {
    color: theme.palette.primary.contrastText,
  },
}));

export default useStyles;
