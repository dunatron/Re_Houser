import styled from 'styled-components';
import ExpansionPanelComponent from '@material-ui/core/ExpansionPanel';

const ExpansionPanel = styled(ExpansionPanelComponent)`

  && {
    /* margin: ${props => props.theme.spacing.unit * 3}px 0 0 0; */
    border: ${props => {
      if (props.highlight === true) {
        // return `2px solid ${props.theme.palette.secondary.main}`
      }
    }};
  }
`;

export default ExpansionPanel;
