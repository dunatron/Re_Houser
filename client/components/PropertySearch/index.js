import algoliasearch from 'algoliasearch/lite';
import PropTypes from 'prop-types';

import { Box, Paper } from '@material-ui/core';
import { SearchInterface } from './styles';
import SearchFilter from './SearchFilter';

import PropertyResultHit from './PropertyResultHit';
// connected refinements
import ConnectedCurrentRefinements from './refinements/CurrentRefinements';
import GeoSearch from './GeoSearch';

import { InstantSearch, Pagination, Stats } from 'react-instantsearch-dom';

import HorizonScrollHits from './HorizonScrollHits';
import SearchHeader from './SearchHeader';
import useStyles from './useStyles';

// THIS FOR NEXT JS
// https://github.com/algolia/react-instantsearch/tree/master/examples/next

var applicationId = process.env.ALGOLIA_APP_ID;
var apiKey = process.env.ALGOLIA_API_KEY;
const searchClient = algoliasearch(applicationId, apiKey);
const indexPrefix = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';

const Hit = ({ hit, me }) => (
  <div className="si-hit">
    <PropertyResultHit hit={hit} me={me} />
  </div>
);

Hit.propTypes = {
  hit: PropTypes.any,
};

const Content = ({ me }) => (
  <div className="si-content">
    <div className="si-info">
      <Stats />
    </div>

    <HorizonScrollHits hitComponent={<Hit me={me} />} me={me} />
    <div className="pagination">
      {/* <ConnectedMaterialPagination /> */}
      <Pagination />
    </div>
  </div>
);

const PropertySearch = props => {
  const { me } = props;
  const classes = useStyles();

  return (
    <InstantSearch
      indexName={`${indexPrefix}_PropertySearch`}
      searchClient={searchClient}>
      <SearchInterface>
        <div className={classes.root}>
          <Paper variant="outlined" square={true}>
            <Box className={classes.searchPanel}>
              <Box className={classes.leftSearchPanel}>
                <SearchHeader />
                <SearchFilter />
              </Box>
              <Box className={classes.rightSearchPanel}>
                <GeoSearch />
              </Box>
            </Box>
            <ConnectedCurrentRefinements />
          </Paper>
          <Content me={me} />
        </div>
      </SearchInterface>
    </InstantSearch>
  );
};

export default PropertySearch;
