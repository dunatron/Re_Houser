import styled from 'styled-components';
import Box from '@material-ui/core/Box';

const FlexLayout = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: -${props => props.theme.spacing(1)}px;
  margin-right: -${props => props.theme.spacing(1)}px;
  @media (min-width: 920px) {
    justify-content: left;
  }
  > div {
    margin-left: ${props => props.theme.spacing(1)}px;
    margin-right: ${props => props.theme.spacing(1)}px;
  }
`;

export default FlexLayout;
