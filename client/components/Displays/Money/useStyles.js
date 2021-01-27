import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      margin: theme.spacing(0, 0, 1, 0),
      // alignItems: props =>
      //   props.orientation === 'vertical' ? `flex-start` : `flex-end`,
      alignItems: props =>
        props.orientation === 'vertical' ? `flex-start` : `center`,
      flexDirection: props =>
        props.orientation === 'vertical' ? `column` : `row`,
    },
    title: {
      margin: theme.spacing(0, 1, 0, 0),
    },
  })
);

export default useStyles;
