/**
 * Block: Créations Audio
 * JavaScript pour gérer les interactions audio et les waveforms
 *
 * @package EfSVP
 * @since 1.0.0
 */

(function () {
  'use strict';

  /**
   * Initialize audio players
   */
  function initAudioPlayers() {
    // Get all audio play buttons
    const playButtons = document.querySelectorAll('[data-audio]');

    // Current playing audio
    let currentAudio = null;
    let currentButton = null;

    playButtons.forEach((button) => {
      button.addEventListener('click', function () {
        const audioId = this.getAttribute('data-audio');

        // If clicking the same button, toggle play/pause
        if (currentButton === this && currentAudio) {
          if (currentAudio.paused) {
            currentAudio.play();
            this.classList.add('playing');
          } else {
            currentAudio.pause();
            this.classList.remove('playing');
          }
          return;
        }

        // Stop current audio if playing
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
          if (currentButton) {
            currentButton.classList.remove('playing');
          }
        }

        // Create new audio element (or use existing one)
        if (!currentAudio || currentButton !== this) {
          // In a real implementation, you would load the actual audio file
          // For now, we'll create a dummy audio element
          currentAudio = new Audio();
          // currentAudio.src = `/path/to/audio/${audioId}.mp3`;

          currentAudio.addEventListener('ended', function () {
            if (currentButton) {
              currentButton.classList.remove('playing');
            }
            currentAudio = null;
            currentButton = null;
          });
        }

        // Play the audio
        // currentAudio.play();
        this.classList.add('playing');
        currentButton = this;

        // Simulate audio playback (remove this in production)
        setTimeout(() => {
          if (this === currentButton) {
            this.classList.remove('playing');
            currentAudio = null;
            currentButton = null;
          }
        }, 3000);
      });
    });
  }

  /**
   * Initialize waveform visualizations
   * Note: This is a placeholder. In production, you would use a library like WaveSurfer.js
   */
  function initWaveforms() {
    const waveforms = document.querySelectorAll('.audio-player__waveform, .audio-player__waveform-mini');

    waveforms.forEach((waveform) => {
      // Create simple waveform bars as placeholder
      const barsCount = waveform.classList.contains('audio-player__waveform-mini') ? 20 : 40;
      const barsHTML = [];

      for (let i = 0; i < barsCount; i++) {
        const height = Math.random() * 60 + 20; // Random height between 20-80%
        barsHTML.push(
          `<div class="waveform-bar" style="height: ${height}%; background: var(--accent); opacity: 0.3; width: ${100 / barsCount}%; display: inline-block; margin: 0 1px; border-radius: 2px; transition: opacity 0.3s ease;"></div>`
        );
      }

      waveform.innerHTML = barsHTML.join('');

      // Add hover effect
      waveform.style.display = 'flex';
      waveform.style.alignItems = 'flex-end';
      waveform.style.justifyContent = 'space-between';
      waveform.style.padding = '8px';

      const bars = waveform.querySelectorAll('.waveform-bar');
      bars.forEach((bar, index) => {
        bar.addEventListener('mouseenter', function () {
          this.style.opacity = '0.8';
        });
        bar.addEventListener('mouseleave', function () {
          this.style.opacity = '0.3';
        });
      });
    });
  }

  /**
   * Initialize scroll animations
   */
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-reveal], [data-scroll]');
    animatedElements.forEach((element) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(element);
    });
  }

  /**
   * Initialize hover effects
   */
  function initHoverEffects() {
    // Lift effect on cards
    const liftElements = document.querySelectorAll('[data-lift]');
    liftElements.forEach((element) => {
      element.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px) scale(1.02)';
      });
      element.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Glow effect on cards
    const glowElements = document.querySelectorAll('[data-glow]');
    glowElements.forEach((element) => {
      element.addEventListener('mouseenter', function () {
        this.style.boxShadow = '0 20px 60px rgba(184, 68, 30, 0.3)';
      });
      element.addEventListener('mouseleave', function () {
        this.style.boxShadow = '';
      });
    });
  }

  /**
   * Initialize on DOM ready
   */
  function init() {
    initAudioPlayers();
    initWaveforms();
    initScrollAnimations();
    initHoverEffects();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialize on dynamic content load (e.g., AJAX, Gutenberg editor)
  if (window.acf) {
    window.acf.addAction('render_block_preview', init);
  }
})();
