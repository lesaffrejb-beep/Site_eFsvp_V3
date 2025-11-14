<?php
/**
 * Contact Block Template
 *
 * @param array    $attributes Block attributes
 * @param string   $content    Block content
 * @param WP_Block $block      Block instance
 */

if (!defined('ABSPATH')) {
    exit;
}

$section_title = $attributes['sectionTitle'] ?? 'La vôtre commence maintenant';
$section_subtitle = $attributes['sectionSubtitle'] ?? 'Réponse sous 48h · Premier échange offert';
$quote = $attributes['quote'] ?? 'Toutes les bonnes histoires méritent d\'être racontées.';
$bg_color = $attributes['backgroundColor'] ?? '#f8f9fa';
$contact_email = $attributes['contactEmail'] ?? 'contact@efsvp.fr';
$alt_contact_title = $attributes['altContactTitle'] ?? 'Ou contactez-nous directement';
$alt_contact_location = $attributes['altContactLocation'] ?? 'Basé à Angers · Partout en Francophonie';

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'contact',
    'style' => 'background-color: ' . esc_attr($bg_color),
]);

// Generate unique IDs for this block instance
$block_id = uniqid('contact-');
?>

<section <?php echo $wrapper_attributes; ?> id="contact" aria-labelledby="<?php echo esc_attr($block_id); ?>-title">
    <div class="container">
        <div class="contact__layout">
            <!-- Left Side - Visual & Quote -->
            <div class="contact__visual">
                <div class="contact__visual-bg"></div>
                <?php if ($quote): ?>
                    <blockquote class="contact__quote">
                        <?php echo esc_html($quote); ?>
                    </blockquote>
                <?php endif; ?>
                <div class="contact__decoration"></div>
            </div>

            <!-- Right Side - Form -->
            <div class="contact__form-container">
                <header class="contact__header">
                    <?php if ($section_title): ?>
                        <h2 class="contact__title" id="<?php echo esc_attr($block_id); ?>-title"><?php echo esc_html($section_title); ?></h2>
                    <?php endif; ?>
                    <?php if ($section_subtitle): ?>
                        <p class="contact__subtitle"><?php echo esc_html($section_subtitle); ?></p>
                    <?php endif; ?>
                </header>

                <form class="contact__form" id="<?php echo esc_attr($block_id); ?>-form" data-contact-form>
                    <?php wp_nonce_field('efsvp_contact_form', 'efsvp_contact_nonce'); ?>

                    <div class="form__group">
                        <label for="<?php echo esc_attr($block_id); ?>-nom" class="form__label">Prénom Nom *</label>
                        <input
                            type="text"
                            id="<?php echo esc_attr($block_id); ?>-nom"
                            name="nom"
                            class="form__input"
                            required
                            aria-required="true"
                            autocomplete="name"
                        />
                        <span class="form__error"></span>
                    </div>

                    <div class="form__group">
                        <label for="<?php echo esc_attr($block_id); ?>-email" class="form__label">Email professionnel *</label>
                        <input
                            type="email"
                            id="<?php echo esc_attr($block_id); ?>-email"
                            name="email"
                            class="form__input"
                            required
                            aria-required="true"
                            autocomplete="email"
                        />
                        <span class="form__error"></span>
                    </div>

                    <div class="form__group">
                        <label for="<?php echo esc_attr($block_id); ?>-organisation" class="form__label">Organisation *</label>
                        <input
                            type="text"
                            id="<?php echo esc_attr($block_id); ?>-organisation"
                            name="organisation"
                            class="form__input"
                            required
                            aria-required="true"
                            autocomplete="organization"
                        />
                        <span class="form__error"></span>
                    </div>

                    <div class="form__group">
                        <label for="<?php echo esc_attr($block_id); ?>-type-projet" class="form__label">Type de projet *</label>
                        <select
                            id="<?php echo esc_attr($block_id); ?>-type-projet"
                            name="type-projet"
                            class="form__input form__select"
                            required
                            aria-required="true"
                        >
                            <option value="">Sélectionner</option>
                            <option value="anniversaire">Anniversaire</option>
                            <option value="inauguration">Inauguration</option>
                            <option value="spectacle">Spectacle</option>
                            <option value="hymne">Hymne / Identité</option>
                            <option value="autre">Autre</option>
                        </select>
                        <span class="form__error"></span>
                    </div>

                    <div class="form__group">
                        <label for="<?php echo esc_attr($block_id); ?>-date" class="form__label">Date envisagée</label>
                        <input
                            type="date"
                            id="<?php echo esc_attr($block_id); ?>-date"
                            name="date"
                            class="form__input"
                        />
                    </div>

                    <div class="form__group">
                        <label for="<?php echo esc_attr($block_id); ?>-budget" class="form__label">Budget estimé</label>
                        <div class="form__range-container">
                            <input
                                type="range"
                                id="<?php echo esc_attr($block_id); ?>-budget"
                                name="budget"
                                class="form__range"
                                min="3000"
                                max="30000"
                                step="1000"
                                value="10000"
                            />
                            <output class="form__range-value" for="<?php echo esc_attr($block_id); ?>-budget">~10 000€</output>
                        </div>
                    </div>

                    <div class="form__group">
                        <label for="<?php echo esc_attr($block_id); ?>-message" class="form__label">Parlez-nous de votre projet *</label>
                        <textarea
                            id="<?php echo esc_attr($block_id); ?>-message"
                            name="message"
                            class="form__input form__textarea"
                            rows="5"
                            maxlength="500"
                            required
                            aria-required="true"
                        ></textarea>
                        <span class="form__counter">0/500</span>
                        <span class="form__error"></span>
                    </div>

                    <div class="form__checkbox">
                        <input
                            type="checkbox"
                            id="<?php echo esc_attr($block_id); ?>-consent"
                            name="consent"
                            required
                            aria-required="true"
                        />
                        <label for="<?php echo esc_attr($block_id); ?>-consent">
                            J'accepte d'être recontacté pour échanger sur mon projet
                        </label>
                    </div>

                    <button type="submit" class="btn btn--primary btn--large btn--full">
                        <span class="btn__text">Partagez votre histoire</span>
                        <span class="btn__loader"></span>
                        <svg
                            class="btn__icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </form>

                <!-- Alternative Contact -->
                <div class="contact__alt">
                    <?php if ($alt_contact_title): ?>
                        <p class="contact__alt-title"><?php echo esc_html($alt_contact_title); ?></p>
                    <?php endif; ?>
                    <button
                        type="button"
                        data-copy-email
                        class="contact__alt-link copy-email"
                        data-email="<?php echo esc_attr($contact_email); ?>"
                        title="Cliquer pour copier l'email"
                    >
                        <svg
                            class="copy-email__icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                        <span class="copy-email__text"><?php echo esc_html($contact_email); ?></span>
                        <span class="copy-email__success" style="display: none">✓ Copié !</span>
                    </button>
                    <?php if ($alt_contact_location): ?>
                        <p class="contact__alt-location"><?php echo esc_html($alt_contact_location); ?></p>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Success Modal -->
<div
    class="modal"
    id="<?php echo esc_attr($block_id); ?>-modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="<?php echo esc_attr($block_id); ?>-modal-title"
    data-success-modal
>
    <div class="modal__overlay"></div>
    <div class="modal__content">
        <div class="modal__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h3 class="modal__title" id="<?php echo esc_attr($block_id); ?>-modal-title">Message envoyé !</h3>
        <p class="modal__text">Merci <span class="modal__name"></span> ! On vous répond sous 48h.</p>
        <button class="btn btn--primary" data-modal-close>Continuer</button>
    </div>
</div>
