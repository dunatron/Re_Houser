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
    overflow: 'hidden',
    margin: '-8px -8px 16px -8px',
    height: '180px',
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
    '&:after': {
      clear: 'both',
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
    // opacity: props => (props.loadingImage ? 0 : 1),
    opacity: props => (props.loadingImage ? 0 : 0.64),
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
  const bannerNode = useRef();
  const [loadingImage, setLoadingImage] = useState(true);
  const { imageSrc, text, children } = props;
  const classes = useStyles({ ...props, loadingImage });
  const handleOnImageLoad = () => {
    setLoadingImage(false);
  };

  const windowHeight = useCurrentHeight();
  const windowWidth = useCurrentWidth();

  // Move main content dom up when using a banner
  useEffect(() => {
    const offsetAmount = windowWidth > 600 ? '-64px' : '-56px';

    window &&
      (document.getElementById('main-content').style.top = offsetAmount);
    return () => {
      window && (document.getElementById('main-content').style.top = '0');
    };
  }, [windowWidth, windowHeight]);

  return (
    <div
      ref={bannerNode}
      className={classes.bannerContainer}
      style={{
        height: windowHeight,
      }}>
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
