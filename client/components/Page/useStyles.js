import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  console.log('DUNATRON CHeck the theme and for side ', theme);
  console.log('DUNATRON THE THEME FROM PAGE useStyles => ', theme);
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
      border: '5px solid brown',
      [theme.breakpoints.up('lg')]: {
        border: '5px solid gold',
        width: `calc(100% - ${theme.sideBarWidth}px !important)`,
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
    toolbar: {
      ...theme.mixins.toolbar,
    },
    logoContainer: {
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
