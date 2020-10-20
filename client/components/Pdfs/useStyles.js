import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  //   ol: { counterReset: 'item', listStyleType: 'none' },
  //   li: {
  //     display: 'block',
  //     '&::before': {
  //       content: ' counters(item, ".") " "',
  //       counterIncrement: 'item',
  //     },
  //   },
  webPdfDoc: {
    maxWidth: '800px',
  },
  section: {
    // border: '1px dashed pink',
  },
  paragraph: {
    marginBottom: '16px',
  },
  ol: { listStyleType: 'none' },
  ul: {},
  li: {
    marginBottom: '16px',
  },
  li_title: {
    fontWeight: 900,
    marginLeft: '8px',
  },
  link: {
    // marginBottom: '8px',
    display: 'block',
    textDecoration: 'underline',
  },
}));

export default useStyles;
