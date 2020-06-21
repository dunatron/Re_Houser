import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    // [theme.breakpoints.up('sm')]: {
    //   width: theme.sideBarWidth,
    //   flexShrink: 0,
    // },
    [theme.breakpoints.up('lg')]: {
      width: theme.sideBarWidth,
      flexShrink: 0,
    },
  },

  appBar: {
    // marginLeft: theme.sideBarWidth,
    // [theme.breakpoints.up('sm')]: {
    //   width: `calc(100% - ${theme.sideBarWidth}px)`,
    // },
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${theme.sideBarWidth}px)`,
    },
  },
  menuButton: {
    // marginRight: theme.spacing(2),
    // [theme.breakpoints.up('sm')]: {
    //   display: 'none',
    // },
    marginLeft: 0,
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  // toolbar: theme.mixins.toolbar,
  toolbar: {
    ...theme.mixins.toolbar,
  },
  logoContainer: {},
  logo: {
    color: theme.palette.primary.main,
    fontSize: '36px',
    display: 'block',
    width: '100%',
    textAlign: 'center',
  },
  routeablePart: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  drawerPaper: {
    width: theme.sideBarWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    maxWidth: '100%',
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(1),
      // maxWidth: 'calc(100% - 240px)',
      maxWidth: `calc(100% - ${theme.sideBarWidth}px)`,
    },
    // [theme.breakpoints.up('sm')]: {
    //   // maxWidth: 'calc(100% - 240px)',
    //   maxWidth: `calc(100% - ${theme.sideBarWidth}px)`,
    // },
  },
}));

export default useStyles;
