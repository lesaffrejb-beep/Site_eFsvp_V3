<?php
/**
 * CTA Block Template
 *
 * @param array    $attributes Block attributes
 * @param string   $content    Block content
 * @param WP_Block $block      Block instance
 */

if (!defined('ABSPATH')) {
    exit;
}

$title = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$button_text = $attributes['buttonText'] ?? '';
$button_url = $attributes['buttonUrl'] ?? '';
$secondary_button_text = $attributes['secondaryButtonText'] ?? '';
$secondary_button_url = $attributes['secondaryButtonUrl'] ?? '';
$bg_image = $attributes['backgroundImage'] ?? null;
$bg_color = $attributes['backgroundColor'] ?? 'primary';
$overlay_opacity = $attributes['overlayOpacity'] ?? 0.8;

$classes = ['efsvp-cta'];
if (!$bg_image) {
    $classes[] = 'efsvp-cta--' . sanitize_html_class($bg_color);
}

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => implode(' ', $classes),
    'style' => sprintf('--overlay-opacity: %s;', esc_attr($overlay_opacity))
]);
?>

<section <?php echo $wrapper_attributes; ?>>
    <?php if ($bg_image && isset($bg_image['url'])): ?>
        <div class="efsvp-cta__background">
            <img
                src="<?php echo esc_url($bg_image['url']); ?>"
                alt="<?php echo esc_attr($bg_image['alt'] ?? ''); ?>"
                loading="lazy"
            />
            <div class="efsvp-cta__overlay"></div>
        </div>
    <?php endif; ?>

    <div class="efsvp-cta__content container">
        <?php if ($title): ?>
            <h2 class="efsvp-cta__title">
                <?php echo wp_kses_post($title); ?>
            </h2>
        <?php endif; ?>

        <?php if ($description): ?>
            <p class="efsvp-cta__description">
                <?php echo wp_kses_post($description); ?>
            </p>
        <?php endif; ?>

        <?php if ($button_text && $button_url): ?>
            <div class="efsvp-cta__actions">
                <a href="<?php echo esc_url($button_url); ?>" class="efsvp-cta__button efsvp-cta__button--primary">
                    <?php echo esc_html($button_text); ?>
                </a>

                <?php if ($secondary_button_text && $secondary_button_url): ?>
                    <a href="<?php echo esc_url($secondary_button_url); ?>" class="efsvp-cta__button efsvp-cta__button--secondary">
                        <?php echo esc_html($secondary_button_text); ?>
                    </a>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>
</section>
