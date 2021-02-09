import { makeStyles } from '@material-ui/core/styles';

const ts = '0.5s';

const useStyles = makeStyles(theme => ({
  editableDisplay: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px',
    margin: 0,
    padding: 0,
    transition: `padding ${ts}, border-color ${ts}, border-width ${ts}`,
  },
  isEditing: {
    border: `4px solid ${theme.palette.primary.main}`,
    padding: '16px',
  },
  displayHeader: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    transition: `all ${ts}`,
  },
  displayHeaderEditing: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    transition: `all ${ts}`,
  },
  headerActionsEditing: {
    position: 'absolute',
    right: 0,
  },
}));

export default useStyles;
