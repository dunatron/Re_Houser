import React, { Component } from "react"
import Slider from "react-slick"

class SimpleSlider extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    const { images, imageUrls } = this.props
    return (
      <Slider {...settings}>
        {images &&
          images.map((image, i) => (
            <div key={i}>
              <img
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
                src={image.url}
              />
            </div>
          ))}
        {imageUrls &&
          imageUrls.map((url, i) => (
            <div key={i}>
              <img
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
                src={url}
              />
            </div>
          ))}
      </Slider>
    )
  }
}

export default SimpleSlider
