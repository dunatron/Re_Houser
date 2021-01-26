import { makeStyles } from '@material-ui/core/styles';

const carouselStyles = {
  // section: {
  //   padding: '70px 0',
  // },
  // marginAuto: {
  //   marginLeft: 'auto !important',
  //   marginRight: 'auto !important',
  // },
  slide: {
    // width: '100%',
    height: '300px',
    margin: 'auto',
  },
  img: {
    margin: 'auto',
  },
  caption: {
    textAlign: 'center',
  },
};

const useCarouselStyles = makeStyles(carouselStyles);

export { useCarouselStyles };
export default useCarouselStyles;
