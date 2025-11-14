/**
 * Custom Cursor (Desktop uniquement)
 * Effet premium Awwwards
 */

import { gsap } from 'gsap';

export class CursorManager {
  constructor() {
    // Desktop uniquement
    if (window.innerWidth < 1024 || 'ontouchstart' in window) {
      return;
    }

    this.cursor = null;
    this.cursorFollower = null;
    this.pos = { x: 0, y: 0 };
    this.mouse = { x: 0, y: 0 };

    this.init();
  }

  init() {
    this.createCursor();
    this.setupEventListeners();
    this.animateCursor();
  }

  createCursor() {
    // Curseur principal (petit point)
    this.cursor = document.createElement('div');
    this.cursor.className = 'cursor';
    this.cursor.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: var(--accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: var(--z-cursor);
      mix-blend-mode: difference;
      transition: transform 0.15s ease, opacity 0.3s ease;
    `;

    // Follower (cercle plus grand)
    this.cursorFollower = document.createElement('div');
    this.cursorFollower.className = 'cursor-follower';
    this.cursorFollower.style.cssText = `
      position: fixed;
      width: 40px;
      height: 40px;
      border: 1px solid var(--accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: var(--z-cursor);
      mix-blend-mode: difference;
      transition: transform 0.3s ease, opacity 0.3s ease;
    `;

    document.body.appendChild(this.cursor);
    document.body.appendChild(this.cursorFollower);
  }

  setupEventListeners() {
    // Track mouse
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    // Hide on leave
    document.addEventListener('mouseleave', () => {
      this.cursor.style.opacity = '0';
      this.cursorFollower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      this.cursor.style.opacity = '1';
      this.cursorFollower.style.opacity = '1';
    });

    // Hover states
    const interactiveElements = document.querySelectorAll('a, button, [data-magnetic]');

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        this.cursor.style.transform = 'scale(2)';
        this.cursorFollower.style.transform = 'scale(1.5)';
      });

      el.addEventListener('mouseleave', () => {
        this.cursor.style.transform = 'scale(1)';
        this.cursorFollower.style.transform = 'scale(1)';
      });
    });
  }

  animateCursor() {
    // Cursor suit instantanément
    gsap.set(this.cursor, {
      x: this.mouse.x,
      y: this.mouse.y,
      xPercent: -50,
      yPercent: -50,
    });

    // Follower suit avec délai (smooth)
    gsap.to(this.cursorFollower, {
      duration: 0.3,
      x: this.mouse.x,
      y: this.mouse.y,
      xPercent: -50,
      yPercent: -50,
      ease: 'power2.out',
      onComplete: () => this.animateCursor(),
    });
  }
}
