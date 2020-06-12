import React, { useState, useRef, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';
import Error from '../ErrorMessage';
import Loader from '../Loader';

//hooks
import useCurrentWidth from '../../lib/hooks/useCurrentWidth';
import useCurrentHeight from '../../lib/hooks/useCurrentHeight';
import useCurrentScrollTop from '../../lib/hooks/useCurrentScrollTop';

/**
 * Images are ugly until they're loaded. Materialize it with material image! It will fade in like the material image loading pattern suggests.
 * @see [Image loading patterns](https://material.io/guidelines/patterns/loading-images.html)
 */
const useStyles = makeStyles(theme => ({
  root: {},
  bannerContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: '100px',
    height: '180px',
    overflow: 'hidden',
    margin: '-8px -8px 16px -8px',
    [theme.breakpoints.up('sm')]: {
      height: '260px',
    },
    [theme.breakpoints.up('md')]: {
      height: '320px',
    },
    [theme.breakpoints.up('lg')]: {
      height: '420px',
    },
    [theme.breakpoints.up('xl')]: {
      height: '500px',
    },
  },
  imageOverlay: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    opacity: props => (props.loadingImage ? 0 : 1),
    transition: `opacity 2000ms cubic-bezier(0.4, 0.0, 0.2, 1)`,
    backgroundImage: props =>
      props.loadingImage
        ? 'none'
        : `url(${props.imageSrc})` /* The image used */,
    // backgroundColor: '#cccccc' /* Used if the image is unavailable */,
    backgroundColor: 'red' /* Used if the image is unavailable */,
    backgroundPosition: 'center' /* Center the image */,
    backgroundRepeat: 'no-repeat' /* Do not repeat the image */,
    backgroundSize:
      'cover' /* Resize the background image to cover the entire container */,
  },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

///images/banners/home-page-banner.jpg
const Banner = props => {
  const windowWidth = useCurrentWidth();
  const windowHeight = useCurrentHeight();
  const scrollTop = useCurrentScrollTop();
  const bannerNode = useRef();
  const [loadingImage, setLoadingImage] = useState(true);
  const { imageSrc, text, children } = props;
  const classes = useStyles({ ...props, loadingImage });
  const handleOnImageLoad = () => {
    setLoadingImage(false);
  };

  //   console.log('windowWidth => ', windowWidth);
  //   console.log('windowHeight => ', windowHeight);
  console.log('scrollTop ', scrollTop);

  useEffect(() => {
    // change banner dimensions style inline
    // if (scrollTop > 50) {
    //   bannerNode.current.style.height = `${scrollTop}px`;
    // }
    // let maxHeight = 300;
    // // if (scrollTop < 50) {
    // //   maxHeight = 150;
    // // } else if (scrollTop > 400) {
    // //   maxHeight = 75;
    // // } else {
    // //   maxHeight = 150 - (75 * (((scrollTop - 200) * 100) / 200)) / 100;
    // // }
    // // maxHeight = 150 - (75 * (((scrollTop - 200) * 100) / 200)) / 100;
    // // maxHeight = 300 - (75 * (((scrollTop - 50) * 100) / 300)) / 100;
    // if (scrollTop < 50) {
    //   maxHeight = 300;
    // } else if (scrollTop > 300) {
    //   maxHeight = 75;
    //   bannerNode.current.style.marginTop = `300px`;
    // } else {
    //   //   maxHeight = 300 - (75 * (((scrollTop - 50) * 100) / 300)) / 100;
    //   // maxHeight = 150 - (75 * (((scrollTop - 200) * 100) / 200)) / 100;
    //   maxHeight = 150 - scrollTop / 75;
    //   bannerNode.current.style.marginTop = `${scrollTop}px`;
    // }
    // // this is because the scrollTop changes as the banner shrinks.
    // // I guess it cant shrink less than the scroll. argggg
    // // bannerNode.current.animate({ 'max-height': maxHeight + 'px' }, 500);
    // bannerNode.current.style.height = `${maxHeight}px`;
    // bannerNode.current.style.css({
    //   'max-height': maxHeight + 'px',
    // });
    // $('#thediv')
    //   .stop()
    //   .animate({ 'max-height': maxHeight + 'px' }, 500);
  }, [scrollTop]);

  return (
    <div ref={bannerNode} className={classes.bannerContainer}>
      {/* Simply here to detect when the image is loaded...  */}
      <div className={classes.imageOverlay}></div>
      <img
        onLoad={handleOnImageLoad}
        src={imageSrc}
        style={{
          display: 'none',
        }}></img>
      <div className={classes.overlay}>
        {loadingImage && (
          <Loader loading={loadingImage} text="wating for image to render" />
        )}
        {children}
      </div>
    </div>
  );
};

export default Banner;
