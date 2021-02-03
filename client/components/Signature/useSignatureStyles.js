import { makeStyles, useTheme } from '@material-ui/core/styles';

const useSignatureStyles = makeStyles(theme => ({
  canvas: {
    border: `1px dashed #e0e0e0`,
  },
  notSetWrapper: {
    borderTop: `1px dashed #e0e0e0`,

    paddingBottom: '8px',
    margin: theme.spacing(2, 0),
    maxWidth: '100%',
    overflow: 'auto',
  },
  innerWrapper: {
    display: 'flex',
    padding: theme.spacing(1, 0),
    alignItems: 'center',
    flexWrap: 'wrap',
  },
}));

export { useSignatureStyles };
export default useSignatureStyles;
