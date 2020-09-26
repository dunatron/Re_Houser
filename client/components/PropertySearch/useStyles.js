import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    // border: '2px solid red',
  },
  searchPanel: {
    display: 'flex',
    flex: '1 1 auto',
    flexWrap: 'wrap',
    // padding: '16px',
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.up('sm')]: {},
    [theme.breakpoints.up('md')]: {},
    [theme.breakpoints.up('lg')]: {},
  },
  leftSearchPanel: {
    // border: '2px solid yellow',
    flex: '1 1 auto',
    minWidth: '100%',
    // padding: '16px',
    [theme.breakpoints.up('sm')]: {},
    [theme.breakpoints.up('md')]: {
      minWidth: '50%',
    },
    [theme.breakpoints.up('lg')]: {},
  },
  rightSearchPanel: {
    // padding: '16px',
    width: '50%',
    flex: '1 1 auto',
    minWidth: '50%',
    minHeight: '300px',
    [theme.breakpoints.up('sm')]: {},
    [theme.breakpoints.up('md')]: {
      minWidth: '50%',
    },
    [theme.breakpoints.up('lg')]: {},
    '& > div:first-of-type': {
      //   border: '5px solid purple',
      height: '100%',
    },
  },
}));

export default useStyles;
