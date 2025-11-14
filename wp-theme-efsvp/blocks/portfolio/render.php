<?php
/**
 * Portfolio Block Template
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
$posts_per_page = $attributes['postsPerPage'] ?? -1;
$projects = [];
$has_acf = function_exists('get_field');

$query = new WP_Query([
    'post_type'      => 'efsvp_portfolio',
    'posts_per_page' => $posts_per_page,
    'orderby'        => 'menu_order',
    'order'          => 'ASC',
]);

if ($query->have_posts()) {
    while ($query->have_posts()) {
        $query->the_post();

        $image_id = get_post_thumbnail_id();
        $image = null;

        if ($image_id) {
            $image = [
                'url' => wp_get_attachment_image_url($image_id, 'large'),
                'alt' => get_post_meta($image_id, '_wp_attachment_image_alt', true) ?: get_the_title(),
            ];
        }

        $category_label = $has_acf ? get_field('category') : '';

        $projects[] = [
            'title'         => get_the_title(),
            'tagline'       => $has_acf ? get_field('tagline') : '',
            'client'        => $has_acf ? get_field('client') : '',
            'year'          => $has_acf ? get_field('project_year') : '',
            'description'   => ($has_acf ? get_field('description') : '') ?: wp_trim_words(get_the_excerpt(), 24),
            'category'      => $category_label,
            'category_slug' => $category_label ? sanitize_title($category_label) : 'all',
            'client_filter' => $has_acf ? get_field('client_filter') : 'all',
            'type_filter'   => $has_acf ? get_field('type_filter') : 'all',
            'accent_color'  => $has_acf ? get_field('accent_color') : '',
            'image'         => $image,
        ];
    }
    wp_reset_postdata();
} else {
    $projects = $attributes['projects'] ?? [];
}

if (!empty($projects)) {
    $projects = array_map(
        static function ($project) {
            $project = wp_parse_args(
                $project,
                [
                    'title'         => '',
                    'tagline'       => '',
                    'client'        => '',
                    'year'          => '',
                    'description'   => '',
                    'category'      => '',
                    'category_slug' => '',
                    'client_filter' => 'all',
                    'type_filter'   => 'all',
                    'accent_color'  => '',
                    'image'         => null,
                ]
            );

            if (empty($project['category_slug']) && !empty($project['category'])) {
                $project['category_slug'] = sanitize_title($project['category']);
            }

            if (empty($project['category_slug'])) {
                $project['category_slug'] = 'all';
            }

            return $project;
        },
        $projects
    );
}
$columns = $attributes['columns'] ?? 3;

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'efsvp-portfolio',
    'style' => sprintf('--columns: %d;', absint($columns))
]);
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="container">
        <?php if ($section_title || $section_subtitle): ?>
            <header class="efsvp-portfolio__header">
                <?php if ($section_title): ?>
                    <h2 class="efsvp-portfolio__title"><?php echo wp_kses_post($section_title); ?></h2>
                <?php endif; ?>
                <?php if ($section_subtitle): ?>
                    <p class="efsvp-portfolio__subtitle"><?php echo wp_kses_post($section_subtitle); ?></p>
                <?php endif; ?>
            </header>
        <?php endif; ?>

        <?php if (!empty($projects)): ?>
            <div class="efsvp-portfolio__grid">
                <?php foreach ($projects as $project): ?>
                    <article
                        class="efsvp-portfolio-card"
                        data-category="<?php echo esc_attr($project['category_slug'] ?? 'all'); ?>"
                        data-client="<?php echo esc_attr($project['client_filter'] ?? 'all'); ?>"
                        data-type="<?php echo esc_attr($project['type_filter'] ?? 'all'); ?>"
                    >
                        <?php if (!empty($project['image']) && isset($project['image']['url'])): ?>
                            <div class="efsvp-portfolio-card__image" style="<?php echo $project['accent_color'] ? 'background:' . esc_attr($project['accent_color']) . ';' : ''; ?>">
                                <img
                                    src="<?php echo esc_url($project['image']['url']); ?>"
                                    alt="<?php echo esc_attr($project['image']['alt'] ?? $project['title'] ?? ''); ?>"
                                    loading="lazy"
                                />
                                <div class="efsvp-portfolio-card__overlay"></div>
                            </div>
                        <?php else: ?>
                            <div class="efsvp-portfolio-card__image efsvp-portfolio-card__image--placeholder">
                                <div class="efsvp-portfolio-card__placeholder-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                        <circle cx="8.5" cy="8.5" r="1.5"/>
                                        <polyline points="21 15 16 10 5 21"/>
                                    </svg>
                                </div>
                            </div>
                        <?php endif; ?>

                        <div class="efsvp-portfolio-card__content">
                            <?php if (!empty($project['category'])): ?>
                                <span class="efsvp-portfolio-card__category">
                                    <?php echo esc_html($project['category']); ?>
                                </span>
                            <?php endif; ?>

                            <?php if (!empty($project['title'])): ?>
                                <h3 class="efsvp-portfolio-card__title">
                                    <?php echo esc_html($project['title']); ?>
                                </h3>
                            <?php endif; ?>

                            <?php if (!empty($project['tagline'])): ?>
                                <p class="efsvp-portfolio-card__tagline">
                                    <?php echo esc_html($project['tagline']); ?>
                                </p>
                            <?php endif; ?>

                            <?php if (!empty($project['client']) || !empty($project['year'])): ?>
                                <p class="efsvp-portfolio-card__meta">
                                    <?php
                                    $meta_parts = array_filter([
                                        $project['client'] ?? '',
                                        $project['year'] ?? '',
                                    ]);
                                    echo esc_html(implode(' · ', $meta_parts));
                                    ?>
                                </p>
                            <?php endif; ?>

                            <?php if (!empty($project['description'])): ?>
                                <p class="efsvp-portfolio-card__description">
                                    <?php echo esc_html($project['description']); ?>
                                </p>
                            <?php endif; ?>
                        </div>
                    </article>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</section>
