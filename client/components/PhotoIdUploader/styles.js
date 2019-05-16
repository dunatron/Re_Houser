import styled from "styled-components"

const DetailStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  align-items: center;
  .details__title {
    color: ${props => props.theme.palette.text.primary};
  }
  .details__image {
    max-height: 300px;
    object-fit: contain;
  }
`

const UploaderStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .preUpload {
    position: relative;
    width: 100%;
  }
  .preUpload__remove {
    position: absolute;
    top: 0;
    right: 0;
    background: ${props => props.theme.palette.error.light};
    &:hover {
      background: ${props => props.theme.palette.error.main};
    }
  }
  .preUpload__image {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  .preUpload__overlay {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.4);
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .preUpload__id-number {
    margin: 0 0 20px 0;
  }
  .preUpload__upload-btn {
    margin: 0 0 20px 0;
  }
`

export { DetailStyles, UploaderStyles }
