<?php
/**
 * Hero Block Template
 *
 * @param array    $attributes Block attributes
 * @param string   $content    Block content
 * @param WP_Block $block      Block instance
 */

if (!defined('ABSPATH')) {
    exit;
}

$title_line1 = $attributes['titleLine1'] ?? '';
$title_line2 = $attributes['titleLine2'] ?? '';
$description = $attributes['description'] ?? '';
$bg_image = $attributes['backgroundImage'] ?? null;
$bg_video = $attributes['backgroundVideo'] ?? null;
$poster_image = $attributes['posterImage'] ?? null;
$cta_text = $attributes['ctaText'] ?? '';
$cta_url = $attributes['ctaUrl'] ?? '';
$enable_overlay = $attributes['enableOverlay'] ?? true;
$overlay_color = $attributes['overlayColor'] ?? '#0f141a';
$overlay_opacity = $attributes['overlayOpacity'] ?? 0.5;
$min_height = $attributes['minHeight'] ?? '80vh';
$show_metrics = $attributes['showMetrics'] ?? true;
$metrics = $attributes['metrics'] ?? [];

$overlay_color = sanitize_hex_color($overlay_color) ?: $overlay_color;

$metrics = array_values(array_filter(array_map(function ($metric) {
    if (!is_array($metric)) {
        return null;
    }

    $value = isset($metric['value']) ? trim(wp_strip_all_tags($metric['value'])) : '';
    $label = isset($metric['label']) ? trim(wp_strip_all_tags($metric['label'])) : '';

    if ($value === '' && $label === '') {
        return null;
    }

    return [
        'value' => $value,
        'label' => $label,
    ];
}, $metrics)));

$classes = ['efsvp-hero', 'hero'];

if ($bg_video && isset($bg_video['url'])) {
    $classes[] = 'efsvp-hero--has-video';
}

if ($bg_image && isset($bg_image['url'])) {
    $classes[] = 'efsvp-hero--has-image';
}

if ($enable_overlay) {
    $classes[] = 'efsvp-hero--has-overlay';
}

$style_rules = [
    sprintf('min-height:%s', esc_attr($min_height)),
];

if ($enable_overlay) {
    $style_rules[] = sprintf('--overlay-opacity:%s', esc_attr($overlay_opacity));
    $style_rules[] = sprintf('--overlay-color:%s', esc_attr($overlay_color));
} else {
    $style_rules[] = '--overlay-opacity:0';
}

$style_attribute = implode(';', array_filter($style_rules));

if ($style_attribute) {
    $style_attribute .= ';';
}

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => implode(' ', array_map('sanitize_html_class', $classes)),
    'style' => $style_attribute,
]);
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="efsvp-hero__background">
        <?php if ($bg_video && isset($bg_video['url'])): ?>
            <video
                class="efsvp-hero__video"
                autoplay
                muted
                loop
                playsinline
                preload="auto"
                <?php if ($poster_image && isset($poster_image['url'])): ?>poster="<?php echo esc_url($poster_image['url']); ?>"<?php endif; ?>
            >
                <source src="<?php echo esc_url($bg_video['url']); ?>" <?php if ($bg_video && isset($bg_video['mime'])): ?>type="<?php echo esc_attr($bg_video['mime']); ?>"<?php endif; ?> />
            </video>
        <?php elseif ($bg_image && isset($bg_image['url'])): ?>
            <img
                src="<?php echo esc_url($bg_image['url']); ?>"
                alt="<?php echo esc_attr($bg_image['alt'] ?? ''); ?>"
                loading="lazy"
            />
        <?php endif; ?>

        <?php if ($enable_overlay): ?>
            <div class="efsvp-hero__overlay" aria-hidden="true"></div>
        <?php endif; ?>
    </div>

    <div class="efsvp-hero__content">
        <?php if ($title_line1 || $title_line2): ?>
            <h1 class="efsvp-hero__title hero__title" data-scroll>
                <?php if ($title_line1): ?>
                    <span class="efsvp-hero__title-line hero__title-line hero__title-line--primary">
                        <?php echo wp_kses_post($title_line1); ?>
                    </span>
                <?php endif; ?>
                <?php if ($title_line2): ?>
                    <span class="efsvp-hero__title-line hero__title-line hero__title-line--secondary">
                        <?php echo wp_kses_post($title_line2); ?>
                    </span>
                <?php endif; ?>
            </h1>
        <?php endif; ?>

        <?php if ($description): ?>
            <p class="efsvp-hero__subtitle hero__subtitle" data-scroll>
                <?php echo wp_kses_post($description); ?>
            </p>
        <?php endif; ?>

        <?php if ($cta_url && $cta_text): ?>
            <div class="efsvp-hero__actions">
                <a href="<?php echo esc_url($cta_url); ?>" class="efsvp-hero__cta">
                    <span><?php echo esc_html($cta_text); ?></span>
                    <svg class="efsvp-hero__cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
            </div>
        <?php endif; ?>

        <?php if ($show_metrics && !empty($metrics)): ?>
            <div class="efsvp-hero__metrics">
                <?php foreach ($metrics as $metric): ?>
                    <div class="efsvp-hero__metric">
                        <?php if (!empty($metric['value'])): ?>
                            <strong><?php echo esc_html($metric['value']); ?></strong>
                        <?php endif; ?>
                        <?php if (!empty($metric['label'])): ?>
                            <span><?php echo esc_html($metric['label']); ?></span>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</section>
