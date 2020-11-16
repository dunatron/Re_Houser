import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';

const RehouserCard = styled(Card)`
  margin-bottom: ${props => props.theme.spacing(2)}px;
  && {
    /* margin: ${props => props.theme.spacing.unit * 3}px 0 0 0; */
    /* margin-bottom: ${props => props.theme.spacing(10)}; */
    
    /* that ?. dirty syntax does work */
    padding: ${props =>
      !props.attrs?.disablePadding && props.theme.spacing(2)}px; 
    /* padding: 16px; */
  }
`;

// RehouserCard.defaultProps = { disablePadding: false };

export default RehouserCard;
