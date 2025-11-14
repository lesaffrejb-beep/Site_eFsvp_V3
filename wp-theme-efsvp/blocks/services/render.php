<?php
/**
 * Services Block Template
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
$services = isset($attributes['services']) && is_array($attributes['services']) ? $attributes['services'] : [];
$services = array_values(array_filter($services, static function ($service) {
    return !empty($service['title']) || !empty($service['description']);
}));

$columns = isset($attributes['columns']) ? absint($attributes['columns']) : 0;
if ($columns < 1 && !empty($services)) {
    $columns = min(4, count($services));
}
$columns = $columns > 0 ? $columns : 1;

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'efsvp-services',
    'style' => sprintf('--columns: %d;', $columns),
    'data-service-count' => count($services),
]);
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="container">
        <?php if ($section_title || $section_subtitle): ?>
            <header class="efsvp-services__header">
                <?php if ($section_title): ?>
                    <h2 class="efsvp-services__title"><?php echo wp_kses_post($section_title); ?></h2>
                <?php endif; ?>
                <?php if ($section_subtitle): ?>
                    <p class="efsvp-services__subtitle"><?php echo wp_kses_post($section_subtitle); ?></p>
                <?php endif; ?>
            </header>
        <?php endif; ?>

        <?php if (!empty($services)): ?>
            <div class="efsvp-services__grid" role="list">
                <?php foreach ($services as $index => $service): ?>
                    <?php
                    $badges = isset($service['badges']) && is_array($service['badges']) ? array_filter($service['badges']) : [];
                    $features = isset($service['features']) && is_array($service['features']) ? array_filter($service['features']) : [];
                    $price = $service['price'] ?? '';
                    ?>
                    <article class="efsvp-service-card" role="listitem">
                        <?php if (!empty($badges)): ?>
                            <div class="efsvp-service-card__badges" aria-label="<?php esc_attr_e('Inclus', 'efsvp'); ?>">
                                <?php foreach ($badges as $badge): ?>
                                    <span class="efsvp-service-card__badge"><?php echo esc_html($badge); ?></span>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>

                        <div class="efsvp-service-card__header">
                            <?php if (!empty($service['icon'])): ?>
                                <div class="efsvp-service-card__icon">
                                    <?php echo wp_kses_post($service['icon']); ?>
                                </div>
                            <?php endif; ?>

                            <?php if (!empty($service['title'])): ?>
                                <h3 class="efsvp-service-card__title">
                                    <?php echo esc_html($service['title']); ?>
                                </h3>
                            <?php endif; ?>
                        </div>

                        <?php if ($price): ?>
                            <p class="efsvp-service-card__price"><?php echo esc_html($price); ?></p>
                        <?php endif; ?>

                        <?php if (!empty($service['description'])): ?>
                            <p class="efsvp-service-card__description">
                                <?php echo esc_html($service['description']); ?>
                            </p>
                        <?php endif; ?>

                        <?php if (!empty($features)): ?>
                            <ul class="efsvp-service-card__features">
                                <?php foreach ($features as $feature): ?>
                                    <li class="efsvp-service-card__feature"><?php echo esc_html($feature); ?></li>
                                <?php endforeach; ?>
                            </ul>
                        <?php endif; ?>
                    </article>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</section>
