import PropTypes from "prop-types";
import React, { useState } from 'react';

import { connectHighlight } from 'react-instantsearch-dom';

const CustomHighlight = connectHighlight(({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  });

  return (
    <div>
      {parsedHit.map(part =>
        part.isHighlighted ? <mark>{part.value}</mark> : part.value
      )}
    </div>
  );
});

CustomHighlight.propTypes = {
  attribute: PropTypes.any.isRequired,
  highlight: PropTypes.func.isRequired,
  hit: PropTypes.any.isRequired
}

export default CustomHighlight;
