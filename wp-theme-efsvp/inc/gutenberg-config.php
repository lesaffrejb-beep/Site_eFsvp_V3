<?php
/**
 * Gutenberg Configuration
 *
 * Customisation de l'éditeur pour une expérience premium
 *
 * @package EfSVP
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add custom block category for EfSVP blocks
 */
function efsvp_block_categories($categories) {
    return array_merge(
        $categories,
        [
            [
                'slug'  => 'efsvp-blocks',
                'title' => __('EfSVP Premium', 'efsvp'),
                'icon'  => 'star-filled'
            ]
        ]
    );
}
add_filter('block_categories_all', 'efsvp_block_categories');

/**
 * Enqueue Gutenberg editor styles
 */
function efsvp_gutenberg_styles() {
    // Google Fonts for editor
    wp_enqueue_style(
        'efsvp-editor-fonts',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Cormorant:ital,wght@1,600&display=swap',
        [],
        null
    );

    // Editor styles
    wp_enqueue_style(
        'efsvp-gutenberg',
        EFSVP_THEME_URI . '/assets/css/gutenberg.css',
        [],
        EFSVP_VERSION
    );
}
add_action('enqueue_block_editor_assets', 'efsvp_gutenberg_styles');

/**
 * Configure editor color palette
 */
function efsvp_editor_color_palette() {
    add_theme_support('editor-color-palette', [
        [
            'name'  => __('Terracotta', 'efsvp'),
            'slug'  => 'primary',
            'color' => '#b95a40'
        ],
        [
            'name'  => __('Kaki Doux', 'efsvp'),
            'slug'  => 'secondary',
            'color' => '#8a8a68'
        ],
        [
            'name'  => __('Camel', 'efsvp'),
            'slug'  => 'accent-camel',
            'color' => '#c39d6b'
        ],
        [
            'name'  => __('Beige', 'efsvp'),
            'slug'  => 'accent-beige',
            'color' => '#e6d9c3'
        ],
        [
            'name'  => __('Encre', 'efsvp'),
            'slug'  => 'ink',
            'color' => '#1d2c3b'
        ],
        [
            'name'  => __('Charbon', 'efsvp'),
            'slug'  => 'charcoal',
            'color' => '#2d3748'
        ],
        [
            'name'  => __('Parchemin', 'efsvp'),
            'slug'  => 'parchment',
            'color' => '#fbf8f3'
        ],
        [
            'name'  => __('Sable', 'efsvp'),
            'slug'  => 'sand',
            'color' => '#faf6f0'
        ],
        [
            'name'  => __('Blanc', 'efsvp'),
            'slug'  => 'white',
            'color' => '#ffffff'
        ],
        [
            'name'  => __('Sombre', 'efsvp'),
            'slug'  => 'dark',
            'color' => '#0f141a'
        ]
    ]);

    // Disable custom colors (force use of palette)
    add_theme_support('disable-custom-colors');
}
add_action('after_setup_theme', 'efsvp_editor_color_palette');

/**
 * Configure editor font sizes
 */
function efsvp_editor_font_sizes() {
    add_theme_support('editor-font-sizes', [
        [
            'name' => __('Très petit', 'efsvp'),
            'size' => 14,
            'slug' => 'xs'
        ],
        [
            'name' => __('Petit', 'efsvp'),
            'size' => 16,
            'slug' => 'small'
        ],
        [
            'name' => __('Normal', 'efsvp'),
            'size' => 17,
            'slug' => 'normal'
        ],
        [
            'name' => __('Moyen', 'efsvp'),
            'size' => 20,
            'slug' => 'medium'
        ],
        [
            'name' => __('Grand', 'efsvp'),
            'size' => 24,
            'slug' => 'large'
        ],
        [
            'name' => __('Très grand', 'efsvp'),
            'size' => 36,
            'slug' => 'xl'
        ],
        [
            'name' => __('Énorme', 'efsvp'),
            'size' => 48,
            'slug' => 'huge'
        ]
    ]);

    // Disable custom font sizes
    add_theme_support('disable-custom-font-sizes');
}
add_action('after_setup_theme', 'efsvp_editor_font_sizes');

/**
 * Configure editor gradients
 */
function efsvp_editor_gradients() {
    add_theme_support('editor-gradient-presets', [
        [
            'name'     => __('Terracotta douce', 'efsvp'),
            'gradient' => 'linear-gradient(135deg, #b95a40 0%, #d16d52 100%)',
            'slug'     => 'primary-gradient'
        ],
        [
            'name'     => __('Automne chaud', 'efsvp'),
            'gradient' => 'linear-gradient(135deg, #c39d6b 0%, #e6d9c3 100%)',
            'slug'     => 'autumn-warm'
        ],
        [
            'name'     => __('Sombre élégant', 'efsvp'),
            'gradient' => 'linear-gradient(135deg, #0f141a 0%, #1d2c3b 100%)',
            'slug'     => 'dark-elegant'
        ]
    ]);

    // Disable custom gradients
    add_theme_support('disable-custom-gradients');
}
add_action('after_setup_theme', 'efsvp_editor_gradients');

/**
 * Register pattern categories
 */
function efsvp_register_pattern_categories() {
    if (!function_exists('register_block_pattern_category')) {
        return;
    }

    register_block_pattern_category(
        'efsvp-actes',
        [
            'label' => __('EfSVP Actes', 'efsvp')
        ]
    );
}
add_action('init', 'efsvp_register_pattern_categories');
