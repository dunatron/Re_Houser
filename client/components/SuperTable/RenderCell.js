import React, { Component } from 'react';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

// data: =>
// found: "isLeased"
// id: "isLeased"
// label: "isLeased"
// numeric: false
// show: true
// tableRenderKey: "th"
// type: "truthly"
export default class RenderCell extends Component {
  render() {
    const { data, index, allData, executeFunc } = this.props;
    switch (data.type) {
      case 'btnFunc':
        return (
          <RenderButtonFunc
            data={data}
            index={index}
            allData={allData}
            executeFunc={(func, data) => executeFunc(func, data)}
            {...this.props}
          />
        );
      case 'numberOfObj':
        return (
          <RenderNumberOfObj
            data={data}
            index={index}
            allData={allData}
            {...this.props}
          />
        );
      case 'deep':
        return (
          <RenderDeep
            data={data}
            index={index}
            allData={allData}
            {...this.props}
          />
        );
      case 'map':
        return (
          <RenderMap
            data={data}
            index={index}
            allData={allData}
            {...this.props}
          />
        );
      case 'tag':
        return (
          <RenderTag
            data={data}
            index={index}
            allData={allData}
            {...this.props}
          />
        );
      case 'checkbox':
        return (
          <RenderCheckBox
            data={data}
            index={index}
            allData={allData}
            executeFunc={(func, data) => executeFunc(func, data)}
            {...this.props}
          />
        );
      case 'truthly':
        return (
          <RenderTruthly
            data={data}
            index={index}
            allData={allData}
            executeFunc={(func, data) => executeFunc(func, data)}
            {...this.props}
          />
        );
      default:
        return (
          <RenderDefault
            data={data}
            index={index}
            allData={allData}
            {...this.props}
          />
        );
    }
  }
}

const RenderButtonFunc = ({ data, allData, index, executeFunc }) => {
  return (
    <TableCell
      // key={idx}
      align="left"
      numeric={data.numeric}
      style={{ minWidth: '90px' }}
      component={data.tableRenderKey}
      padding={index === 0 ? 'dense' : 'dense'}
      {...data.tableRenderProps}>
      <div onClick={() => executeFunc(data.funcName, allData)}>{data.icon}</div>
    </TableCell>
  );
};

const RenderNumberOfObj = ({ data, index, allData }) => {
  const length = extractDeepValue(data.found, allData).length;
  return (
    <TableCell
      align="left"
      key={index}
      numeric={data.numeric}
      // style={{ minWidth: "90px" }}
      component={data.tableRenderKey}
      padding={index === 0 ? 'dense' : 'dense'}
      {...data.tableRenderProps}>
      <CellContent content={length} limitChar={data.limitChar} />
    </TableCell>
  );
};

const RenderDeep = ({ data, index, allData }) => {
  return (
    <TableCell
      align="left"
      key={index}
      numeric={data.numeric}
      // style={{ minWidth: "90px" }}
      component={data.tableRenderKey}
      padding={index === 0 ? 'dense' : 'dense'}
      {...data.tableRenderProps}>
      <CellContent
        content={extractDeepValue(data.found, allData)}
        limitChar={data.limitChar}
      />
    </TableCell>
  );
};

const RenderCheckBox = ({ data, index, allData, executeFunc }) => {
  const value = allData[data.id];
  return (
    <TableCell align="left" padding="checkbox" {...data.tableRenderProps}>
      <Checkbox
        checked={value}
        size="small"
        color="primary"
        onClick={() => executeFunc(data.funcName, allData)}
      />
    </TableCell>
  );
};

const RenderTruthly = ({ data, index, allData, executeFunc }) => {
  const value = allData[data.id];
  return (
    <TableCell size="small" {...data.tableRenderProps}>
      {value ? 'YES' : 'NO'}
      {/* <Checkbox
        checked={value}
        color="primary"
        onClick={() => executeFunc(data.funcName, allData)}
      /> */}
    </TableCell>
  );
};

const RenderMap = ({ data, index, allData }) => {
  return (
    <TableCell
      key={index}
      numeric={data.numeric}
      style={{ minWidth: '90px' }}
      component={data.tableRenderKey}
      padding={index === 0 ? 'dense' : 'dense'}
      {...data.tableRenderProps}>
      <CellContent
        content={extractDeepValue(data.found, allData).map((o, oIdx) => {
          return (
            <span key={oIdx}>
              {data.mapKeys.map((cK, ckIdx) => {
                return <span key={ckIdx}>{o[cK]},</span>;
              })}
            </span>
          );
        })}
        limitChar={data.limitChar}
      />

      {/* <CellContent content={"I will be tags"} /> */}
    </TableCell>
  );
};

const RenderTag = ({ data, index, allData }) => {
  return (
    <TableCell
      align="left"
      key={index}
      numeric={data.numeric}
      style={{ minWidth: '90px' }}
      component={data.tableRenderKey}
      padding={index === 0 ? 'dense' : 'dense'}
      {...data.tableRenderProps}>
      {extractDeepValue(data.found, allData).map((o, oIdx) => {
        return <span key={oIdx}>{o[data.tagKey]}</span>;
      })}
    </TableCell>
  );
};

const RenderDefault = props => {
  const { data, index, allData } = props;
  return (
    <TableCell
      align="left"
      key={index}
      numeric={data.numeric}
      style={{ minWidth: '90px' }}
      size="medium"
      component={data.tableRenderKey}
      padding={index === 0 ? 'dense' : 'dense'}
      {...data.tableRenderProps}>
      <CellContent content={allData[data.id]} limitChar={data.limitChar} />
    </TableCell>
  );
};

const extractDeepValue = (str, dataObj) => {
  const value = str.split('.').reduce((o, i) => o[i], dataObj);
  return value ? value : '';
};

const CellContent = ({ content, limitChar }) => {
  if (limitChar) {
    const trimmedString =
      content.length > limitChar ? (
        <div>
          {content.substring(0, limitChar - 3)}
          <DialogPopup text={'...'} content={content} />
        </div>
      ) : (
        content
      );
    return trimmedString;
  }

  return content;
};
