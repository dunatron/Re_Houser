import styled from 'styled-components';
import Card from '@material-ui/core/Card';

const PropertyCard = styled(Card)`
  && {
    /* width: 100%; */
    /* margin: 8px; */
    border-radius: unset;
    margin: 8px 0;
    box-sizing: border-box;
    max-width: 480px;
    @media (min-width: 480px) {
      /* width: 480px; */
      /* width: 380; */
    }
    @media (min-width: 520px) {
      margin: 8px;
    }
    @media (min-width: ${props => props.theme.breakpoints.values.md}px) {
      /* width: 380; */
    }
    @media (min-width: 992px) {
      margin: 0 8px 8px 0;
    }
  }
`;

export default PropertyCard;
