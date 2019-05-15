import React, { Component } from "react"
// import "react-virtualized/styles.css"
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized"

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 50,
})

export default class TronsVirtualizedList extends Component {
  componentWillReceiveProps(nextProps) {
    //Really important !!
    cache.clearAll() //Clear the cache if row heights are recompute to be sure there are no "blank spaces" (some row are erased)
  }
  renderRow = ({ index, parent, key, style }) => {
    // console.group("renderRow")
    // console.log("index => ", index)
    // console.log("key => ", key)
    // console.groupEnd()
    // return (
    //   <CellMeasurer
    //     key={key}
    //     cache={cache}
    //     parent={parent}
    //     columnIndex={0}
    //     clearAll={true}
    //     rowIndex={index}>
    //     <SearchResult data={this.props.data[index]} />
    //   </CellMeasurer>
    // )
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        clearAll={true}
        rowIndex={index}>
        <div
          style={{
            ...style,
            maxHeight: 165,
            overflow: "hidden",
            borderBottom: "2px solid grey",
          }}>
          {/* <a href={this.props.data[index].url} target="_blank">
            {this.props.data[index].url}
          </a> */}
          <div
            dangerouslySetInnerHTML={{ __html: this.props.data[index].url }}
          />
          <div
            dangerouslySetInnerHTML={{ __html: this.props.data[index].title }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: this.props.data[index].description,
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: this.props.data[index].keywords,
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: this.props.data[index].mainContent,
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: this.props.data[index].secondaryContent,
            }}
          />
        </div>
      </CellMeasurer>
    )
  }
  render() {
    console.log("this.props.data => ", this.props.data)
    const uniqueStamp = this.props.uniqueStamp
    console.log("timeStamp => ", uniqueStamp)
    return (
      <AutoSizer
        onResize={({ height, width }) => console.log("Sizer h => ", height)}>
        {({ width, height }) => {
          return (
            <List
              sortBy={uniqueStamp}
              rowCount={this.props.data.length}
              width={width}
              height={height}
              deferredMeasurementCache={cache}
              rowHeight={cache.rowHeight}
              rowRenderer={this.renderRow}
            />
          )
        }}
      </AutoSizer>
    )
  }
}
