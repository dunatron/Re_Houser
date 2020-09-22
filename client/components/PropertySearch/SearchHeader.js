import CustomSearchBox from './CustomSearchBox';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));

const SearchHeader = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography color="inherit" variant="h4">
        ReHouser
      </Typography>
      <Typography color="inherit" variant="body1">
        Find my happy home
      </Typography>
      <CustomSearchBox />
    </div>
  );
};

export default SearchHeader;
