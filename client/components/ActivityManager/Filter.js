import React, { useState } from 'react';
import TextInput from '../Inputs/TextInput';
import SelectOption from '../Inputs/SelectOption';
import { makeStyles } from '@material-ui/core/styles';
import SquareButton from '../Buttons/SquareButton';
import SerachOutlinedIcon from '@material-ui/icons/SearchOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    alignItems: 'baseline',
    // justifyContent: ' space-evenly',
    maxWidth: '800px',
    boxSizing: 'border-box',
  },
  idInput: {
    flexBasis: '100%',
    flexGrow: 3,
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      flexBasis: '40%',
    },
  },
  typeInput: {
    flexGrow: 2,
    display: 'flex',
    padding: '8px',
    // flexBasis: '100%',
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      flexBasis: '100%',
      padding: 0,
    },
  },
  searchBtn: {
    flexGrow: 1,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%',
    },
    marginBottom: theme.spacing(1),
  },
}));

const ActivityFilter = ({ doSearch, me }) => {
  const classes = useStyles();
  const [searchId, setSearchId] = useState(me.id);
  const [searchType, setSearchType] = useState('user');
  return (
    <div className={classes.root}>
      <div className={classes.idInput}>
        <TextInput
          fullWidth
          value={searchId}
          label="Entity ID"
          onChange={e => setSearchId(e.target.value)}
        />
      </div>
      <div className={classes.typeInput}>
        {searchId.length > 0 && (
          <SelectOption
            fullWidth
            value={searchType}
            label="Activity Type"
            onChange={e => setSearchType(e.target.value)}
            options={[
              {
                name: 'User',
                value: 'user',
              },
              {
                name: 'Property',
                value: 'property',
              },
              {
                name: 'Lease',
                value: 'propertyLease',
              },
            ]}
          />
        )}
      </div>
      <div className={classes.searchBtn}>
        <SquareButton
          btnProps={{
            fullWidth: true,
            variant: 'outlined',
            color: 'secondary',
            startIcon: <SerachOutlinedIcon />,
          }}
          fullWidth
          onClick={() => doSearch({ searchId, searchType })}>
          Search
        </SquareButton>
      </div>
    </div>
  );
};

export default ActivityFilter;
