<?php
/**
 * Stats Block Template
 *
 * @param array    $attributes Block attributes
 * @param string   $content    Block content
 * @param WP_Block $block      Block instance
 */

if (!defined('ABSPATH')) {
    exit;
}

$section_title = $attributes['sectionTitle'] ?? 'La preuve par les chiffres';
$stats = $attributes['stats'] ?? [];

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'stats',
]);
?>

<section <?php echo $wrapper_attributes; ?> aria-labelledby="stats-title">
    <div class="container">
        <?php if ($section_title): ?>
            <header class="stats__header">
                <h2 class="stats__title" id="stats-title"><?php echo esc_html($section_title); ?></h2>
            </header>
        <?php endif; ?>

        <?php if (!empty($stats)): ?>
            <div class="stats__grid">
                <?php foreach ($stats as $stat): ?>
                    <div class="stat-card">
                        <div class="stat-card__number" <?php echo ($stat['animated'] ?? true) ? 'data-count="' . esc_attr(filter_var($stat['number'] ?? '', FILTER_SANITIZE_NUMBER_INT)) . '"' : ''; ?>>
                            <?php echo esc_html($stat['number'] ?? ''); ?>
                        </div>
                        <div class="stat-card__label">
                            <?php echo esc_html($stat['label'] ?? ''); ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</section>
