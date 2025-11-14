<?php
/**
 * Custom block patterns registration.
 *
 * @package EfSVP
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register EfSVP block patterns.
 */
function efsvp_register_block_patterns() {
    if (!function_exists('register_block_pattern')) {
        return;
    }

    register_block_pattern_category(
        'efsvp',
        [
            'label' => __('EfSVP', 'efsvp'),
        ]
    );

    $pattern_file = EFSVP_THEME_DIR . '/patterns/hero-immersif.html';

    if (file_exists($pattern_file)) {
        $content = file_get_contents($pattern_file);

        if ($content) {
            register_block_pattern(
                'efsvp/hero-immersif',
                [
                    'title'       => __('Hero immersif', 'efsvp'),
                    'description' => __('Bloc Hero vidéo avec bouton d\'ancre vers le contenu.', 'efsvp'),
                    'categories'  => ['efsvp'],
                    'content'     => $content,
                ]
            );
        }
    }
}
add_action('init', 'efsvp_register_block_patterns');
