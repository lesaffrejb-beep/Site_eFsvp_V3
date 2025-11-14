<?php
/**
 * Main Template File
 *
 * @package EfSVP
 * @since 1.0.0
 */

get_header();
?>

<div class="content-wrapper container">
    <?php if (have_posts()): ?>

        <?php if (is_home() && !is_front_page()): ?>
            <header class="page-header">
                <h1 class="page-title"><?php single_post_title(); ?></h1>
            </header>
        <?php endif; ?>

        <div class="posts-grid">
            <?php while (have_posts()): the_post(); ?>

                <article <?php post_class('post-card'); ?>>
                    <?php if (has_post_thumbnail()): ?>
                        <div class="post-card__thumbnail">
                            <a href="<?php the_permalink(); ?>">
                                <?php the_post_thumbnail('medium_large'); ?>
                            </a>
                        </div>
                    <?php endif; ?>

                    <div class="post-card__content">
                        <header class="post-card__header">
                            <?php the_title(
                                '<h2 class="post-card__title"><a href="' . esc_url(get_permalink()) . '">',
                                '</a></h2>'
                            ); ?>

                            <div class="post-card__meta">
                                <time datetime="<?php echo esc_attr(get_the_date('c')); ?>">
                                    <?php echo esc_html(get_the_date()); ?>
                                </time>
                            </div>
                        </header>

                        <div class="post-card__excerpt">
                            <?php the_excerpt(); ?>
                        </div>

                        <a href="<?php the_permalink(); ?>" class="post-card__link">
                            <?php esc_html_e('Lire la suite', 'efsvp'); ?>
                            <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </article>

            <?php endwhile; ?>
        </div>

        <?php
        the_posts_pagination([
            'prev_text' => __('← Précédent', 'efsvp'),
            'next_text' => __('Suivant →', 'efsvp'),
        ]);
        ?>

    <?php else: ?>

        <div class="no-content">
            <h2><?php esc_html_e('Aucun contenu trouvé', 'efsvp'); ?></h2>
            <p><?php esc_html_e('Il semblerait qu\'il n\'y ait rien ici pour le moment.', 'efsvp'); ?></p>
        </div>

    <?php endif; ?>
</div>

<?php get_footer(); ?>
