import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import Map from '@/Components/Map';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.up('md')]: {
      flexWrap: 'nowrap',
    },
    marginBottom: '32px',
    maxWidth: '990px',
  },
  detailsSection: {
    margin: '0 16px 0 0',
    flexBasis: '420px',
    padding: '16px',
    [theme.breakpoints.up('md')]: {
      flexBasis: '40%',
    },
  },
  mapWrapper: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      //   width: '70%',
      flexBasis: '60%',
    },
  },
}));

const OfficeLocation = ({ name, physicalLines, mailLines, map }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.detailsSection}>
        <Typography variant="h3" gutterBottom>
          {name}
        </Typography>
        {/* Physical address */}
        {physicalLines && (
          <RenderlLines title="Physical address" lines={physicalLines} />
        )}
        {/* Mailing address */}
        {mailLines && (
          <RenderlLines title="Mailing address" lines={mailLines} />
        )}
      </div>
      <div className={classes.mapWrapper}>
        {map && <Map center={{ ...map.center }} />}
      </div>
    </Paper>
  );
};

OfficeLocation.propTypes = {
  mailLines: PropTypes.any.isRequired,
  map: PropTypes.shape({
    center: PropTypes.any,
  }).isRequired,
  name: PropTypes.any.isRequired,
  physicalLines: PropTypes.any.isRequired,
};

const RenderlLines = ({ title, lines }) => {
  return (
    <>
      <Typography variant="h5">{title}</Typography>
      {lines.map((line, idx) => (
        <Typography
          key={idx}
          variant="body1"
          gutterBottom={idx + 1 === lines.length ? true : false}>
          {line}
        </Typography>
      ))}
    </>
  );
};

RenderlLines.propTypes = {
  lines: PropTypes.shape({
    length: PropTypes.any,
    map: PropTypes.func,
  }).isRequired,
  title: PropTypes.any.isRequired,
};

export default OfficeLocation;
