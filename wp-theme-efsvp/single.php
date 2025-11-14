<?php
/**
 * Single Post Template
 *
 * @package EfSVP
 * @since 1.0.0
 */

get_header();
?>

<div class="single-wrapper container">
    <?php while (have_posts()): the_post(); ?>

        <article <?php post_class('single-post'); ?>>
            <header class="entry-header">
                <h1 class="entry-title"><?php the_title(); ?></h1>

                <div class="entry-meta">
                    <time datetime="<?php echo esc_attr(get_the_date('c')); ?>">
                        <?php
                        printf(
                            esc_html__('Publié le %s', 'efsvp'),
                            '<time datetime="' . esc_attr(get_the_date('c')) . '">' . esc_html(get_the_date()) . '</time>'
                        );
                        ?>
                    </time>

                    <?php if (has_category()): ?>
                        <span class="entry-categories">
                            <?php esc_html_e('Dans', 'efsvp'); ?>
                            <?php the_category(', '); ?>
                        </span>
                    <?php endif; ?>
                </div>
            </header>

            <?php if (has_post_thumbnail()): ?>
                <div class="entry-thumbnail">
                    <?php the_post_thumbnail('large'); ?>
                </div>
            <?php endif; ?>

            <div class="entry-content">
                <?php the_content(); ?>
            </div>

            <?php
            wp_link_pages([
                'before' => '<div class="page-links">' . esc_html__('Pages:', 'efsvp'),
                'after'  => '</div>',
            ]);
            ?>

            <?php if (has_tag()): ?>
                <footer class="entry-footer">
                    <div class="entry-tags">
                        <?php the_tags('<span class="tags-label">' . esc_html__('Tags:', 'efsvp') . '</span> ', ', '); ?>
                    </div>
                </footer>
            <?php endif; ?>
        </article>

        <?php
        // Post navigation
        the_post_navigation([
            'prev_text' => '<span class="nav-subtitle">' . esc_html__('Article précédent', 'efsvp') . '</span> <span class="nav-title">%title</span>',
            'next_text' => '<span class="nav-subtitle">' . esc_html__('Article suivant', 'efsvp') . '</span> <span class="nav-title">%title</span>',
        ]);
        ?>

        <?php
        // If comments are open or there are comments, load the comment template
        if (comments_open() || get_comments_number()) {
            comments_template();
        }
        ?>

    <?php endwhile; ?>
</div>

<?php get_footer(); ?>
