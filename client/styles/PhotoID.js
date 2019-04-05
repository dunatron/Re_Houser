import styled from "styled-components"

const PhotoID = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  width: 70%;
  padding: 0 16px;
  .id__strip {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  .id__number {
    font-size: 28px;
    margin: 0;
    padding: 16px 0;
  }
  img {
    width: 100%;
    min-width: 240px;
    /* max-width: 300px; */
    /* height: 380px; */
    object-fit: cover;
  }
  @media (max-width: ${props => props.theme.breakpoints.values.md}px) {
    width: 100%;
  }
`

export default PhotoID
