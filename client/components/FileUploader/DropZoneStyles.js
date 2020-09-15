import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  dropzone: {
    height: '170px',
    width: '170px',
    backgroundColor: theme.palette.background.paper,
    border: '2px dashed rgb(187, 186, 186)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontSize: '16px',
    transition: 'background-color 0.3s linear',
  },
  highlight: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: `2px dashed ${theme.palette.primary.contrastText}`,
  },
  icon: {
    opacity: 0.3,
    height: '64px',
    width: '64px',
  },
  fileInput: {
    display: 'none',
  },
}));

export default useStyles;
