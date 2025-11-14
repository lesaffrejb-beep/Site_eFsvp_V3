/**
 * Contact Form - Frontend JavaScript
 * Validation, budget slider, textarea counter, email copy, and AJAX submission
 */

(function() {
  'use strict';

  // Initialize all contact forms on the page
  document.addEventListener('DOMContentLoaded', function() {
    const contactForms = document.querySelectorAll('[data-contact-form]');

    contactForms.forEach(form => {
      new ContactForm(form);
    });

    // Initialize copy email buttons
    const copyEmailButtons = document.querySelectorAll('[data-copy-email]');
    copyEmailButtons.forEach(button => {
      new CopyEmail(button);
    });
  });

  /**
   * Contact Form Handler
   */
  class ContactForm {
    constructor(formElement) {
      this.form = formElement;
      this.fields = new Map();
      this.isSubmitting = false;
      this.submitBtn = null;

      if (!this.form) {
        console.error('ContactForm: form element not provided');
        return;
      }

      this.init();
    }

    init() {
      // Get all form fields
      const inputFields = this.form.querySelectorAll('input, textarea, select');

      inputFields.forEach(field => {
        this.fields.set(field.id || field.name, {
          element: field,
          rules: this.getValidationRules(field)
        });

        // Setup validation event listeners
        field.addEventListener('blur', () => this.validateField(field));
        field.addEventListener('input', () => this.clearError(field));
      });

      // Setup budget range slider
      this.setupRangeSlider();

      // Setup textarea with character counter
      this.setupTextarea();

      // Form submission
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));

      this.submitBtn = this.form.querySelector('button[type="submit"]');
    }

    getValidationRules(field) {
      const rules = [];

      if (field.hasAttribute('required')) {
        rules.push({ type: 'required', message: 'Ce champ est requis.' });
      }

      if (field.type === 'email') {
        rules.push({
          type: 'email',
          message: "Format d'email invalide (ex. nom@entreprise.fr).",
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        });
      }

      if (field.minLength > 0) {
        rules.push({
          type: 'minLength',
          message: `Minimum ${field.minLength} caractères requis.`,
          value: field.minLength
        });
      }

      if (field.maxLength > 0) {
        rules.push({
          type: 'maxLength',
          message: `Maximum ${field.maxLength} caractères autorisés.`,
          value: field.maxLength
        });
      }

      return rules;
    }

    validateField(field) {
      const fieldData = this.fields.get(field.id || field.name);
      if (!fieldData) return true;

      const value = field.value.trim();
      const rules = fieldData.rules;

      // Check each validation rule
      for (const rule of rules) {
        let isValid = true;

        switch (rule.type) {
          case 'required':
            if (field.type === 'checkbox') {
              isValid = field.checked;
            } else {
              isValid = value.length > 0;
            }
            break;

          case 'email':
            isValid = rule.pattern.test(value);
            break;

          case 'minLength':
            isValid = value.length >= rule.value;
            break;

          case 'maxLength':
            isValid = value.length <= rule.value;
            break;
        }

        if (!isValid) {
          this.showError(field, rule.message);
          return false;
        }
      }

      // All rules passed
      this.showSuccess(field);
      return true;
    }

    showError(field, message) {
      const parent = field.closest('.form__group') || field.closest('.form__checkbox');
      if (parent) {
        parent.classList.add('form__group--error');
        parent.classList.remove('form__group--success');
      }

      field.setAttribute('aria-invalid', 'true');
      field.classList.add('error');

      // Show error message
      const errorEl = parent?.querySelector('.form__error');
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
      }
    }

    showSuccess(field) {
      const parent = field.closest('.form__group');
      if (parent) {
        parent.classList.remove('form__group--error');
        parent.classList.add('form__group--success');
      }

      field.setAttribute('aria-invalid', 'false');
      field.classList.remove('error');

      this.clearError(field);
    }

    clearError(field) {
      const parent = field.closest('.form__group') || field.closest('.form__checkbox');
      const errorEl = parent?.querySelector('.form__error');

      if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
      }
    }

    async handleSubmit(event) {
      event.preventDefault();

      if (this.isSubmitting) return;

      // Validate all fields
      let isValid = true;
      let firstErrorField = null;

      this.fields.forEach(fieldData => {
        const field = fieldData.element;

        if (!this.validateField(field)) {
          isValid = false;

          if (!firstErrorField) {
            firstErrorField = field;
          }
        }
      });

      if (!isValid) {
        // Focus first error field
        if (firstErrorField) {
          firstErrorField.focus();
          firstErrorField.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }

        // Shake submit button
        this.shakeButton(this.submitBtn);
        return;
      }

      // All valid - proceed with submission
      this.isSubmitting = true;
      this.setButtonState('loading');

      try {
        // Collect form data
        const formData = new FormData(this.form);

        // Add WordPress AJAX action
        formData.append('action', 'efsvp_submit_contact_form');

        // Submit via AJAX
        const response = await this.submitToWordPress(formData);

        if (response.success) {
          // Success
          this.setButtonState('success');
          this.showSuccessModal(formData);

          // Reset form
          setTimeout(() => {
            this.form.reset();
            this.resetAllFields();
            this.setButtonState('default');
          }, 2000);
        } else {
          throw new Error(response.data || 'Submission failed');
        }
      } catch (error) {
        console.error('Form submission error:', error);

        this.setButtonState('error');
        this.showErrorToast(error.message);

        setTimeout(() => {
          this.setButtonState('default');
        }, 2000);
      } finally {
        this.isSubmitting = false;
      }
    }

    async submitToWordPress(formData) {
      // Use WordPress AJAX endpoint
      const ajaxUrl = window.efsvpData?.ajaxUrl || '/wp-admin/admin-ajax.php';

      const response = await fetch(ajaxUrl, {
        method: 'POST',
        body: formData,
        credentials: 'same-origin'
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    }

    setButtonState(state) {
      if (!this.submitBtn) return;

      const text = this.submitBtn.querySelector('.btn__text');
      const loader = this.submitBtn.querySelector('.btn__loader');
      const icon = this.submitBtn.querySelector('.btn__icon');

      // Reset all states
      this.submitBtn.classList.remove('loading', 'success', 'error');
      if (text) text.style.display = '';
      if (loader) loader.style.display = 'none';
      if (icon) icon.style.display = '';

      switch (state) {
        case 'loading':
          this.submitBtn.classList.add('loading');
          this.submitBtn.disabled = true;
          if (text) text.style.display = 'none';
          if (icon) icon.style.display = 'none';
          if (loader) loader.style.display = 'block';
          break;

        case 'success':
          this.submitBtn.classList.add('success');
          this.submitBtn.disabled = true;
          if (text) text.textContent = 'Envoyé !';
          if (icon) {
            icon.innerHTML = `
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            `;
          }
          break;

        case 'error':
          this.submitBtn.classList.add('error');
          this.submitBtn.disabled = false;
          if (text) text.textContent = 'Erreur - Réessayer';
          break;

        case 'default':
        default:
          this.submitBtn.disabled = false;
          if (text) text.textContent = 'Partagez votre histoire';
          if (icon) {
            icon.innerHTML = `
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            `;
          }
          break;
      }
    }

    showSuccessModal(formData) {
      const modal = this.form.parentElement.parentElement.parentElement.querySelector('[data-success-modal]');
      if (!modal) return;

      const nameSpan = modal.querySelector('.modal__name');
      if (nameSpan) {
        const nom = formData.get('nom');
        if (nom) {
          nameSpan.textContent = nom.split(' ')[0]; // First name only
        }
      }

      modal.classList.add('active');

      // Close button
      const closeBtn = modal.querySelector('[data-modal-close]');
      const overlay = modal.querySelector('.modal__overlay');

      const closeModal = () => {
        modal.classList.remove('active');
      };

      if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
      }

      if (overlay) {
        overlay.addEventListener('click', closeModal);
      }

      // Auto-close after 5 seconds
      setTimeout(closeModal, 5000);
    }

    showErrorToast(message) {
      const toast = document.createElement('div');
      toast.className = 'contact-error-toast';
      toast.setAttribute('role', 'alert');

      toast.innerHTML = `
        <div class="toast__content">
          <strong>Erreur d'envoi</strong>
          <p>${message || 'Veuillez réessayer dans quelques instants.'}</p>
        </div>
      `;

      // Add simple inline styles
      toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: #e74c3c;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
      `;

      document.body.appendChild(toast);

      setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 4000);
    }

    setupRangeSlider() {
      const slider = this.form.querySelector('.form__range');
      if (!slider) return;

      const output = this.form.querySelector('.form__range-value');
      if (!output) return;

      const updateValue = () => {
        const value = parseInt(slider.value);
        output.textContent = `~${value.toLocaleString('fr-FR')}€`;

        // Update slider gradient fill
        const percent = ((value - parseInt(slider.min)) / (parseInt(slider.max) - parseInt(slider.min))) * 100;
        slider.style.setProperty('--value', `${percent}%`);
      };

      slider.addEventListener('input', updateValue);
      updateValue(); // Initialize
    }

    setupTextarea() {
      const textarea = this.form.querySelector('.form__textarea');
      if (!textarea) return;

      const counter = this.form.querySelector('.form__counter');

      // Auto-grow and character counter
      textarea.addEventListener('input', () => {
        // Auto-grow
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';

        // Update counter
        if (counter) {
          const current = textarea.value.length;
          const max = textarea.maxLength;
          counter.textContent = `${current}/${max}`;

          // Warning color when close to max
          if (max && current > max * 0.9) {
            counter.style.color = '#B8441E';
          } else {
            counter.style.color = '';
          }
        }
      });
    }

    resetAllFields() {
      this.fields.forEach(fieldData => {
        const field = fieldData.element;
        const parent = field.closest('.form__group');

        if (parent) {
          parent.classList.remove('form__group--error', 'form__group--success');
        }

        field.classList.remove('error');
        field.removeAttribute('aria-invalid');

        this.clearError(field);
      });

      // Reset counter
      const counter = this.form.querySelector('.form__counter');
      if (counter) {
        counter.textContent = '0/500';
        counter.style.color = '';
      }

      // Reset range slider
      const slider = this.form.querySelector('.form__range');
      const output = this.form.querySelector('.form__range-value');
      if (slider && output) {
        slider.value = slider.getAttribute('value') || 10000;
        output.textContent = `~${parseInt(slider.value).toLocaleString('fr-FR')}€`;
        slider.style.setProperty('--value', '50%');
      }
    }

    shakeButton(button) {
      if (!button) return;

      button.style.animation = 'shake 0.4s ease';
      setTimeout(() => {
        button.style.animation = '';
      }, 400);
    }
  }

  /**
   * Copy Email Button Handler
   */
  class CopyEmail {
    constructor(button) {
      this.button = button;
      this.email = button.dataset.email || '';

      if (!this.button || !this.email) return;

      this.init();
    }

    init() {
      this.button.addEventListener('click', () => this.copyToClipboard());
    }

    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.email);

        // Show success state
        const textSpan = this.button.querySelector('.copy-email__text');
        const successSpan = this.button.querySelector('.copy-email__success');

        this.button.classList.add('copied');

        if (textSpan) textSpan.style.display = 'none';
        if (successSpan) successSpan.style.display = 'inline';

        // Reset after 2 seconds
        setTimeout(() => {
          this.button.classList.remove('copied');
          if (textSpan) textSpan.style.display = 'inline';
          if (successSpan) successSpan.style.display = 'none';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy email:', err);

        // Fallback: show email in alert
        alert(`Email: ${this.email}`);
      }
    }
  }

  // Add shake animation styles
  if (!document.getElementById('contact-form-animations')) {
    const style = document.createElement('style');
    style.id = 'contact-form-animations';
    style.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
      }
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

})();
