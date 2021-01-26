import { makeStyles, useTheme } from '@material-ui/core/styles';

const useSignatureStyles = makeStyles(theme => ({
  canvas: {
    border: `2px dashed ${theme.palette.primary.main}`,
  },
  notSetWrapper: {
    borderTop: `2px solid ${theme.palette.primary.main}`,
    paddingBottom: '8px',
    margin: theme.spacing(2, 0),
    maxWidth: '100%',
    overflow: 'auto',
  },
  innerWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
}));

export { useSignatureStyles };
export default useSignatureStyles;
