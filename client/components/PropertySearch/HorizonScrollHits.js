import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';
import { connectHits } from 'react-instantsearch-dom';
import PropertyResultHit from './PropertyResultHit';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, IconButton } from '@material-ui/core';

import { AutoSizer, List, ColumnSizer, Grid } from 'react-virtualized';
import VirtualizedColumns from './VirtualizedColumns';
// import 'react-virtualized/styles.css'; // only needs to be imported once

// icons
import ArrowLeft from '@material-ui/icons/ArrowBackIos';
import ArrowRight from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  scrollLeftBox: {
    position: 'absolute',
    color: '#fff',
    top: 0,
    left: 0,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    zIndex: 2,
    pointerEvents: 'none',
  },
  scrollRightBox: {
    position: 'absolute',
    color: '#fff',
    top: 0,
    right: 0,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    zIndex: 2,
    pointerEvents: 'none',
  },
  arrowBox: {
    pointerEvents: 'all',
  },
  scrollContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    backgroundColor: theme.palette.secondary.main,
    zIndex: 1,
    '&::-webkit-scrollbar': {
      // display: 'none',
    },
  },
  item: {
    flex: '0 0 auto',
    margin: '16px',
    maxWidth: '500px',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 'none',
    },
    [theme.breakpoints.up('md')]: {},
    [theme.breakpoints.up('lg')]: {},
  },
}));

const ScrollRightBox = ({ onClick }) => {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.scrollRightBox}>
      <IconButton
        onClick={onClick}
        aria-label="scroll-right"
        className={classes.arrowBox}
        size="large"
        color="primary">
        <ArrowRight fontSize="inherit" />
      </IconButton>
    </Box>
  );
};

ScrollRightBox.propTypes = {
  onClick: PropTypes.any,
};

const ScrollLeftBox = ({ onClick }) => {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.scrollLeftBox}>
      <IconButton
        onClick={onClick}
        aria-label="scroll-left"
        className={classes.arrowBox}
        size="large"
        color="primary">
        <ArrowLeft fontSize="inherit" />
      </IconButton>
    </Box>
  );
};

ScrollLeftBox.propTypes = {
  onClick: PropTypes.any,
};

const list = [
  'Brian Vaughn',
  // And so on...
];

function rowRenderer({ key, index, style, hits }) {
  return (
    <div key={key} style={style}>
      {hits}
    </div>
  );
}

const Hits = ({ hits, me }) => {
  const scrollNode = useRef();
  const classes = useStyles();

  const handleScrollLeft = () => {
    alert('YES');
  };

  const handleScrollRight = () => {};

  useEffect(() => {
    return () => {};
  }, []);

  // return hits.map(hit => (
  //   <Box component="div" className={classes.item}>
  //     <PropertyResultHit key={hit.objectID} hit={hit} />
  //   </Box>
  // ));

  return (
    <VirtualizedColumns
      hits={hits}
      columnCount={hits.length ? hits.length : 0}
    />
  );
};

Hits.propTypes = {
  hits: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

const CustomHits = connectHits(Hits);

export default CustomHits;
