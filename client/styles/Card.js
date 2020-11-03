import styled from 'styled-components';
import Card from '@material-ui/core/Card';

const RehouserCard = styled(Card)`
  margin-bottom: ${props => props.theme.spacing(2)}px;
  // margin-right: ${props => props.theme.spacing(2)}px;
  && {
    /* margin: ${props => props.theme.spacing.unit * 3}px 0 0 0; */
    /* margin-bottom: ${props => props.theme.spacing(10)}; */
    
    padding: ${props => !props.disablePadding && props.theme.spacing(2)}px;
    /* padding: 16px; */
  }
`;

export default RehouserCard;
