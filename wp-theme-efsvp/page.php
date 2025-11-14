<?php
/**
 * Page Template
 *
 * @package EfSVP
 * @since 1.0.0
 */

get_header();
?>

<div class="page-wrapper container">
    <?php while (have_posts()): the_post(); ?>

        <article <?php post_class('page-content'); ?>>
            <?php if (!is_front_page()): ?>
                <header class="page-header">
                    <h1 class="page-title"><?php the_title(); ?></h1>
                </header>
            <?php endif; ?>

            <?php if (has_post_thumbnail() && !is_front_page()): ?>
                <div class="page-thumbnail">
                    <?php the_post_thumbnail('large'); ?>
                </div>
            <?php endif; ?>

            <div class="page-content__body">
                <?php the_content(); ?>
            </div>

            <?php
            wp_link_pages([
                'before' => '<div class="page-links">' . esc_html__('Pages:', 'efsvp'),
                'after'  => '</div>',
            ]);
            ?>
        </article>

        <?php
        // If comments are open or there are comments, load the comment template
        if (comments_open() || get_comments_number()) {
            comments_template();
        }
        ?>

    <?php endwhile; ?>
</div>

<?php get_footer(); ?>
