<?php
/**
 * 404 Template
 *
 * @package EfSVP
 * @since 1.0.0
 */

get_header();
?>

<div class="error-404 container">
    <div class="error-404__content">
        <h1 class="error-404__title"><?php esc_html_e('Page non trouvée', 'efsvp'); ?></h1>

        <p class="error-404__message">
            <?php esc_html_e('Désolé, la page que vous recherchez n\'existe pas ou a été déplacée.', 'efsvp'); ?>
        </p>

        <div class="error-404__actions">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="button">
                <?php esc_html_e('Retour à l\'accueil', 'efsvp'); ?>
            </a>
        </div>

        <?php get_search_form(); ?>
    </div>
</div>

<?php get_footer(); ?>
