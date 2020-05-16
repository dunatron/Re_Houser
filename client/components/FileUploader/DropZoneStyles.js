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
    // backgroundColor: 'rgb(188, 185, 236)',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: `2px dashed ${theme.palette.primary.contrastText}`,

    // border: '3px solid red',
    // backgroundColor: 'red',
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

// const ErrorButton = withStyles(theme => ({
//   root: {
//     color: theme.palette.getContrastText(red[500]),
//     backgroundColor: red[500],
//     '&:hover': {
//       backgroundColor: red[700],
//     },
//   },
// }))(Button);

export default useStyles;
