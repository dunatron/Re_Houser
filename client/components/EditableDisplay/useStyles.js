import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  editableDisplay: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px',
  },
  displayHeader: { display: 'flex', alignItems: 'center' },
}));

export default useStyles;
