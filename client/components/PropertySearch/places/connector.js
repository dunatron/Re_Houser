import { createConnector } from 'react-instantsearch-dom';

export default createConnector({
  displayName: 'AlgoliaGeoSearch',

  getProvidedProps() {
    return {};
  },

  refine(props, searchState, nextValue) {
    return {
      ...searchState,
      aroundLatLng: nextValue,
      boundingBox: {},
    };
  },

  getSearchParameters(searchParameters, props, searchState) {
    const currentRefinement =
      searchState.aroundLatLng || props.defaultRefinement;

    console.log('current refinement => ', currentRefinement);

    return searchParameters
      .setQueryParameter('insideBoundingBox')
      .setQueryParameter(
        'aroundLatLng',
        `${currentRefinement.lat}, ${currentRefinement.lng}`
      );
  },
});
