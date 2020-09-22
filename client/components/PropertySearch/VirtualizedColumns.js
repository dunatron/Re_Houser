// /**
//  * @flow
//  */
// import * as React from 'react';
// // import styles from './ColumnSizer.example.css';
// import { AutoSizer, List, ColumnSizer, Grid } from 'react-virtualized';

// export default class ColumnSizerExample extends React.PureComponent {
//   constructor(props) {
//     super(props);

//     this.state = {
//       columnMaxWidth: 500,
//       columnMinWidth: 320,
//       columnCount: props.columnCount,
//     };

//     this._noColumnMaxWidthChange = this._noColumnMaxWidthChange.bind(this);
//     this._noColumnMinWidthChange = this._noColumnMinWidthChange.bind(this);
//     this._onColumnCountChange = this._onColumnCountChange.bind(this);
//     this._noContentRenderer = this._noContentRenderer.bind(this);
//     this._cellRenderer = this._cellRenderer.bind(this);
//   }

//   render() {
//     const { columnMaxWidth, columnMinWidth, columnCount } = this.state;

//     return (
//       <div>
//         <div
//           text="ColumnSizer"
//           sourceLink="https://github.com/bvaughn/react-virtualized/blob/master/source/ColumnSizer/ColumnSizer.example.js"
//           docsLink="https://github.com/bvaughn/react-virtualized/blob/master/docs/ColumnSizer.md"
//         />

//         <div>
//           This component decorates a <code>Grid</code> and calculates the width
//           of its columns based on the current (<code>Grid</code>) width.
//         </div>

//         <div>
//           <input
//             label="Num Columns"
//             name="columnCount"
//             onChange={this._onColumnCountChange}
//             value={columnCount}
//           />
//           <input
//             label="Column Min Width"
//             name="columnMinWidth"
//             onChange={this._noColumnMinWidthChange}
//             value={columnMinWidth}
//           />
//           <input
//             label="Column Max Width"
//             name="columnMaxWidth"
//             onChange={this._noColumnMaxWidthChange}
//             value={columnMaxWidth}
//           />
//         </div>

//         <div>
//           <AutoSizer disableHeight>
//             {({ width }) => (
//               <ColumnSizer
//                 columnMaxWidth={columnMaxWidth}
//                 columnMinWidth={columnMinWidth}
//                 columnCount={columnCount}
//                 key="GridColumnSizer"
//                 width={width}>
//                 {({ adjustedWidth, columnWidth, registerChild }) => (
//                   <div
//                     // className={styles.GridContainer}
//                     style={{
//                       height: 50,
//                       width: adjustedWidth,
//                     }}>
//                     <Grid
//                       ref={registerChild}
//                       columnWidth={columnWidth}
//                       columnCount={columnCount}
//                       height={50}
//                       noContentRenderer={this._noContentRenderer}
//                       cellRenderer={this._cellRenderer}
//                       rowHeight={50}
//                       rowCount={1}
//                       width={adjustedWidth}
//                     />
//                   </div>
//                 )}
//               </ColumnSizer>
//             )}
//           </AutoSizer>
//         </div>
//       </div>
//     );
//   }

//   _noColumnMaxWidthChange(event) {
//     let columnMaxWidth = parseInt(event.target.value, 10);

//     if (isNaN(columnMaxWidth)) {
//       columnMaxWidth = undefined;
//     } else {
//       columnMaxWidth = Math.min(1000, columnMaxWidth);
//     }

//     this.setState({ columnMaxWidth });
//   }

//   _noColumnMinWidthChange(event) {
//     let columnMinWidth = parseInt(event.target.value, 10);

//     if (isNaN(columnMinWidth)) {
//       columnMinWidth = undefined;
//     } else {
//       columnMinWidth = Math.max(1, columnMinWidth);
//     }

//     this.setState({ columnMinWidth });
//   }

//   _onColumnCountChange(event) {
//     this.setState({ columnCount: parseInt(event.target.value, 10) || 0 });
//   }

//   _noContentRenderer() {
//     return <div>No cells</div>;
//     // return <div className={styles.noCells}>No cells</div>;
//   }

//   _cellRenderer({ columnIndex, key, rowIndex, style }) {
//     // const className = columnIndex === 0 ? styles.firstCell : styles.cell;

//     return (
//       <div key={key} style={style}>
//         {`R:${rowIndex}, C:${columnIndex}`}
//       </div>
//     );
//   }
// }

/**
 * @flow
 */
import React, { useState, useEffect } from 'react';
// import styles from './ColumnSizer.example.css';
import { AutoSizer, List, ColumnSizer, Grid } from 'react-virtualized';
import PropertyResultHit from './PropertyResultHit';

const ColumnSizerExample = props => {
  const columnHeight = 500;
  const columnWidth = 500;

  const [state, setState] = useState({
    columnMaxWidth: columnWidth,
    columnMinWidth: columnWidth,
    columnCount: props.columnCount,
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

    const cellHit = props.hits[rowIndex];

    console.log('A Cell Hit => ', cellHit);

    return (
      <div key={key} style={style}>
        {/* {`R:${rowIndex}, C:${columnIndex}`} */}
        <div>
          {props.hits[rowIndex] && (
            <PropertyResultHit hit={props.hits[rowIndex]} />
          )}
        </div>
        {/* {props.hits[rowIndex].location} */}
      </div>
    );
  };

  const { columnMaxWidth, columnMinWidth, columnCount } = state;

  return (
    <div>
      <div
        text="ColumnSizer"
        sourceLink="https://github.com/bvaughn/react-virtualized/blob/master/source/ColumnSizer/ColumnSizer.example.js"
        docsLink="https://github.com/bvaughn/react-virtualized/blob/master/docs/ColumnSizer.md"
      />
      <div>
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
                  // className={styles.GridContainer}
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
                  />
                </div>
              )}
            </ColumnSizer>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

export default ColumnSizerExample;
