import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    margin: theme.spacing(0, 0, 1, 0),
  },
  items: {},
  chip: {
    margin: theme.spacing(0, 1, 1, 0),
  },
});

const useStyles = makeStyles(styles);

export default useStyles;
