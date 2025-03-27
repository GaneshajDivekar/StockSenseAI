import React, { useEffect } from 'react';

export const Particles: React.FC = () => {
  useEffect(() => {
    const container = document.querySelector('.particles');
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.width = Math.random() * 5 + 'px';
      particle.style.height = particle.style.width;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.opacity = (Math.random() * 0.5 + 0.2).toString();
      container.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 6000);
    };

    const interval = setInterval(() => {
      createParticle();
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return <div className="particles" />;
};