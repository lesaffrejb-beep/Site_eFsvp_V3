/**
 * Magnetic Buttons
 * Effet premium qui attire le bouton vers le curseur
 */

import { gsap } from 'gsap';

export class MagneticButtons {
  constructor() {
    this.buttons = document.querySelectorAll('[data-magnetic]');
    this.init();
  }

  init() {
    if (this.buttons.length === 0) return;

    this.buttons.forEach((button) => {
      button.addEventListener('mousemove', (e) => this.handleMouseMove(e, button));
      button.addEventListener('mouseleave', () => this.handleMouseLeave(button));
    });
  }

  handleMouseMove(e, button) {
    const bounds = button.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Distance maximale d'effet
    const maxDistance = 100;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < maxDistance) {
      const strength = (maxDistance - distance) / maxDistance;
      const moveX = distanceX * strength * 0.4;
      const moveY = distanceY * strength * 0.4;

      gsap.to(button, {
        x: moveX,
        y: moveY,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }

  handleMouseLeave(button) {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });
  }
}
