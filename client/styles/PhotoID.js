import styled from "styled-components"

const PhotoID = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
  img {
    width: 100%;
    min-width: 240px;
    /* max-width: 300px; */
    /* height: 380px; */
    object-fit: cover;
  }
  @media (max-width: ${props => props.theme.breakpoints.values.md}px) {
  }
`

export default PhotoID
