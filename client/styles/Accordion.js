import styled from 'styled-components';
import AccordionComponent from '@material-ui/core/Accordion';

const Accordion = styled(AccordionComponent)`

  && {
    /* margin: ${props => props.theme.spacing.unit * 3}px 0 0 0; */
    border: ${props => {
      if (props.highlight === true) {
        // return `2px solid ${props.theme.palette.secondary.main}`
      }
    }};
  }
`;

export default Accordion;
