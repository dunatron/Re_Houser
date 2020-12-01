import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mapWrapper: {
    position: 'relative',
    height: '240px',
    [theme.breakpoints.up('md')]: {
      height: '334px',
    },
  },
  loadingContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default useStyles;
