/**
 * Global Error Handler & Fallback System
 * Gère toutes les erreurs JS et affiche des fallbacks user-friendly
 */

export class ErrorHandler {
  constructor() {
    this.errors = [];
    this.maxErrors = 10;

    this.init();
  }

  init() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.handleError({
        type: 'error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
      });
    });

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        type: 'promise',
        message: event.reason?.message || 'Unhandled promise rejection',
        error: event.reason,
      });
    });

    // Resource loading errors
    window.addEventListener(
      'error',
      (event) => {
        if (event.target !== window) {
          this.handleResourceError(event);
        }
      },
      true
    );
  }

  handleError(errorInfo) {
    console.error('🔥 Global Error:', errorInfo);

    // Store error
    this.errors.push({
      ...errorInfo,
      timestamp: new Date().toISOString(),
    });

    // Keep only recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }

    // Show user-friendly notification
    this.showErrorNotification(errorInfo);

    // Log to analytics (if available)
    this.logToAnalytics(errorInfo);
  }

  handleResourceError(event) {
    const target = event.target;
    const tagName = target.tagName?.toLowerCase();

    console.warn(`⚠️ Resource failed to load: ${tagName}`, target.src || target.href);

    // Handle different resource types
    switch (tagName) {
      case 'img':
        this.handleImageError(target);
        break;
      case 'video':
        this.handleVideoError(target);
        break;
      case 'audio':
        this.handleAudioError(target);
        break;
      case 'script':
        this.handleScriptError(target);
        break;
      case 'link':
        this.handleStyleError(target);
        break;
    }
  }

  handleImageError(img) {
    // Placeholder SVG avec bon ratio d'aspect
    img.src =
      'data:image/svg+xml,' +
      encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="#223044"/>
        <text x="50%" y="50%" fill="#9AA3AE" text-anchor="middle" dy=".3em" font-family="sans-serif" font-size="16">
          Image non disponible
        </text>
      </svg>
    `);
    img.classList.add('image-fallback');
  }

  handleVideoError(video) {
    // Replace with poster or static gradient
    const parent = video.parentElement;
    if (parent) {
      const fallback = document.createElement('div');
      fallback.className = 'video-fallback';
      fallback.style.cssText = `
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0F151D 0%, #141C26 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #9AA3AE;
        font-size: 14px;
      `;
      fallback.innerHTML = `
        <div style="text-align: center;">
          <svg style="width: 48px; height: 48px; margin-bottom: 12px; opacity: 0.5;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="23 7 16 12 23 17 23 7"></polygon>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
          </svg>
          <p>Vidéo non disponible</p>
        </div>
      `;
      parent.replaceChild(fallback, video);
    }
  }

  handleAudioError(audio) {
    console.warn('Audio failed to load:', audio.src);
    // Audio errors are handled in AudioPlayerManager
  }

  handleScriptError(script) {
    console.error('❌ Critical: Script failed to load:', script.src);
    // Show notification for critical scripts
    if (script.hasAttribute('data-critical')) {
      this.showCriticalError();
    }
  }

  handleStyleError(link) {
    console.warn('Stylesheet failed to load:', link.href);
  }

  showErrorNotification(errorInfo) {
    // Don't show for resource errors (handled separately)
    if (errorInfo.type !== 'error' && errorInfo.type !== 'promise') {
      return;
    }

    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.innerHTML = `
      <div class="error-toast__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <div class="error-toast__content">
        <p class="error-toast__title">Une erreur s'est produite</p>
        <p class="error-toast__message">L'application continue de fonctionner normalement.</p>
      </div>
      <button class="error-toast__close" aria-label="Fermer">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    // Add styles inline
    this.addToastStyles(toast);

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.add('error-toast--visible');
    });

    // Close button
    const closeBtn = toast.querySelector('.error-toast__close');
    closeBtn.addEventListener('click', () => {
      this.hideToast(toast);
    });

    // Auto-hide after 5s
    setTimeout(() => {
      this.hideToast(toast);
    }, 5000);
  }

  hideToast(toast) {
    toast.classList.remove('error-toast--visible');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }

  addToastStyles(toast) {
    if (!document.getElementById('error-toast-styles')) {
      const style = document.createElement('style');
      style.id = 'error-toast-styles';
      style.textContent = `
        .error-toast {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 10000;
          background: #141C26;
          border: 2px solid #B8441E;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          max-width: 400px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.42);
          transform: translateX(120%);
          transition: transform 0.3s cubic-bezier(0.22, 0.9, 0.24, 1);
        }

        .error-toast--visible {
          transform: translateX(0);
        }

        .error-toast__icon {
          width: 24px;
          height: 24px;
          color: #B8441E;
          flex-shrink: 0;
        }

        .error-toast__icon svg {
          width: 100%;
          height: 100%;
        }

        .error-toast__content {
          flex: 1;
        }

        .error-toast__title {
          font-weight: 600;
          font-size: 14px;
          color: #EAECEF;
          margin-bottom: 4px;
        }

        .error-toast__message {
          font-size: 13px;
          color: #9AA3AE;
          margin: 0;
        }

        .error-toast__close {
          width: 20px;
          height: 20px;
          color: #9AA3AE;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          flex-shrink: 0;
          transition: color 0.2s;
        }

        .error-toast__close:hover {
          color: #EAECEF;
        }

        .error-toast__close svg {
          width: 100%;
          height: 100%;
        }

        @media (max-width: 475px) {
          .error-toast {
            top: 16px;
            right: 16px;
            left: 16px;
            max-width: none;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  showCriticalError() {
    // Show full-page error overlay for critical errors
    const overlay = document.createElement('div');
    overlay.className = 'critical-error-overlay';
    overlay.innerHTML = `
      <div class="critical-error__content">
        <svg style="width: 80px; height: 80px; color: #B8441E; margin-bottom: 24px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h2>Erreur de chargement</h2>
        <p>Certaines ressources nécessaires n'ont pas pu être chargées.</p>
        <button class="btn btn--primary" onclick="location.reload()">
          Recharger la page
        </button>
      </div>
    `;

    // Styles inline (backdrop-filter supprimé pour éviter tout voile global)
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 21, 29, 0.95);
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const content = overlay.querySelector('.critical-error__content');
    content.style.cssText = `
      text-align: center;
      color: #EAECEF;
      padding: 48px;
      max-width: 500px;
    `;

    document.body.appendChild(overlay);
  }

  logToAnalytics(errorInfo) {
    // Send to analytics service (Google Analytics, Sentry, etc.)
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: errorInfo.message,
        fatal: false,
      });
    }

    // Or send to custom endpoint
    if (navigator.sendBeacon) {
      const data = JSON.stringify({
        type: 'error',
        ...errorInfo,
        userAgent: navigator.userAgent,
        url: window.location.href,
      });

      // navigator.sendBeacon('/api/errors', data);
    }
  }

  getErrors() {
    return this.errors;
  }

  clearErrors() {
    this.errors = [];
  }
}
