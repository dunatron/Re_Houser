import { makeStyles } from '@material-ui/core/styles';
import ConnectedCheckBoxRefinementList from './CheckBoxList';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));
const ConnectedRefinements = ({ children, childrenBefore }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {childrenBefore && children}
      <ConnectedCheckBoxRefinementList attribute="rooms" operator="or" />
      <ConnectedCheckBoxRefinementList attribute="type" operator="or" />
      <ConnectedCheckBoxRefinementList
        attribute="outdoorFeatures"
        operator="or"
      />
      <ConnectedCheckBoxRefinementList
        attribute="indoorFeatures"
        operator="or"
      />
      {!childrenBefore && children}
    </div>
  );
};

export default ConnectedRefinements;
