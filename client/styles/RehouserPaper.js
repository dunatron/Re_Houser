import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

const RehouserPaper = styled(Paper)`
  && {
    margin-bottom: 16px;
    padding: 16px;
    @media (min-width: 480px) {
    }
    @media (min-width: 520px) {
    }
    @media (min-width: ${props => props.theme.breakpoints.values.md}px) {
    }
    @media (min-width: 992px) {
    }
  }
`;

export default RehouserPaper;
