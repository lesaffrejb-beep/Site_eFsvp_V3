import { gsap } from 'gsap';

const PORTFOLIO_CARD_SELECTORS = ['.portfolio-card', '.efsvp-portfolio-card'];
const LEGACY_FILTER_SELECTOR = '.portfolio__filter';
const MODERN_FILTER_SELECTOR = '.filter';

const findElements = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const toggleCardVisibility = (card, visible) => {
  const animationConfig = {
    opacity: visible ? 1 : 0,
    scale: visible ? 1 : 0.95,
    duration: 0.3,
    ease: visible ? 'power2.out' : 'power2.in',
  };

  gsap.to(card, {
    ...animationConfig,
    onStart: visible
      ? () => {
          card.style.display = 'block';
          card.hidden = false;
        }
      : undefined,
    onComplete: !visible
      ? () => {
          card.style.display = 'none';
          card.hidden = true;
        }
      : undefined,
  });
};

const applyFilterState = (cards, state) => {
  cards.forEach((card) => {
    const cardClient = card.getAttribute('data-client');
    const cardType = card.getAttribute('data-type');
    const cardCategory = card.getAttribute('data-category');

    const matchesClient = state.client === 'all' || state.client === cardClient;
    const matchesType = state.type === 'all' || state.type === cardType;
    const matchesCategory = state.category === 'all' || state.category === cardCategory;

    const shouldDisplay = matchesClient && matchesType && matchesCategory;
    toggleCardVisibility(card, shouldDisplay);
  });
};

const initLegacyFilters = (root, cards) => {
  const legacyFilters = findElements(LEGACY_FILTER_SELECTOR, root);

  if (!legacyFilters.length) {
    return;
  }

  legacyFilters.forEach((filter) => {
    filter.addEventListener('click', () => {
      const category = filter.getAttribute('data-filter');

      legacyFilters.forEach((btn) => btn.classList.remove('portfolio__filter--active'));
      filter.classList.add('portfolio__filter--active');

      cards.forEach((card) => {
        const matches = category === 'all' || card.getAttribute('data-category') === category;
        toggleCardVisibility(card, matches);
      });
    });
  });
};

const initModernFilters = (root, cards) => {
  const filterButtons = findElements(MODERN_FILTER_SELECTOR, root);

  if (!filterButtons.length) {
    return;
  }

  const state = {
    client: 'all',
    type: 'all',
    category: 'all',
  };

  const handleClick = (button) => {
    const group = button.getAttribute('data-filter-group');
    const value = button.getAttribute('data-filter-value');

    if (!group) {
      return;
    }

    const groupSelector = `${MODERN_FILTER_SELECTOR}[data-filter-group="${group}"]`;
    findElements(groupSelector, root).forEach((btn) => {
      btn.classList.remove('is-active');
      btn.setAttribute('aria-pressed', 'false');
    });

    button.classList.add('is-active');
    button.setAttribute('aria-pressed', 'true');

    state[group] = value ?? 'all';
    applyFilterState(cards, state);
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => handleClick(button));
  });

  applyFilterState(cards, state);
};

/**
 * Initialize portfolio filtering system compatible with legacy and block markup.
 * @param {Document|HTMLElement} [root=document]
 */
export const initPortfolioBlock = (root = document) => {
  const cards = PORTFOLIO_CARD_SELECTORS.flatMap((selector) => findElements(selector, root));

  if (!cards.length) {
    return;
  }

  initLegacyFilters(root, cards);
  initModernFilters(root, cards);
};

export default initPortfolioBlock;
