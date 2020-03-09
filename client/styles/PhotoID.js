import styled from 'styled-components';

const PhotoID = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  width: 50%;
  flex-grow: 3;
  /* padding: 0 16px; */
  padding: 0;
  position: relative;
  .id__strip {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 9999;
    background-color: rgba(255, 255, 255, 0.3);
  }
  .id__number {
    font-size: 28px;
    margin: 0;
    padding: 16px 0;
  }
  img {
    /* width: 100%; */
    /* min-width: 240px; */
    /* max-width: 300px; */
    /* height: 380px; */
    /* object-fit: cover; */
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export default PhotoID;
