import React from 'react';
import Particles from 'react-particles-js';
import './ReactParticles.css';

const ReactParticles = () => (
    <Particles
    params={{
      particles: {
        number: {
          value: 20, // Increase the number of particles
          density: {
            enable: true,
            value_area: 800, // Smaller area to increase particle concentration
          },
        },
        color: {
          value: '#ffffff', // White particles
        },
        opacity: {
          value: 0.9, // High opacity for visibility
          anim: {
            enable: false,
          },
        },
        size: {
          value: 5, // Larger size
          random: true,
        },
        move: {
          enable: true,
          speed: 2, // Faster speed
          direction: 'none',
          out_mode: 'out',
        },
      },
      interactivity: {
        events: {
          onhover: {
            enable: true,
            mode: 'repulse', // Particles move away on hover
          },
          onclick: {
            enable: true,
            mode: 'push', // Add particles on click
          },
        },
        modes: {
          repulse: {
            distance: 200, // Increase repulsion distance
          },
          push: {
            particles_nb: 6, // Add more particles on click
          },
        },
      },
      retina_detect: true,
    }}
    style={{
      position: 'fixed', // Ensure particles cover the whole screen
      width: '100vw', // Set width to viewport width
      height: '100vh', // Set height to viewport height
     // Keep particles behind other content
      top: 0,
      left: 0,
    }}
  />
);
  export default ReactParticles;


