import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    // border: '2px solid red',
  },
  searchPanel: {
    display: 'flex',
    flex: '1 1 auto',
    // padding: '16px',
    backgroundColor: theme.palette.secondary.main,
  },
  leftSearchPanel: {
    // border: '2px solid yellow',
    flex: '1 1 auto',
    // padding: '16px',
  },
  rightSearchPanel: {
    // padding: '16px',
    flex: '1 1 auto',
    minWidth: '50%',
    minHeight: '300px',
    '& > div:first-of-type': {
      //   border: '5px solid purple',
      height: '100%',
    },
  },
}));

export default useStyles;
