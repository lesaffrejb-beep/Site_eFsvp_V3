<?php
/**
 * Flagship Cases Block Template
 *
 * @param array    $attributes Block attributes
 * @param string   $content    Block content
 * @param WP_Block $block      Block instance
 */

if (!defined('ABSPATH')) {
    exit;
}

$section_title    = $attributes['sectionTitle'] ?? '';
$section_subtitle = $attributes['sectionSubtitle'] ?? '';
$cta_text         = $attributes['ctaText'] ?? '';
$cta_url          = $attributes['ctaUrl'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'flagship-cases'
]);
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="container">
        <?php if ($section_title || $section_subtitle) : ?>
            <header class="section__header">
                <?php if ($section_title) : ?>
                    <h2 class="section__title"><?php echo wp_kses_post($section_title); ?></h2>
                <?php endif; ?>
                <?php if ($section_subtitle) : ?>
                    <p class="section__subtitle"><?php echo wp_kses_post($section_subtitle); ?></p>
                <?php endif; ?>
            </header>
        <?php endif; ?>

        <div class="flagship-cases__grid">
            <?php echo wp_kses_post($content); ?>
        </div>

        <?php if ($cta_text) : ?>
            <div class="flagship-cases__cta">
                <a class="btn btn--secondary" href="<?php echo esc_url($cta_url ?: '#'); ?>">
                    <?php echo esc_html($cta_text); ?>
                    <svg
                        class="btn__icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        aria-hidden="true"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        <?php endif; ?>
    </div>
</section>
