/**
 * Copy Email to Clipboard - Premium UX
 * Permet de copier l'email au clic avec feedback visuel
 */

export class CopyEmail {
  constructor() {
    this.email = 'contact@efsvp.fr';
    this.button = null;
    this.init();
  }

  init() {
    this.button = document.querySelector('[data-copy-email]');
    if (!this.button) return;

    this.setupEventListeners();
  }

  setupEventListeners() {
    // Clic principal: copier l'email
    this.button.addEventListener('click', (e) => {
      e.preventDefault();
      this.copyToClipboard();
    });

    // Context menu (clic droit): ouvrir mailto
    this.button.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      window.location.href = `mailto:${this.email}`;
    });
  }

  async copyToClipboard() {
    try {
      // Modern Clipboard API
      await navigator.clipboard.writeText(this.email);
      this.showFeedback(true);
    } catch (err) {
      // Fallback pour navigateurs plus anciens
      this.fallbackCopyToClipboard();
    }
  }

  fallbackCopyToClipboard() {
    const textarea = document.createElement('textarea');
    textarea.value = this.email;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';

    document.body.appendChild(textarea);
    textarea.select();

    try {
      const successful = document.execCommand('copy');
      this.showFeedback(successful);
    } catch (err) {
      this.showFeedback(false);
      console.error('Fallback copy failed:', err);
    } finally {
      document.body.removeChild(textarea);
    }
  }

  showFeedback(success) {
    if (!this.button) return;

    // Récupérer les éléments de feedback
    const defaultText = this.button.querySelector('.copy-email__text');
    const successText = this.button.querySelector('.copy-email__success');
    const icon = this.button.querySelector('.copy-email__icon');

    if (success) {
      // Masquer le texte par défaut, afficher le succès
      if (defaultText) defaultText.style.display = 'none';
      if (successText) successText.style.display = 'inline';

      // Ajouter classe visuelle
      this.button.classList.add('copied');
      if (icon) icon.style.opacity = '0';

      // Réinitialiser après 2 secondes
      setTimeout(() => {
        if (defaultText) defaultText.style.display = 'inline';
        if (successText) successText.style.display = 'none';
        this.button.classList.remove('copied');
        if (icon) icon.style.opacity = '1';
      }, 2000);
    } else {
      // En cas d'échec, fallback sur mailto
      window.location.href = `mailto:${this.email}`;
    }
  }

  destroy() {
    if (this.button) {
      this.button.removeEventListener('click', this.copyToClipboard);
    }
  }
}
