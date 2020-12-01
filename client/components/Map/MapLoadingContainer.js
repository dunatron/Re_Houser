import useStyles from './useStyles';
import Loader from '@/Components/Loader';

const MapLoadingContainer = props => {
  const classes = useStyles();
  return (
    <div className={classes.mapWrapper}>
      <div className={classes.loadingContainer}>
        <Loader loading={true} text="Loading google maps..." color="primary" />
      </div>
    </div>
  );
};

// const MapLoadingContainer = props => <div>Fancy loading container!</div>;
export default MapLoadingContainer;
