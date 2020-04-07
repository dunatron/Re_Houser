import React, { Fragment } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TablePagination from '@material-ui/core/TablePagination/TablePagination';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import DialogPopup from '../DialogPopup/index';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import TagBar from './TagBar.js';
import { split, path, lte } from 'ramda';
import RenderCell from './RenderCell';

let counter = 0;

function createData({ description }) {
  counter += 1;
  return { id: counter, description };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      columnHeaders,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnHeaders.map(row => {
            return (
              <TableCell
                key={row.id}
                align="left"
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}>
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}>
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing(1),
  },

  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  barHolder: {
    flexWrap: 'wrap',
    minHeight: 0,
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const {
    numSelected,
    classes,
    columnHeaders,
    title,
    searchOpen,
    searchValue,
    searchCol,
    toggleSearch,
    updateSearchCol,
    updateShowValues,
    children,
  } = props;

  return (
    <div>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}>
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="title" id="tableTitle">
              {title}
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />

        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton
                aria-label="Filter list"
                onClick={() => toggleSearch()}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
      <Toolbar className={classes.barHolder}>
        <FilterBar
          open={searchOpen}
          columnHeaders={columnHeaders}
          searchCol={searchCol}
          updateSearchCol={selected => updateSearchCol(selected)}
          searchValue={searchValue}
          updateShowValues={values => updateShowValues(values)}
          updateSearch={val => props.updateSearch(val)}
          updateShowProp={prop => props.updateShowProp(prop)}
        />
        <SearchBar
          open={searchOpen}
          searchCol={props.searchCol}
          searchVal={props.searchValue}
          updateSearchCol={selected => props.updateSearchCol(selected)}
          updateSearchVal={val => props.updateSearch(val)}
          options={props.columnHeaders
            .filter(confObj => confObj.searchable === true)
            .map(header => ({
              name: header.label,
              value: header.id,
            }))}
        />
        {searchOpen ? children : null}
      </Toolbar>
    </div>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  table: {
    // minWidth: 1020,
    minWidth: '100%',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

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

const filterDataByTags = (data, tags, found, key, filterType) => {
  if (tags.length < 1) {
    return data;
  }

  switch (filterType) {
    case 'match': {
      const matchFilteredData = data.filter(
        o => o[found].filter(t => tags.includes(t[key])).length === tags.length
      );
      return matchFilteredData;
    }
    case 'contains': {
      const containsFilteredData = data.filter(
        o => o[found].filter(t => tags.includes(t[key])).length >= 1
      );
      return containsFilteredData;
    }
    default: {
      const matchFilteredData = data.filter(
        o => o[found].filter(t => tags.includes(t[key])).length === tags.length
      );
      return matchFilteredData;
    }
  }

  // can change tags.length to >= 1 to get a contains
  // const filteredData = data.filter(o => {
  //   // if (o[found].filter(t => tags.includes(t[key])).length >= 1) {
  //   //   return true
  //   // }
  //   if (o[found].filter(t => tags.includes(t[key])).length === tags.length) {
  //     return true
  //   }
  //   return false
  // })
  // const filteredData = data.filter(
  //   o =>
  //     o[found].filter(t => tags.includes(t[key])).length ===
  //     (filterType === "match" ? tags.length : lte(1, ))
  // ) // can change tags.length to >= 1 to get a contains
  // const filteredData = data.filter(o =>
  //   o[found].filter(t => tags.includes(t[key])).length(function(filterType) {})
  // ) // can change tags.length to >= 1 to get a contains
  // return filteredData
};
class SuperTable extends React.Component {
  constructor(props) {
    super(props);

    const propColumnHeaders = this.props.columnHeaders;

    const propData = this.props.data.map(note => createData(note));
    const displayColumns = propColumnHeaders.reduce(
      (ac, column) => ({ ...ac, [column.id]: column.show }),
      {}
    );
    this.state = {
      order: 'asc',
      orderBy: this.props.orderBy ? this.props.orderBy : 'calories',
      selected: [],
      searchOpen: false,
      searchCol: '',
      withSearch: true,
      searchValue: '',
      filterProps: { ...displayColumns }, // Ok when we click on filter Icon the FilterBar will update the state here
      stateData: propData,
      columnHeaders: propColumnHeaders,
      searchHeaders: propColumnHeaders.filter(
        confObj => confObj.searchable === true
      ),
      // tagHeaders: propColumnHeaders.filter(confObj => confObj.type === "tag"),
      tags: props.tags ? props.tags.options : [],
      tagType: 'contains',
      appliedTags: [],
      page: 0,
      rowsPerPage: 5,
    };
  }

  componentDidMount() {
    if (this.props.subscribeToMore) {
      this.props.subscribeToMore();
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.stateData.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  updateShowProp = prop => {
    const objectKey = Object.keys(prop).map(key => key)[0];
    const objectValue = Object.values(prop).map(val => val)[0];
    let columnHeaders = this.state.columnHeaders;
    const headerIndex = columnHeaders.findIndex(function(c) {
      return c.id === objectKey;
    });
    let columnHeaderData = columnHeaders[headerIndex];
    columnHeaderData.show = objectValue;
    columnHeaders.splice(headerIndex, 1, columnHeaderData);
    this.setState({
      columnHeaders: columnHeaders,
    });
  };

  updateShowValues = values => {
    const columnHeaders = this.state.columnHeaders;

    const updated = columnHeaders.map(header => {
      return {
        ...header,
        show: values.includes(header.id),
      };
    });
    this.setState({
      columnHeaders: updated,
    });
  };

  updateSearch = val => {
    this.setState({
      searchValue: val,
    });
  };

  updateSearchCol = col => {
    this.setState({
      searchCol: col,
    });
  };

  filterData = (data, searchCol, searchVal) => {
    const searchParts = split('.', searchCol);
    const filteredData = data.filter(n =>
      path(searchParts, n)
        .toString()
        .toLowerCase()
        .includes(searchVal.toLowerCase())
    );
    return filteredData;
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  toggleBoolean = name =>
    this.setState({
      [name]: !this.state[name],
    });

  removeTagByValue = v => {
    const tags = this.state.appliedTags;
    const itemIdx = tags.findIndex(t => t === v);
    tags.splice(itemIdx, 1);
    this.setState({
      appliedTags: tags,
    });
  };

  render() {
    const { classes, title, data } = this.props;
    const {
      stateData,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      searchCol,
      searchValue,
      searchOpen,
      tagType,
    } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, stateData.length - page * rowsPerPage);

    // let processedData =
    //   searchValue.length > 2 && searchCol.length > 2
    //     ? this.filterData(data, searchCol, searchValue)
    //     : data
    let processedData =
      searchValue.length >= 1 && searchCol.length >= 1
        ? this.filterData(data, searchCol, searchValue)
        : data;

    if (this.props.tags) {
      processedData = filterDataByTags(
        processedData,
        this.state.appliedTags,
        this.props.tags.found,
        this.props.tags.key,
        tagType
      );
    }
    return (
      <Paper square={true} className={classes.root}>
        {/* <SelectOption
          label="tag filter type"
          value={tagType}
          options={[
            { name: "match", value: "match" },
            { name: "contains", value: "contains" },
          ]}
          handleChange={v =>
            this.setState({
              tagType: v,
            })
          }
        /> */}
        {/* <TagBar
          values={this.state.appliedTags}
          options={this.state.tags}
          updateTags={values => this.setState({ appliedTags: values })}
          tagType={tagType}
          setTagType={v => this.setState({ tagType: v })}
        /> */}
        <EnhancedTableToolbar
          title={title}
          numSelected={selected.length}
          columnHeaders={this.state.columnHeaders}
          // columnHeaders={this.state.searchHeaders}
          searchOpen={searchOpen}
          toggleSearch={() => this.toggleBoolean('searchOpen')}
          searchCol={this.state.searchCol}
          updateSearchCol={selected => this.updateSearchCol(selected)}
          searchValue={this.state.searchValue}
          updateSearch={val => this.updateSearch(val)}
          updateShowProp={prop => this.updateShowProp(prop)}
          updateShowValues={values => this.updateShowValues(values)}>
          {this.props.tags && (
            <TagBar
              values={this.state.appliedTags}
              options={this.state.tags}
              updateTags={values => this.setState({ appliedTags: values })}
              tagType={tagType}
              setTagType={v => this.setState({ tagType: v })}
              removeItem={v => this.removeTagByValue(v)}
            />
          )}
        </EnhancedTableToolbar>

        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              columnHeaders={this.state.columnHeaders.filter(
                header => header.show === true
              )}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={stateData.length}
            />
            <TableBody>
              {processedData &&
                processedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .sort(getSorting(order, orderBy))
                  .map(n => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        // role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}>
                        {this.state.columnHeaders
                          .filter(header => header.show === true)
                          .map((cellData, idx) => {
                            return (
                              <RenderCell
                                allData={n}
                                data={cellData}
                                index={idx}
                                executeFunc={(func, data) =>
                                  this.props.executeFunc(func, data)
                                }
                              />
                            );
                          })}
                      </TableRow>
                    );
                  })}
              {/* {processedData &&
                processedData
                  .sort(getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id)
                    return (
                      <TableRow
                        hover
                        // role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}>
                        {this.state.columnHeaders
                          .filter(header => header.show === true)
                          .map((cellHeader, idx) => {
                            return (
                              <RenderCell
                                allData={n}
                                data={cellHeader}
                                index={idx}
                                executeFunc={(func, data) =>
                                  this.props.executeFunc(func, data)
                                }
                              />
                            )
                          })}
                      </TableRow>
                    )
                  })} */}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={processedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

SuperTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SuperTable);
