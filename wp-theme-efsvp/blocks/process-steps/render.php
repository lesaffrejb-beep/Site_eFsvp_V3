<?php
/**
 * Process Steps Block Template
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
$steps = isset($attributes['steps']) && is_array($attributes['steps']) ? array_filter($attributes['steps']) : [];
$steps = array_values(array_filter($steps, static function ($step) {
    return !empty($step['title']) || !empty($step['description']);
}));

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'efsvp-process-steps',
    'data-step-count' => count($steps),
]);
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="container">
        <?php if ($section_title || $section_subtitle): ?>
            <header class="efsvp-process-steps__header">
                <?php if ($section_title): ?>
                    <h2 class="efsvp-process-steps__title"><?php echo wp_kses_post($section_title); ?></h2>
                <?php endif; ?>
                <?php if ($section_subtitle): ?>
                    <p class="efsvp-process-steps__subtitle"><?php echo wp_kses_post($section_subtitle); ?></p>
                <?php endif; ?>
            </header>
        <?php endif; ?>

        <?php if (!empty($steps)): ?>
            <ol class="efsvp-process-steps__list">
                <?php foreach ($steps as $index => $step):
                    $title = $step['title'] ?? '';
                    $description = $step['description'] ?? '';
                    $badge = $step['badge'] ?? '';
                    $number = str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT);
                    ?>
                    <li class="efsvp-process-steps__item">
                        <div class="efsvp-process-steps__number" aria-hidden="true"><?php echo esc_html($number); ?></div>
                        <div class="efsvp-process-steps__content">
                            <?php if ($badge): ?>
                                <span class="efsvp-process-steps__badge"><?php echo esc_html($badge); ?></span>
                            <?php endif; ?>

                            <?php if ($title): ?>
                                <h3 class="efsvp-process-steps__item-title"><?php echo esc_html($title); ?></h3>
                            <?php endif; ?>

                            <?php if ($description): ?>
                                <p class="efsvp-process-steps__description"><?php echo esc_html($description); ?></p>
                            <?php endif; ?>
                        </div>
                    </li>
                <?php endforeach; ?>
            </ol>
        <?php endif; ?>
    </div>
</section>
