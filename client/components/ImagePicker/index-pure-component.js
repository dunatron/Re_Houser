import React, { Component, PureComponent } from "react"
import styled from "styled-components"
import encodeImage from "../../lib/encodeImage"
import Fab from "@material-ui/core/Fab"
import DeleteIcon from "@material-ui/icons/Delete"

const ImageList = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export default class ImagePicker extends PureComponent {
  render() {
    const { images } = this.props
    return (
      <ImageList>
        {images.map((img, idx) => (
          <ImageTile image={img} remove={() => this.props.remove(idx)} />
        ))}
      </ImageList>
    )
  }
}
const ImgTile = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 16px;
  @media (max-width: ${props => props.theme.breakpoints.values.md}px) {
    margin: 60px 0 0 0;
  }
  img {
    width: 100%;
    height: 300px;
    /* max-width: 200px; */
    object-fit: cover;
  }
`
class ImageTile extends PureComponent {
  render() {
    const { image } = this.props
    const src =
      image.type === "googleImage"
        ? image.data
        : "data:image/png;base64," + encodeImage(image.data.content)
    return (
      <ImgTile>
        <Fab
          style={{ position: "absolute" }}
          size="small"
          color="secondary"
          aria-label="Add"
          onClick={() => this.props.remove()}>
          X
        </Fab>
        <img src={src} />
      </ImgTile>
    )
  }
}
