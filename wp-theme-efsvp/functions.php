<?php
/**
 * EfSVP Theme Functions
 *
 * Architecture modulaire pour maintenabilité optimale
 *
 * @package EfSVP
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Theme constants
define('EFSVP_VERSION', '1.0.0');
define('EFSVP_THEME_DIR', get_template_directory());
define('EFSVP_THEME_URI', get_template_directory_uri());

// Core includes
require_once EFSVP_THEME_DIR . '/inc/theme-setup.php';
require_once EFSVP_THEME_DIR . '/inc/enqueue-scripts.php';
require_once EFSVP_THEME_DIR . '/inc/gutenberg-config.php';
require_once EFSVP_THEME_DIR . '/inc/customizer.php';
require_once EFSVP_THEME_DIR . '/inc/custom-post-types.php';
require_once EFSVP_THEME_DIR . '/inc/block-patterns.php';
require_once EFSVP_THEME_DIR . '/inc/ajax-handlers.php';

/**
 * Register custom blocks
 */
function efsvp_register_blocks() {
    $blocks = [
        'hero',
        'audio-bento',
        'creations',
        'flagship-cases',
        'services',
        'portfolio',
        'portfolio-grid',
        'process',
        'process-steps',
        'testimonials',
        'stats',
        'faq',
        'contact',
        'cta'
    ];

    foreach ($blocks as $block) {
        $block_path = EFSVP_THEME_DIR . "/blocks/{$block}";
        if (file_exists("{$block_path}/block.json")) {
            register_block_type($block_path);
        }
    }
}
add_action('init', 'efsvp_register_blocks');
