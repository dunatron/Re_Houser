import { makeStyles, useTheme } from '@material-ui/core/styles';
import { fade, lighten } from '@material-ui/core/styles/colorManipulator';

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

    // MAYBE THIS FFS
    rehouserAppBar: {
      // backgroundColor: props =>
      //   props.noTransparency
      //     ? theme.overrides.MuiAppBar
      //       ? `${theme.overrides.MuiAppBar.colorPrimary.backgroundColor} !important`
      //       : `${theme.palette.background.paper} !important`
      //     : 'transparent !important',
      width: '100%',
      [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${theme.sideBarWidth}px) !important`,
      },
    },
    appBarTransparent: {
      backgroundColor: 'transparent !important',
    },
    appBarSolid: {
      backgroundColor: `${theme.palette.background.paper} !important`,
      // backgroundColor: theme.overrides.MuiAppBar
      //   ? `${theme.overrides.MuiAppBar.colorPrimary.backgroundColor} !important`
      //   : `${theme.palette.background.paper} !important`,
    },
    menuButton: {
      marginLeft: 0,

      [theme.breakpoints.up('lg')]: {
        display: 'none',
      },
    },
    backBtnRoot: {
      // color: 'red',
    },
    toolbar: {
      ...theme.mixins.toolbar,
    },
    logoContainer: {
      borderBottom: `2px solid ${theme.palette.secondary.contrastText}`,
      paddingBottom: '32px',
      paddingTop: '32px',
      '&:hover': {
        cursor: 'pointer',
      },
    },
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
      backgroundColor: 'rgb(212,220,231)',
      // backgroundColor: lighten(theme.palette.secondary.light, 0.7), // lighten by 50%. 1.0 is white
      // backgroundColor: theme.palette.secondary.light,
      // backgroundColor: theme.palette.secondary.light,
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
