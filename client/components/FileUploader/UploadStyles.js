import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  upload: {
    display: 'flex',
    flexWrap: 'wrap',
    // flexDirection: 'column', // Do this for mobile
    flex: 1,
    alignItems: 'flex-start',
    textAlign: 'left',
    overflow: 'hidden',
    padding: theme.spacing(2),
    justifyContent: 'center',
    // maxWidth: '500px',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '16px',
    boxSizing: 'border-box',
    width: '100%',
  },
  files: {
    minWidth: '320px',
    marginLeft: '0px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '32px',
    },
    alignItems: 'flex-start',
    justifyItems: 'flex-start',
    flex: 1,
    overflowY: 'auto',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: '8px',
    paddingTop: '8px',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 0,
    },
  },
  title: {
    width: '100%',
    marginBottom: '32px',
    color: theme.palette.text.primary,
    fontSize: '18px',
  },
  filename: {
    fontSize: '16px',
    color: theme.palette.text.primary,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left',
    },
  },
  row: {
    display: 'flex',
    // flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'start',
    alignItems: 'center',
    // height: '50px',
    marginTop: '24px',
    overflow: 'hidden',
    boxSizing: 'border-box',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: '16px',
    },
  },
  checkIcon: {
    opacity: 0.5,
    marginLeft: '32px',
  },
  progressWrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginTop: '32px',
  },
}));

// button:disabled {
//   background: rgb(189, 189, 189);
//   cursor: default;
// }

export default useStyles;
