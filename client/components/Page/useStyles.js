import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('lg')]: {
        width: theme.sideBarWidth,
        flexShrink: 0,
      },
    },

    appBar: {
      backgroundColor: props =>
        props.noTransparency
          ? theme.overrides.MuiAppBar
            ? theme.overrides.MuiAppBar.colorPrimary.backgroundColor
            : theme.palette.background.paper
          : 'transparent',
      [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${theme.sideBarWidth}px)`,
      },
    },
    menuButton: {
      marginLeft: 0,
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      },
    },
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
      position: 'relative',
      flexGrow: 1,
      padding: theme.spacing(1),
      maxWidth: '100%',
      [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(1),
        maxWidth: `calc(100% - ${theme.sideBarWidth}px)`,
      },
    },
  };
});

export default useStyles;
