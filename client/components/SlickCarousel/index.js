import Carousel from 'react-slick';
import useCarouselStyles from './useCarouselStyles';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  adaptiveHeight: false,
  height: '300px',
};

import LocationOn from '@material-ui/icons/LocationOn';

export default function SlickCarousel({ slides = [] }) {
  const classes = useCarouselStyles();
  return (
    <Carousel {...settings}>
      {slides.map((slide, idx) => {
        return (
          <div className={classes.slide}>
            <img
              src={slide.src}
              alt={slide.alt}
              //   className="slick-image"
              className={classes.img}
              style={{ height: '100%', width: '100%,', objectFit: 'contain' }}
            />
            <h3 className={classes.caption}>
              {idx + 1} / {slides.length}
            </h3>
          </div>
        );
      })}
    </Carousel>
  );
  // return (
  //   <Carousel {...settings}>
  //     {slides.map((slide, idx) => (
  //       <div key={idx}>
  //         <img src={slide.src} alt={slide.alt} className="slick-image" />
  //         <div className="slick-caption">
  //           <h4>
  //             {/* <LocationOn className="slick-icons" /> */}
  //             {/* Yellowstone National Park, United States */}
  //           </h4>
  //         </div>
  //       </div>
  //     ))}
  //   </Carousel>
  // );
}
