import React, { useState, useRef, useEffect } from 'react';
import {
  TableBody,
  TableCell,
  Checkbox,
  Button,
  IconButton,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import CloseIcon from '@material-ui/icons/Close';

import CheckIcon from '@material-ui/icons/Check';

const RenderCell = props => {
  const { data, index, allData, executeFunc } = props;

  switch (data.type) {
    case 'btnFunc':
      return (
        <RenderButtonFunc
          data={data}
          index={index}
          allData={allData}
          executeFunc={(func, data) => executeFunc(func, data)}
          {...props}
        />
      );
    case 'numberOfObj':
      return (
        <RenderNumberOfObj
          data={data}
          index={index}
          allData={allData}
          {...props}
        />
      );
    case 'deep':
      return (
        <RenderDeep data={data} index={index} allData={allData} {...props} />
      );
    case 'map':
      return (
        <RenderMap data={data} index={index} allData={allData} {...props} />
      );
    case 'tag':
      return (
        <RenderTag data={data} index={index} allData={allData} {...props} />
      );
    case 'checkbox':
      return (
        <RenderCheckBox
          data={data}
          index={index}
          allData={allData}
          executeFunc={(func, data) => executeFunc(func, data)}
          {...props}
        />
      );
    case 'truthly':
      return (
        <RenderTruthly
          data={data}
          index={index}
          allData={allData}
          executeFunc={(func, data) => executeFunc(func, data)}
          {...props}
        />
      );
    case 'images':
      return (
        <RenderImages
          data={data}
          index={index}
          allData={allData}
          executeFunc={(func, data) => executeFunc(func, data)}
          {...props}
        />
      );
    default:
      return (
        <RenderDefault data={data} index={index} allData={allData} {...props} />
      );
  }
};
export default RenderCell;

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
      {value ? <CheckIcon color="primary" /> : <CloseIcon color="secondary" />}
    </TableCell>
  );
};

const RenderImages = ({ data, index, allData, executeFunc }) => {
  const images = allData[data.id];
  const [imageHeight, setImageHeight] = useState(70);
  const [isHovering, setIsHovering] = useState(false);
  // (original height / original width) x new width = new height
  const dynamicImageWidth = (1920 / 1080) * imageHeight;

  return (
    <TableCell size="small" {...data.tableRenderProps}>
      {images && (
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}>
          <div
            onClick={() => executeFunc(data.funcName, allData)}
            style={{ position: 'relative', width: `${dynamicImageWidth}px` }}>
            {images.length > 0 && (
              <img
                src={images[0].url}
                alt={`some image`}
                style={{
                  cursor: 'pointer',
                  width: `${dynamicImageWidth}px`,
                  height: `${imageHeight}px`,
                  objectFit: 'cover',
                }}
              />
            )}
            {isHovering && (
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => executeFunc(data.funcName, allData)}>
                  Manage
                </Button>
              </div>
            )}
          </div>

          {isHovering && (
            <IconButton
              onClick={() => {
                setImageHeight(imageHeight + 9);
              }}>
              <AddIcon />
            </IconButton>
          )}
          {isHovering && (
            <IconButton
              onClick={() => {
                setImageHeight(imageHeight - 9);
              }}>
              <RemoveIcon />
            </IconButton>
          )}
        </div>
      )}
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
