import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Particles from 'react-particles-js';
import { useTheme } from '@material-ui/core';
import debounce from '@/Lib/debounce';
import isBrowser from '@/Lib/isBrowser';

const _createParticlesObj = theme => {
  // const lineColor = mainPrimaryColor;
  // const dotColor = darkPrimaryColor;
  const lineColor = theme.palette.primary.main;
  const dotColor = theme.palette.primary.dark;
  return {
    number: {
      value: 50,
      // value: 300,
      density: {
        enable: true,
        // value_area: 800,
        // value_area: 1000,
        value_area: 800,
      },
    },
    color: {
      // value: '#ff5baf',
      // value: '#000',
      // value: darkPrimaryColor,
      value: dotColor,
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#ff5baf',
      },
      polygon: {
        // nb_sides: 5,
        nb_sides: 5,
      },
      image: {
        src: 'images/svg/ReHouse_main_logo.svg',
        // width: 100,
        // height: 100,
        width: 200,
        height: 200,
      },
    },
    opacity: {
      // value: 0.3,
      value: 0.8,
      // value: 1,
      // value: 0.7,
      // random: false,
      random: true,
      anim: {
        // enable: false,
        enable: true,
        // speed: 1,
        speed: 0.8,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      // value: 3,
      // value: 2,
      // value: 20,
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: lineColor,
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      // speed: 3,
      // speed: 1.5,
      speed: 2,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  };
};

const interactivityObj = {
  detect_on: 'canvas',
  events: {
    onhover: {
      enable: true,
      mode: 'grab',
    },
    onclick: {
      enable: true,
      mode: 'push',
    },
    resize: true,
  },
  modes: {
    grab: {
      distance: 140,
      line_linked: {
        opacity: 1,
      },
    },
    bubble: {
      distance: 400,
      // size: 40,
      size: 10,
      duration: 2,
      opacity: 8,
      speed: 3,
    },
    repulse: {
      distance: 200,
      duration: 0.4,
    },
    push: {
      particles_nb: 4,
    },
    remove: {
      particles_nb: 2,
    },
  },
};

const ParticleOne = () => {
  const theme = useTheme();
  const [dimensions, setDimensions] = useState({
    height: isBrowser() ? window.innerHeight : '100vh',
    width: isBrowser() ? window.innerWidth : '100vw',
  });

  const particlesObj = _createParticlesObj(theme);

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 1000);

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);

  return (
    <Particles
      id="rehouser-particles"
      style={{
        opacity: 0.6,
      }}
      width={dimensions.width}
      height={dimensions.height}
      params={{
        particles: particlesObj,
        interactivity: interactivityObj,
        retina_detect: true,
      }}
    />
  );
};

const OriginalParticle = ({ dimensions }) => {
  return (
    <Particles
      id="rehouser-particles"
      width={dimensions.width}
      height={dimensions.height}
      params={{
        particles: {
          number: {
            value: 25,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            // value: '#ff5baf',
            // value: '#000',
            // value: darkPrimaryColor,
            value: mainPrimaryColor,
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#ff5baf',
            },
            polygon: {
              nb_sides: 5,
            },
            image: {
              src: 'img/github.svg',
              width: 100,
              height: 100,
            },
          },
          opacity: {
            value: 0.5,
            // value: 1,
            // value: 0.7,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#ff5baf',
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 3,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab',
            },
            onclick: {
              enable: true,
              mode: 'push',
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
};

OriginalParticle.propTypes = {
  dimensions: PropTypes.shape({
    height: PropTypes.any,
    width: PropTypes.any,
  }).isRequired,
};

const ImageParticle = ({ dimensions }) => {
  return (
    <Particles
      id="rehouser-particles"
      width={dimensions.width}
      height={dimensions.height}
      params={{
        fps_limit: 28,
        particles: {
          collisions: {
            enable: false,
          },
          number: {
            value: 200,
            density: {
              enable: false,
            },
          },
          // line_linked: {
          //   enable: true,
          //   distance: 30,
          //   opacity: 0.4,
          // },
          line_linked: {
            enable: true,
            distance: 30,
            color: '#ff5baf',
            opacity: 0.4,
            width: 1,
          },
          move: {
            speed: 1,
          },
          color: {
            value: mainPrimaryColor,
          },
          opacity: {
            anim: {
              enable: true,
              opacity_min: 0.05,
              speed: 1,
              sync: false,
            },
            value: 0.4,
          },
        },
        polygon: {
          enable: true,
          scale: 0.5,
          type: 'inline',
          move: {
            radius: 10,
          },
          // url: 'images/svg/small-deer.svg',
          url: 'images/svg/ReHouse_main_logo.svg',
          inline: {
            arrangement: 'equidistant',
          },
          draw: {
            enable: true,
            stroke: {
              color: 'rgba(255, 255, 255, .8)',
            },
          },
        },
        retina_detect: false,
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: 'bubble',
            },
          },
          modes: {
            bubble: {
              size: 6,
              distance: 40,
            },
          },
        },
      }}
    />
  );
};

ImageParticle.propTypes = {
  dimensions: PropTypes.shape({
    height: PropTypes.any,
    width: PropTypes.any,
  }).isRequired,
};

export default ParticleOne;
