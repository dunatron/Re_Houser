import React, { Component } from "react"
import Slider from "react-slick"

class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    const { images } = this.props
    return (
      <Slider {...settings}>
        {images &&
          images.map((image, i) => (
            <div>
              <img
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
                src={image.url}
              />
            </div>
          ))}
      </Slider>
    )
  }
}

export default SimpleSlider
