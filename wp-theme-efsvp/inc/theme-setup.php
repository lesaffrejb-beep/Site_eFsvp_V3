<?php
/**
 * Theme Setup
 *
 * @package EfSVP
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Sets up theme defaults and registers support for various WordPress features
 */
function efsvp_theme_setup() {
    // Load text domain for translations
    load_theme_textdomain('efsvp', EFSVP_THEME_DIR . '/languages');

    // Add theme support for various features
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('wp-block-styles');

    // Custom logo support
    add_theme_support('custom-logo', [
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ]);

    // HTML5 support
    add_theme_support('html5', [
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script'
    ]);

    // Responsive embeds
    add_theme_support('responsive-embeds');

    // Wide and full alignments for Gutenberg
    add_theme_support('align-wide');
    add_theme_support('align-full');

    // Allow usage of block templates and parts within the classic theme
    add_theme_support('block-templates');
    add_theme_support('block-template-parts');

    // Editor styles
    add_theme_support('editor-styles');
    add_editor_style([
        'assets/css/design-tokens.css',
        'assets/css/gutenberg.css',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Cormorant:ital,wght@1,600&display=swap'
    ]);

    // Disable core block patterns (optionnel - pour plus de contrôle)
    // remove_theme_support('core-block-patterns');

    // Register navigation menus
    register_nav_menus([
        'primary' => __('Menu Principal', 'efsvp'),
        'footer'  => __('Menu Footer', 'efsvp')
    ]);

    // Image sizes
    add_image_size('efsvp-portfolio', 800, 600, true);
    add_image_size('efsvp-hero', 1920, 1080, true);
}
add_action('after_setup_theme', 'efsvp_theme_setup');

/**
 * Set content width
 */
if (!isset($content_width)) {
    $content_width = 1280;
}
