import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

const FabButton = styled(Fab)`
  /* background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3); */

  && {
    margin: ${props => props.theme.spacing(3)}px 0 0 0;
  }
`;

export default FabButton;
