import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  flipCard: {
    minHeight: '180px',
    padding: theme.spacing(2),
  },
  flipHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  upload: {
    display: 'flex',
    flexWrap: 'wrap',
    // flexDirection: 'column', // Do this for mobile
    flex: 1,
    alignItems: 'flex-start',
    textAlign: 'left',
    overflow: 'hidden',

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
  content: {
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
  files: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  title: {
    width: '100%',
    marginBottom: '32px',
    color: theme.palette.text.primary,
    fontSize: '18px',
  },
  filename: {
    fontSize: '14px',
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
    marginTop: '24px',
    overflow: 'hidden',
    boxSizing: 'border-box',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: '5px',
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
  footerActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'left',
    },
  },
  button: {
    marginTop: '32px',
  },
  uploadCount: {
    fontSize: '16px',
    marginTop: '16px',
  },
}));

// button:disabled {
//   background: rgb(189, 189, 189);
//   cursor: default;
// }

export default useStyles;
