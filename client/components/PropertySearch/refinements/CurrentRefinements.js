import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connectCurrentRefinements } from 'react-instantsearch-dom';
import Chip from '@material-ui/core/Chip';
import Styled from 'styled-components';

const CurrentRefinementStyles = Styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: ${props => `${props.theme.spacing(1)}px;`}
  margin-left: ${props => `${props.theme.spacing(1)}px;`}
  .refinement-group {
   
  }
  .refinement-group__label {
    color: ${props => props.theme.palette.secondary.main}
    /* color: red; */
    /* border: ${props => props.border}; */
  }
  .refinement-group__list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
  }
  .refinement-listItem {
    list-style: none;
    margin-right: ${props => `${props.theme.spacing(1)}px;`}
    margin-bottom: ${props => `${props.theme.spacing(1)}px;`}
  }
  .refinement-chip {
    margin: 0 6px 6px 0
  }
`;

const RefinementValue = ({ item, refine, url }) => {
  return (
    <Chip
      style={{
        maxWidth: '100%',
      }}
      size="small"
      className="refinement-chip"
      label={item.label}
      onDelete={() => refine(item.value)}
      color="primary"
      variant="outlined"
    />
  );
};

RefinementValue.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.any,
    value: PropTypes.any,
  }).isRequired,
  refine: PropTypes.func.isRequired,
  url: PropTypes.any,
};

const RefinementGroupList = ({ item, refine, createURL }) => {
  return (
    <div className="refinement-group">
      <span className="refinement-group__label">{item.label}</span>
      <ul className="refinement-group__list">
        {item.items.map(nested => (
          <li key={nested.label} className="refinement-listItem">
            <RefinementValue
              refine={refine}
              item={nested}
              url={createURL(nested.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

RefinementGroupList.propTypes = {
  createURL: PropTypes.func.isRequired,
  item: PropTypes.shape({
    items: PropTypes.shape({
      map: PropTypes.func,
    }),
    label: PropTypes.any,
  }).isRequired,
  refine: PropTypes.any,
};

const CurrentRefinements = ({ items, refine, createURL }) => (
  <CurrentRefinementStyles>
    {items.map(item => (
      <li key={item.label} className="refinement-listItem">
        {item.items ? (
          <RefinementGroupList
            item={item}
            refine={refine}
            createURL={createURL}
          />
        ) : (
          <RefinementValue
            refine={refine}
            item={item}
            url={createURL(item.value)}
          />
        )}
      </li>
    ))}
  </CurrentRefinementStyles>
);

CurrentRefinements.propTypes = {
  createURL: PropTypes.func.isRequired,
  items: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  refine: PropTypes.any,
};

const CustomCurrentRefinements = connectCurrentRefinements(CurrentRefinements);

export default CustomCurrentRefinements;
