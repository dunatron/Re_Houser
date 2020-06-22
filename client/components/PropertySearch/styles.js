import React, { useState } from 'react';
import styled from 'styled-components';

const SearchInterface = styled.div`
  /* .searchInterface__Drawer {
    border: 1px solid red;
  } */
  .si-drawer {
    /* border: 1px solid red; */
    // DONT TOUCH THIS, ITS Like the component
    width: 150px;
  }

  .si-drawer__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0px 16px 16px;
  }
  .si-drawer__close-btn {
  }

  .si-drawer__sidebar {
    /* max-width: 320px; */
    // width: 320px;
    // width: 240px;
    max-width: 100vw;
    overflow-x: hidden;
  }
  .si-content {
    /* width: 100%;
    position: absolute;
    left: 0; */
  }
  .si-info {
    display: flex;
    padding: 8px 0 0 0;
    .ais-Stats {
      padding: 0 16px;
      .ais-Stats-text {
        font-size: 1.2em;
      }
    }
  }
  .ais-Hits-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
    /* width: 100%;
    position: absolute; */
    left: 0;
    list-style: none;
  }
  .ais-Hits-item {
  }
  .si-hit {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .si-hit__location {
    font-size: 1.3em;
    line-height: 1em;
    max-width: 420px;
    padding: 16px;
    font-family: GustanLight;
  }

  /* This is the Pagination styles */

  .ais-Pagination-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .ais-Pagination-item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4px 2px;
    transition: background-color 0.25s ease;
  }
  .ais-Pagination-item:hover {
    background-color: #99aefa;
    cursor: pointer;
  }
  .ais-Pagination-item--page {
    background-color: lightgrey;
  }
  .ais-Pagination-item--selected {
    background-color: #99aefa;
  }

  .ais-Pagination-link {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
    min-height: 30px;
  }
  .ais-Pagination-link:hover {
    text-decoration: none;
  }

  .ais-Highlight-highlighted {
    background-color: #004898;
    color: white;
    padding: 2px;
    font-style: normal;
  }

  .ais-results-found {
    color: #000;
  }

  .ais-clear-refinements {
    color: #000;
    background-color: #fff;
    margin-top: 16px;
    transition: all 0.3s ease;
  }
  .ais-clear-refinements:hover {
    color: #fff;
    background-color: #99aefa;
  }
  .ais-GeoSearch-map {
    height: 500px;
  }
  .map-marker {
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    font-size: 1rem;
    padding: 2px;
    max-width: 180px;
    word-break: break-all;
  }
  .map-marker:hover {
    cursor: pointer;
  }
  .marker-location-text {
    word-break: break-all;
    white-space: normal;
    margin: 0;
  }
`;

export { SearchInterface };
