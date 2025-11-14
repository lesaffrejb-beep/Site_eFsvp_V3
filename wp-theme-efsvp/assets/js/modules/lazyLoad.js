/**
 * Lazy Loading Manager
 * Images, videos, iframes avec IntersectionObserver
 * Performance optimale mobile
 */

export class LazyLoadManager {
  constructor() {
    this.imageObserver = null;
    this.videoObserver = null;
    this.blurObserver = null;

    this.init();
  }

  init() {
    // Check support
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not supported, loading all images immediately');
      this.loadAllImagesImmediately();
      return;
    }

    this.setupImageObserver();
    this.setupVideoObserver();
    this.setupBlurEffects();
  }

  setupImageObserver() {
    const options = {
      root: null,
      rootMargin: '50px', // Start loading 50px before entering viewport
      threshold: 0,
    };

    this.imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observe all lazy images
    const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');
    lazyImages.forEach((img) => {
      this.imageObserver.observe(img);
    });
  }

  loadImage(img) {
    // Handle data-src
    const src = img.dataset.src || img.src;
    const srcset = img.dataset.srcset;

    if (!src) return;

    // Create temporary image to test load
    const tempImg = new Image();

    tempImg.onload = () => {
      // Success: apply image
      img.src = src;
      if (srcset) {
        img.srcset = srcset;
      }

      // Add loaded class for animation
      img.classList.add('lazy-loaded');

      // Fade in animation
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.4s ease';

      requestAnimationFrame(() => {
        img.style.opacity = '1';
      });

      // Cleanup
      delete img.dataset.src;
      delete img.dataset.srcset;
    };

    tempImg.onerror = () => {
      console.error('Failed to load image:', src);
      img.classList.add('lazy-error');

      // Show fallback
      img.src =
        'data:image/svg+xml,' +
        encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
          <rect width="400" height="300" fill="#223044"/>
          <text x="50%" y="50%" fill="#9AA3AE" text-anchor="middle" dy=".3em" font-family="sans-serif" font-size="14">
            Image indisponible
          </text>
        </svg>
      `);
    };

    tempImg.src = src;
  }

  setupVideoObserver() {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0,
    };

    this.videoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
          // Load video source
          if (video.dataset.src) {
            video.src = video.dataset.src;
            delete video.dataset.src;

            // Autoplay if requested
            if (video.hasAttribute('data-autoplay')) {
              video.play().catch((error) => {
                console.warn('Video autoplay prevented:', error);
              });
            }
          }

          observer.unobserve(video);
        }
      });
    }, options);

    // Observe all lazy videos
    const lazyVideos = document.querySelectorAll('video[data-src]');
    lazyVideos.forEach((video) => {
      this.videoObserver.observe(video);
    });
  }

  setupBlurEffects() {
    // Lazy load blur placeholder images
    const options = {
      root: null,
      rootMargin: '200px',
      threshold: 0,
    };

    this.blurObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;

          // Remove blur filter gradually
          if (element.style.filter) {
            element.style.transition = 'filter 0.6s ease';
            element.style.filter = 'blur(0px)';
          }

          // Add loaded class
          element.classList.add('blur-loaded');

          observer.unobserve(element);
        }
      });
    }, options);

    // Observe elements with blur effect
    const blurElements = document.querySelectorAll('[data-blur]');
    blurElements.forEach((el) => {
      // Add initial blur
      el.style.filter = 'blur(20px)';
      el.style.transform = 'scale(1.1)'; // Prevent edge bleeding

      this.blurObserver.observe(el);
    });
  }

  loadAllImagesImmediately() {
    // Fallback for browsers without IntersectionObserver
    const lazyImages = document.querySelectorAll('img[data-src]');

    lazyImages.forEach((img) => {
      const src = img.dataset.src;
      const srcset = img.dataset.srcset;

      if (src) {
        img.src = src;
      }
      if (srcset) {
        img.srcset = srcset;
      }

      delete img.dataset.src;
      delete img.dataset.srcset;
    });
  }

  // Public method to lazy load new elements dynamically added
  observe(element) {
    if (element.tagName === 'IMG') {
      this.imageObserver?.observe(element);
    } else if (element.tagName === 'VIDEO') {
      this.videoObserver?.observe(element);
    }
  }

  // Cleanup
  destroy() {
    this.imageObserver?.disconnect();
    this.videoObserver?.disconnect();
    this.blurObserver?.disconnect();
  }
}

/**
 * Utility: Convert image to blur placeholder
 * Usage: Add this to build process or use service like Cloudinary
 */
export function generateBlurPlaceholder(imageSrc) {
  // This would typically be done server-side or at build time
  // Returns a base64 encoded tiny blurred version

  // Example: tiny 10x10 px version
  // In production, use something like sharp or jimp to generate these
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Cfilter id='b'%3E%3CfeGaussianBlur stdDeviation='1'/%3E%3C/filter%3E%3Cimage filter='url(%23b)' width='10' height='10' href='${imageSrc}'/%3E%3C/svg%3E`;
}

/**
 * Add blur-up effect to image
 * Shows tiny blurred placeholder while loading full image
 */
export function addBlurUpEffect(img, placeholderSrc) {
  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'blur-up-wrapper';
  wrapper.style.cssText = `
    position: relative;
    display: inline-block;
    overflow: hidden;
  `;

  // Create placeholder
  const placeholder = document.createElement('div');
  placeholder.className = 'blur-up-placeholder';
  placeholder.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${placeholderSrc});
    background-size: cover;
    background-position: center;
    filter: blur(20px);
    transform: scale(1.1);
    transition: opacity 0.4s ease;
  `;

  // Wrap image
  img.parentNode.insertBefore(wrapper, img);
  wrapper.appendChild(placeholder);
  wrapper.appendChild(img);

  // When image loads, fade out placeholder
  img.addEventListener('load', () => {
    placeholder.style.opacity = '0';
    setTimeout(() => {
      placeholder.remove();
    }, 400);
  });
}
