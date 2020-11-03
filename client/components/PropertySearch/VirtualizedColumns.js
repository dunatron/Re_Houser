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
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, Card } from '@material-ui/core';

// icons
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import useCurrentWidth from '@/Lib/hooks/useCurrentWidth';

const Controls = ({ currPos, count, moveLeft, moveRight }) => {
  return (
    <div
      style={{
        margin: '8px 0',
      }}>
      <Button onClick={moveLeft}>
        <ArrowBackIosIcon />
      </Button>
      {currPos + 1} / {count}
      <Button onClick={moveRight}>
        <ArrowForwardIosIcon />
      </Button>
    </div>
  );
};

const ColumnSizerExample = props => {
  const [colHeight, setColHeight] = useState(335);
  const [colWidth, setColWidth] = useState(830);

  const [state, setState] = useState({
    columnMaxWidth: colWidth,
    columnMinWidth: colWidth,
    columnCount: props.columnCount,
    mode: 'edges',
    isClickable: true,
    scrollToColumn: 0,
    scrollToRow: 0,
  });

  const windowWidth = useCurrentWidth();
  const theme = useTheme();

  const setMobile = () => {
    setColHeight(672);
    setColWidth(windowWidth - windowWidth * 0.15);
  };

  const setTablet = () => {
    // setColHeight(436);
    setColHeight(460);
    setColWidth(500);
  };

  const setDesktop = () => {
    // setColHeight(436);
    setColHeight(460);
    setColWidth(500);
  };

  useEffect(() => {
    if (windowWidth < 600) setMobile(); // mobile
    if (windowWidth >= 600 && windowWidth < 920) setTablet(); // tablet
    if (windowWidth >= 920) setDesktop(); // desktop
  }, [windowWidth]);

  useEffect(() => {
    setState({
      ...state,
      columnCount: props.columnCount,
      scrollToColumn: 0,
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
      <div
        key={key}
        style={{
          ...style,
          padding: theme.spacing(1),
          // borderRadius: '4px',
          backgroundColor:
            columnIndex === state.scrollToColumn
              ? theme.palette.primary.main
              : theme.palette.background.default,
          // border:
          //   columnIndex === state.scrollToColumn
          //     ? `3px solid ${theme.palette.primary.dark}`
          //     : `3px solid ${theme.palette.background.default}`,
        }}>
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
        <div
          style={{
            marginBottom: '32px',
          }}>
          <Controls
            moveLeft={handleMoveLeft}
            moveRight={handleMoveRight}
            currPos={state.scrollToColumn}
            count={state.columnCount}
          />
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
                      height: colHeight + 16,
                      width: adjustedWidth,
                    }}>
                    <Grid
                      ref={registerChild}
                      columnWidth={colWidth}
                      columnCount={columnCount}
                      height={colHeight + 32} // I think its the scrollX which blows it out
                      noContentRenderer={_noContentRenderer}
                      cellRenderer={_cellRenderer}
                      rowHeight={colHeight}
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
