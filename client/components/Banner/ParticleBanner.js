import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//hooks
import useCurrentWidth from '@/Lib/hooks/useCurrentWidth';
import useCurrentHeight from '@/Lib/hooks/useCurrentHeight';
import ParticleOne from '@/Components/Particles/ParticleOne';

const useStyles = makeStyles(theme => ({
  root: {},
  bannerContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    padding: theme.spacing(3),
    width: '100%',
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
  },
}));

const ParticleBanner = props => {
  const bannerNode = useRef();
  const { children, footer, disablePointerEvents = false } = props;
  const classes = useStyles();

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
      <ParticleOne />
      <div
        className={classes.overlay}
        style={{
          pointerEvents: disablePointerEvents ? 'none' : 'all',
        }}>
        {children}
        {footer && (
          <div id="banner-footer" className={classes.footer}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

ParticleBanner.propTypes = {
  children: PropTypes.any.isRequired,
  disablePointerEvents: PropTypes.bool.isRequired,
  footer: PropTypes.any.isRequired,
};

export default ParticleBanner;
