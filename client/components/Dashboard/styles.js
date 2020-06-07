import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
const BoardItemStyles = styled(Paper)`
  /* background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3); */
  /* height: 300px; */
  width: 260px;
  margin: 16px;

  && {
    /* margin: ${props => props.theme.spacing(0)}px 0 0 0; */
  }
  .item-btn-ico {
    display: flex;
    padding: 0 16px;
  }
  .item-btn {
    width: 100%;
    font-size: 20px;
    font-family: "GustanLight";
    justify-content: flex-start;
    align-items: center;
  }
  .item-description {
    padding: 0 16px 16px 16px;
    font-size: 18px;
    line-height: 28px;
    font-family: "GustanLight";
  }
`;

const DashBoardStyles = styled(Paper)`
  /* background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3); */
  margin-bottom: 16px;

  && {
    /* margin: ${props => props.theme.spacing(3)}px 0 0 0; */
  }
  .heading {
    // text-align: center;
    padding: 16px;
  }
  .intro {
    max-width: 800px;
    // margin: auto;
    padding: 0 16px;
  }
  .items {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    @media only screen and (max-width: 892px) {
      justify-content: center;
    }    
  }
`;

export default DashBoardStyles;
export { DashBoardStyles, BoardItemStyles };
