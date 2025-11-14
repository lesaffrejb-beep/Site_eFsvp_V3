/**
 * FAQ Block - Front-end JavaScript
 * Gère l'interaction de l'accordéon
 * Reproduit la logique de src/scripts/main.js (initFAQ)
 */

document.addEventListener('DOMContentLoaded', function () {
  // Sélectionner tous les items de FAQ
  const faqItems = document.querySelectorAll('.faq__item');

  if (faqItems.length === 0) {
    return;
  }

  faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');

    // Ajouter IDs uniques et aria-controls si pas déjà présents
    if (answer && !answer.id) {
      answer.id = `faq-answer-${index}`;
    }
    if (question && answer) {
      question.setAttribute('aria-controls', answer.id);
      question.setAttribute('aria-expanded', 'false');
    }

    // Event listener sur le bouton question
    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fermer tous les autres items (comportement accordéon)
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq__question')?.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle l'item courant
      item.classList.toggle('active');
      question.setAttribute('aria-expanded', !isActive);
    });
  });
});
