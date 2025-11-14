<?php
/**
 * Portfolio Grid Block Template
 *
 * @param array    $attributes Block attributes
 * @param string   $content    Block content
 * @param WP_Block $block      Block instance
 */

if (!defined('ABSPATH')) {
    exit;
}

$section_title = $attributes['sectionTitle'] ?? '';
$section_subtitle = $attributes['sectionSubtitle'] ?? '';
$filters = isset($attributes['filters']) && is_array($attributes['filters']) ? array_filter($attributes['filters']) : [];
$columns = isset($attributes['columns']) ? max(1, absint($attributes['columns'])) : 3;
$default_filter_index = 0;

foreach ($filters as $index => $filter) {
    if (!empty($filter['isDefault'])) {
        $default_filter_index = $index;
        break;
    }
}

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'efsvp-portfolio-grid',
    'style' => sprintf('--columns: %d;', $columns),
    'data-portfolio-grid' => 'true',
]);
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="container">
        <?php if ($section_title || $section_subtitle): ?>
            <header class="efsvp-portfolio-grid__header">
                <?php if ($section_title): ?>
                    <h2 class="efsvp-portfolio-grid__title"><?php echo wp_kses_post($section_title); ?></h2>
                <?php endif; ?>
                <?php if ($section_subtitle): ?>
                    <p class="efsvp-portfolio-grid__subtitle"><?php echo wp_kses_post($section_subtitle); ?></p>
                <?php endif; ?>
            </header>
        <?php endif; ?>

        <?php if (!empty($filters)): ?>
            <div class="efsvp-portfolio-grid__filters" role="toolbar" aria-label="<?php esc_attr_e('Filtres du portfolio', 'efsvp'); ?>" data-portfolio-filters>
                <?php foreach ($filters as $index => $filter):
                    $label = $filter['label'] ?? '';
                    $value = $filter['value'] ?? '';
                    $is_active = $index === $default_filter_index;
                    if (!$label) {
                        continue;
                    }
                    ?>
                    <button
                        type="button"
                        class="efsvp-portfolio-grid__filter<?php echo $is_active ? ' is-active' : ''; ?>"
                        data-filter="<?php echo esc_attr($value); ?>"
                        aria-pressed="<?php echo $is_active ? 'true' : 'false'; ?>"
                    >
                        <?php echo esc_html($label); ?>
                    </button>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <div class="efsvp-portfolio-grid__items" data-portfolio-grid-target>
            <?php echo $content; ?>
        </div>
    </div>
</section>
