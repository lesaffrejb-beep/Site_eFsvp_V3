<?php
/**
 * Enqueue Scripts & Styles
 *
 * Performance-first approach
 *
 * @package EfSVP
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue theme assets
 */
function efsvp_enqueue_assets() {
    // Google Fonts - Preconnect for performance
    wp_enqueue_style(
        'efsvp-fonts',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Cormorant:ital,wght@1,600&display=swap',
        [],
        null
    );

    // Global design tokens (shared with front & editor)
    wp_enqueue_style(
        'efsvp-design-tokens',
        EFSVP_THEME_URI . '/assets/css/design-tokens.css',
        [],
        EFSVP_VERSION
    );

    // Design System CSS
    wp_enqueue_style(
        'efsvp-design-system',
        EFSVP_THEME_URI . '/assets/css/design-system.css',
        ['efsvp-design-tokens'],
        EFSVP_VERSION
    );

    // Main styles from maquette
    wp_enqueue_style(
        'efsvp-styles',
        EFSVP_THEME_URI . '/assets/css/styles.css',
        ['efsvp-design-system'],
        EFSVP_VERSION
    );

    // Premium enhancements
    wp_enqueue_style(
        'efsvp-premium-enhancements',
        EFSVP_THEME_URI . '/assets/css/premium/premium-enhancements.css',
        ['efsvp-styles'],
        EFSVP_VERSION
    );

    // Premium unified
    wp_enqueue_style(
        'efsvp-premium-unified',
        EFSVP_THEME_URI . '/assets/css/premium/premium-unified.css',
        ['efsvp-premium-enhancements'],
        EFSVP_VERSION
    );

    // Cookie banner
    wp_enqueue_style(
        'efsvp-cookie-banner',
        EFSVP_THEME_URI . '/assets/css/premium/cookie-banner.css',
        ['efsvp-premium-unified'],
        EFSVP_VERSION
    );

    // Main stylesheet
    wp_enqueue_style(
        'efsvp-main',
        get_stylesheet_uri(),
        ['efsvp-cookie-banner'],
        EFSVP_VERSION
    );

    // Component styles
    wp_enqueue_style(
        'efsvp-header',
        EFSVP_THEME_URI . '/assets/css/components/header.css',
        ['efsvp-main'],
        EFSVP_VERSION
    );

    // Button styles
    wp_enqueue_style(
        'efsvp-buttons',
        EFSVP_THEME_URI . '/assets/css/components/buttons.css',
        ['efsvp-main'],
        EFSVP_VERSION
    );

    // Footer styles
    wp_enqueue_style(
        'efsvp-footer',
        EFSVP_THEME_URI . '/assets/css/components/footer.css',
        ['efsvp-main'],
        EFSVP_VERSION
    );

    // Main JavaScript (avec type module pour supporter les imports)
    wp_enqueue_script(
        'efsvp-main',
        EFSVP_THEME_URI . '/assets/js/main.js',
        [],
        EFSVP_VERSION,
        [
            'in_footer' => true,
            'strategy' => 'defer'
        ]
    );

    // Ajouter l'attribut type="module" au script principal
    add_filter('script_loader_tag', function($tag, $handle) {
        if ('efsvp-main' === $handle) {
            $tag = str_replace(' src', ' type="module" src', $tag);
        }
        return $tag;
    }, 10, 2);

    // Localize script for AJAX
    wp_localize_script('efsvp-main', 'efsvpData', [
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce'   => wp_create_nonce('efsvp-nonce'),
        'siteUrl' => home_url('/')
    ]);

    // Comment reply script for threaded comments
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'efsvp_enqueue_assets');

/**
 * Defer non-critical scripts for performance
 */
function efsvp_defer_scripts($tag, $handle, $src) {
    $defer_scripts = ['efsvp-main'];

    if (in_array($handle, $defer_scripts)) {
        return str_replace(' src', ' defer src', $tag);
    }

    return $tag;
}
add_filter('script_loader_tag', 'efsvp_defer_scripts', 10, 3);

/**
 * Add preconnect for external domains
 */
function efsvp_resource_hints($urls, $relation_type) {
    if ('dns-prefetch' === $relation_type) {
        $urls[] = '//fonts.googleapis.com';
        $urls[] = '//fonts.gstatic.com';
    }

    if ('preconnect' === $relation_type) {
        $urls[] = [
            'href' => 'https://fonts.googleapis.com',
            'crossorigin'
        ];
        $urls[] = [
            'href' => 'https://fonts.gstatic.com',
            'crossorigin'
        ];
    }

    return $urls;
}
add_filter('wp_resource_hints', 'efsvp_resource_hints', 10, 2);

/**
 * Enqueue WaveSurfer.js for audio blocks only when needed.
 */
function efsvp_enqueue_audio_block_assets() {
    $handle     = 'wavesurfer';
    $script_src = 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.min.js';
    $version    = '7.7.11';

    if (!wp_script_is($handle, 'registered')) {
        wp_register_script($handle, $script_src, [], $version, true);
    }

    if (is_admin()) {
        wp_enqueue_script($handle);
        return;
    }

    if (function_exists('has_block') && has_block('efsvp/audio-bento')) {
        wp_enqueue_script($handle);
    }
}
add_action('enqueue_block_assets', 'efsvp_enqueue_audio_block_assets');

/**
 * Enqueue Swiper JS for carousel/slider blocks when needed.
 */
function efsvp_enqueue_swiper_assets() {
    // Swiper CSS
    wp_register_style(
        'swiper',
        'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
        [],
        '11.0.0'
    );

    // Swiper JS
    wp_register_script(
        'swiper',
        'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
        [],
        '11.0.0',
        true
    );

    // Enqueue if creations block is present
    if (function_exists('has_block') && (has_block('efsvp/creations') || has_block('efsvp/audio-bento'))) {
        wp_enqueue_style('swiper');
        wp_enqueue_script('swiper');
    }
}
add_action('wp_enqueue_scripts', 'efsvp_enqueue_swiper_assets');
