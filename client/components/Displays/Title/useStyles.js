import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      margin: props => theme.spacing(props.spacing, 0),
    },
  })
);

export default useStyles;
