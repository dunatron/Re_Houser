import Particles from 'react-particles-js';

import {
  mainPrimaryColor,
  lightPrimaryColor,
  darkPrimaryColor,
  mainSecondaryColor,
  lightSecondaryColor,
  darkSecondaryColor,
} from '../../styles/_muiTheme';

const ParticleTwo = () => {
  // return null;

  //   return (
  //     <Particles
  //       width={2000}
  //       height={800}
  //       params={{
  //         particles: {
  //           number: { value: 80, density: { enable: true, value_area: 800 } },
  //           color: { value: '#f70080' },
  //           shape: {
  //             type: 'circle',
  //             stroke: { width: 0, color: '#ff5baf' },
  //             polygon: { nb_sides: 5 },
  //             image: { src: 'img/github.svg', width: 100, height: 100 },
  //           },
  //           opacity: {
  //             value: 0.5,
  //             random: false,
  //             anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
  //           },
  //           size: {
  //             value: 3,
  //             random: true,
  //             anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
  //           },
  //           line_linked: {
  //             enable: true,
  //             distance: 150,
  //             color: '#ff5baf',
  //             opacity: 0.4,
  //             width: 1,
  //           },
  //           move: {
  //             enable: true,
  //             speed: 6,
  //             direction: 'none',
  //             random: false,
  //             straight: false,
  //             out_mode: 'out',
  //             bounce: false,
  //             attract: { enable: true, rotateX: 600, rotateY: 1200 },
  //           },
  //         },
  //         interactivity: {
  //           detect_on: 'canvas',
  //           events: {
  //             onhover: { enable: true, mode: 'grab' },
  //             onclick: { enable: true, mode: 'push' },
  //             resize: true,
  //           },
  //           modes: {
  //             grab: { distance: 400, line_linked: { opacity: 1 } },
  //             bubble: {
  //               distance: 400,
  //               size: 40,
  //               duration: 2,
  //               opacity: 8,
  //               speed: 3,
  //             },
  //             repulse: { distance: 200, duration: 0.4 },
  //             push: { particles_nb: 4 },
  //             remove: { particles_nb: 2 },
  //           },
  //         },
  //         retina_detect: true,
  //       }}
  //     />
  //   );

  //   return (
  //     <Particles
  //       width={2000}
  //       height={800}
  //       params={{
  //         fps_limit: 28,
  //         particles: {
  //           collisions: {
  //             enable: false,
  //           },
  //           number: {
  //             value: 20,
  //             density: {
  //               enable: false,
  //             },
  //           },
  //           //   line_linked: {
  //           //     enable: true,
  //           //     distance: 30,
  //           //     opacity: 0.4,
  //           //   },
  //           line_linked: {
  //             enable: true,
  //             distance: 150,
  //             color: '#ff5baf',
  //             opacity: 0.4,
  //             width: 1,
  //           },
  //           move: {
  //             speed: 1,
  //           },
  //           opacity: {
  //             anim: {
  //               enable: true,
  //               opacity_min: 0.05,
  //               speed: 1,
  //               sync: false,
  //             },
  //             value: 0.4,
  //           },
  //         },
  //         polygon: {
  //           enable: true,
  //           scale: 0.5,
  //           type: 'inline',
  //           move: {
  //             radius: 10,
  //           },
  //           url: 'images/svg/ReHouse_main_logo.svg',
  //           inline: {
  //             arrangement: 'equidistant',
  //           },
  //           draw: {
  //             enable: true,
  //             stroke: {
  //               color: 'rgba(100, 80, 100, 1)',
  //             },
  //           },
  //         },
  //         retina_detect: false,
  //         interactivity: {
  //           events: {
  //             onhover: {
  //               enable: true,
  //               mode: 'bubble',
  //             },
  //           },
  //           modes: {
  //             bubble: {
  //               size: 6,
  //               distance: 40,
  //             },
  //           },
  //         },
  //       }}
  //     />
  //   );
  return (
    <Particles
      id="tsparticles"
      width={2000}
      height={800}
      params={{
        particles: {
          number: {
            value: 50,
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
            speed: 6,
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

export default ParticleTwo;
