import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgb(183, 155, 229)',
    borderRadius: '5px',
  },
  progress: {
    backgroundColor: 'rgba(103, 58, 183, 1)',
    height: '100%',
    margin: 0,
    borderRadius: '5px',
  },
}));

export default useStyles;
