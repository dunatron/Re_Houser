import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  listItem: {
    // backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  listItemSelected: {
    background: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  listItemHover: {
    background: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  listItemIcon: {},
  listItemText: {
    color: theme.palette.secondary.main,
  },
  listItemTextCurrent: {
    color: theme.palette.primary.contrastText,
  },
  listItemDivider: {
    borderBottom: `2px solid ${theme.palette.secondary.contrastText}`,
  },
}));

export default useStyles;
