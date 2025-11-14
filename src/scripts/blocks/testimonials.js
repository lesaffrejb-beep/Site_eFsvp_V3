import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';

const TESTIMONIAL_CAROUSEL_SELECTORS = ['.testimonials__carousel', '.efsvp-testimonials__carousel'];

const findCarouselSelector = (root = document) =>
  TESTIMONIAL_CAROUSEL_SELECTORS.find((selector) => root.querySelector(selector));

/**
 * Initialize Swiper carousel for testimonial blocks.
 * @param {Object} [options]
 * @param {Document|HTMLElement} [options.root=document]
 * @returns {Swiper|null}
 */
export const initTestimonialsBlock = ({ root = document } = {}) => {
  const selector = findCarouselSelector(root);

  if (!selector) {
    return null;
  }

  return new Swiper(selector, {
    modules: [Pagination, Autoplay],
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    pagination: {
      el: `${selector} .swiper-pagination`,
      clickable: true,
    },
    speed: 600,
  });
};

export default initTestimonialsBlock;
