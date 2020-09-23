import React, { useState, useEffect } from 'react';
// import styles from './ColumnSizer.example.css';
import {
  AutoSizer,
  List,
  ColumnSizer,
  Grid,
  ArrowKeyStepper,
} from 'react-virtualized';
import PropertyResultHit from './PropertyResultHit';

//material
import { Button } from '@material-ui/core';

// icons
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const Controls = ({ moveLeft, moveRight }) => {
  return (
    <div>
      <Button onClick={moveLeft}>
        <ArrowBackIosIcon />
      </Button>
      <Button onClick={moveRight}>
        <ArrowForwardIosIcon />
      </Button>
    </div>
  );
};

const ColumnSizerExample = props => {
  const columnHeight = 335;
  const columnWidth = 830;

  const [state, setState] = useState({
    columnMaxWidth: columnWidth,
    columnMinWidth: columnWidth,
    columnCount: props.columnCount,
    mode: 'edges',
    isClickable: true,
    scrollToColumn: 0,
    scrollToRow: 0,
  });

  useEffect(() => {
    setState({
      ...state,
      columnCount: props.columnCount,
    });
    return () => {};
  }, [props.columnCount]);

  const _noContentRenderer = () => {
    return <div>No cells</div>;
    // return <div className={styles.noCells}>No cells</div>;
  };

  const _cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    // const className = columnIndex === 0 ? styles.firstCell : styles.cell;
    const cellHit = props.hits[columnIndex];
    return (
      <div key={key} style={style}>
        <div>{cellHit && <PropertyResultHit hit={cellHit} />}</div>
      </div>
    );
  };

  const {
    columnMaxWidth,
    columnMinWidth,
    columnCount,
    mode,
    isClickable,
    scrollToColumn,
    scrollToRow,
  } = state;

  const handleMoveLeft = () => {
    if (state.scrollToColumn <= 0) return;
    setState({
      ...state,
      scrollToColumn: state.scrollToColumn - 1,
    });
  };

  const handleMoveRight = () => {
    if (state.scrollToColumn >= state.columnCount - 1) return;
    setState({
      ...state,
      scrollToColumn: state.scrollToColumn + 1,
    });
  };

  return (
    <ArrowKeyStepper
      columnCount={columnCount}
      isControlled={isClickable}
      mode={mode}
      rowCount={1}
      scrollToColumn={scrollToColumn}
      scrollToRow={scrollToRow}>
      {({ onSectionRendered, scrollToColumn, scrollToRow }) => (
        <div>
          <Controls moveLeft={handleMoveLeft} moveRight={handleMoveRight} />
          <AutoSizer disableHeight>
            {({ width }) => (
              <ColumnSizer
                columnMaxWidth={columnMaxWidth}
                columnMinWidth={columnMinWidth}
                columnCount={columnCount}
                key="GridColumnSizer"
                width={width}>
                {({ adjustedWidth, columnWidth, registerChild }) => (
                  <div
                    style={{
                      height: columnHeight,
                      width: adjustedWidth,
                    }}>
                    <Grid
                      ref={registerChild}
                      columnWidth={columnWidth}
                      columnCount={columnCount}
                      height={columnHeight}
                      noContentRenderer={_noContentRenderer}
                      cellRenderer={_cellRenderer}
                      rowHeight={columnHeight}
                      rowCount={1}
                      width={adjustedWidth}
                      scrollToColumn={scrollToColumn}
                      scrollToRow={scrollToRow}
                    />
                  </div>
                )}
              </ColumnSizer>
            )}
          </AutoSizer>
        </div>
      )}
    </ArrowKeyStepper>
  );
};

export default ColumnSizerExample;
