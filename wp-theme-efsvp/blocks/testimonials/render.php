<?php
/**
 * Testimonials Block Template
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
$posts_per_page = $attributes['postsPerPage'] ?? 6;
$testimonials = [];
$has_acf = function_exists('get_field');

$query = new WP_Query([
    'post_type'      => 'efsvp_testimonial',
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
                'url' => wp_get_attachment_image_url($image_id, 'medium'),
                'alt' => get_post_meta($image_id, '_wp_attachment_image_alt', true) ?: get_the_title(),
            ];
        }

        $testimonials[] = [
            'quote'   => ($has_acf ? get_field('quote') : '') ?: wp_strip_all_tags(get_the_content()),
            'author'  => get_the_title(),
            'role'    => $has_acf ? get_field('role') : '',
            'company' => $has_acf ? get_field('company') : '',
            'image'   => $image,
        ];
    }
    wp_reset_postdata();
} else {
    $testimonials = $attributes['testimonials'] ?? [];
}
$dark_background = $attributes['darkBackground'] ?? true;

$classes = ['efsvp-testimonials'];
if ($dark_background) {
    $classes[] = 'efsvp-testimonials--dark';
}

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => implode(' ', $classes)
]);
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="container">
        <?php if ($section_title || $section_subtitle): ?>
            <header class="efsvp-testimonials__header">
                <?php if ($section_title): ?>
                    <h2 class="efsvp-testimonials__title"><?php echo wp_kses_post($section_title); ?></h2>
                <?php endif; ?>
                <?php if ($section_subtitle): ?>
                    <p class="efsvp-testimonials__subtitle"><?php echo wp_kses_post($section_subtitle); ?></p>
                <?php endif; ?>
            </header>
        <?php endif; ?>

        <?php if (!empty($testimonials)): ?>
            <div class="efsvp-testimonials__grid">
                <?php foreach ($testimonials as $testimonial): ?>
                    <article class="efsvp-testimonial-card">
                        <div class="efsvp-testimonial-card__content">
                            <svg class="efsvp-testimonial-card__quote-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                            </svg>

                            <?php if (!empty($testimonial['quote'])): ?>
                                <blockquote class="efsvp-testimonial-card__quote">
                                    <?php echo esc_html($testimonial['quote']); ?>
                                </blockquote>
                            <?php endif; ?>
                        </div>

                        <footer class="efsvp-testimonial-card__footer">
                            <?php if (!empty($testimonial['image']) && isset($testimonial['image']['url'])): ?>
                                <div class="efsvp-testimonial-card__avatar">
                                    <img
                                        src="<?php echo esc_url($testimonial['image']['url']); ?>"
                                        alt="<?php echo esc_attr($testimonial['author'] ?? ''); ?>"
                                        loading="lazy"
                                    />
                                </div>
                            <?php else: ?>
                                <div class="efsvp-testimonial-card__avatar efsvp-testimonial-card__avatar--placeholder">
                                    <?php
                                    $initials = '';
                                    if (!empty($testimonial['author'])) {
                                        $names = explode(' ', $testimonial['author']);
                                        $initials = substr($names[0], 0, 1);
                                        if (isset($names[1])) {
                                            $initials .= substr($names[1], 0, 1);
                                        }
                                    }
                                    echo esc_html($initials);
                                    ?>
                                </div>
                            <?php endif; ?>

                            <div class="efsvp-testimonial-card__author">
                                <?php if (!empty($testimonial['author'])): ?>
                                    <cite class="efsvp-testimonial-card__name">
                                        <?php echo esc_html($testimonial['author']); ?>
                                    </cite>
                                <?php endif; ?>

                                <?php if (!empty($testimonial['role']) || !empty($testimonial['company'])): ?>
                                    <p class="efsvp-testimonial-card__meta">
                                        <?php
                                        $meta_parts = array_filter([
                                            $testimonial['role'] ?? '',
                                            $testimonial['company'] ?? ''
                                        ]);
                                        echo esc_html(implode(' · ', $meta_parts));
                                        ?>
                                    </p>
                                <?php endif; ?>
                            </div>
                        </footer>
                    </article>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</section>
