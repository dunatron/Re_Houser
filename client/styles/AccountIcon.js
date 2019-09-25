import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';

const AvatarIcon = styled.div`
  /* background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3); */
  height: 80px;
  position: relative;
  .circle {
    border-radius: 40px;
    height: 60px;
    width: 60px;
    border: 1px solid grey;
    position: relative;
  }

  && {
    margin: 0 8px;
  }
  .details {
    position: absolute;
    /* top: 40; */
    right: 64px;
    /* border: 1px solid red; */
  }
`;

export default AvatarIcon;
