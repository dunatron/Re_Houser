import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import FlexLayout from '@/Styles/layouts/FlexLayout';

const BoardItemStyles = styled(Paper)`
  /* background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  
  border: 0;
  color: white;
  height: 48px;
 
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3); */
  /* height: 300px; */
  width: 258px;
  margin: 8px;

  && {
    /* margin: ${props => props.theme.spacing(0)}px 0 0 0; */
    border-radius: 0;
  }
  .item-btn-ico {
    display: flex;
    padding: 0 16px;
  }
  .item-btn {
    border-radius: 0;
    padding: 16px 8px;
    width: 100%;
    font-family: "Roboto";
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 1.3;
    letter-spacing: -0.01562em;
    justify-content: flex-start;
    align-items: center;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .item-description {
    padding: 0 16px 16px 16px;
    font-size: 1.2rem;
    line-height: 1.167;
    font-family: "Roboto";
    font-weight: 300;
  }
`;

const DashBoardStyles = styled('div')`
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
    // padding: 16px;
    margin-top: 32px;
  }
  .intro {
    max-width: 800px;
    // margin: auto;
    // padding: 0 16px;
  }
  .items {
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
  }
`;

export default DashBoardStyles;
export { DashBoardStyles, BoardItemStyles };
