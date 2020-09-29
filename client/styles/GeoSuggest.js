import Geosuggest from 'react-geosuggest';

import styled from 'styled-components';

const StyledGeoSuggest = styled(Geosuggest)`
  .geosuggest {
    font-size: 18px;
    font-size: 1rem;
    position: relative;
    width: 50%;
    margin: 1em auto;
    text-align: left;
  }
  .geosuggest__input {
    width: 100%;
    border: 2px solid ${p => p.theme.palette.background.paper};
    background: ${p => p.theme.palette.background.paper};
    box-shadow: 0 0 1px ${p => p.theme.palette.primary.main};
    /* color: ${p => p.theme.palette.text.primary}; */
    padding: ${p => p.theme.spacing(2)}px;
    -webkit-transition: border 0.2s, box-shadow 0.2s;
    transition: border 0.2s, box-shadow 0.2s;
    /* font-family: 'ODBold'; */
    font-family: ${p => p.theme.typography.h1.fontFamily};
    color: 'red';
  }
  .geosuggest__input:focus {
    border-color: ${p => p.theme.palette.primary.main};
    outline: none;
  }
  .geosuggest__suggests {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 25em;
    padding: 0;
    margin-top: -1px;
    background: ${p => p.theme.palette.secondary.main};
    color: ${p => p.theme.palette.secondary.contrastText};
    border: 2px solid #267dc0;
    border-top-width: 0;
    overflow-x: hidden;
    overflow-y: auto;
    list-style: none;
    z-index: 5;
    -webkit-transition: max-height 0.2s, border 0.2s;
    transition: max-height 0.2s, border 0.2s;
  }
  .geosuggest__suggests--hidden {
    max-height: 0;
    overflow: hidden;
    border-width: 0;
  }

  /**
 * A geosuggest item
 */
  .geosuggest__item {
    font-size: 18px;
    font-size: 1rem;
    padding: 0.5em 0.65em;
    cursor: pointer;
  }
  .geosuggest__item:hover,
  .geosuggest__item:focus {
    /* background: #f5f5f5; */
    background: ${p => p.theme.palette.primary.main};
    color: ${p => p.theme.palette.primary.contrastText};
  }
  .geosuggest__item--active {
    background: #267dc0;
    color: #fff;
  }
  .geosuggest__item--active:hover,
  .geosuggest__item--active:focus {
    background: #ccc;
  }
  .geosuggest__item__matched-text {
    font-weight: bold;
  }
`;

export default StyledGeoSuggest;
