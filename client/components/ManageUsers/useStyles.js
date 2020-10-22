import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '800px',
    flexWrap: 'wrap',
  },
  accordionDetails: {
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  details: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2),
  },
  detailItem: {
    flex: '1 1 auto',
    padding: theme.spacing(2),
    flexBasis: '220px',
    // overflow: 'auto',
    // maxWidth: '200px',
  },
  detailLabel: {},
  detailValue: {
    overflow: 'auto',
  },
}));

export default useStyles;
