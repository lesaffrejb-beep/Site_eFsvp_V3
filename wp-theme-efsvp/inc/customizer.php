<?php
/**
 * WordPress Customizer
 *
 * @package EfSVP
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register customizer settings
 */
function efsvp_customize_register($wp_customize) {
    // Add EfSVP section
    $wp_customize->add_section('efsvp_options', [
        'title'    => __('Options EfSVP', 'efsvp'),
        'priority' => 30
    ]);

    // Example: Footer text
    $wp_customize->add_setting('efsvp_footer_text', [
        'default'           => '',
        'sanitize_callback' => 'wp_kses_post',
        'transport'         => 'refresh'
    ]);

    $wp_customize->add_control('efsvp_footer_text', [
        'label'    => __('Texte du footer', 'efsvp'),
        'section'  => 'efsvp_options',
        'type'     => 'textarea'
    ]);
}
add_action('customize_register', 'efsvp_customize_register');

/**
 * Output custom footer text through a shortcode for block templates.
 */
function efsvp_footer_text_shortcode() {
    $footer_text = get_theme_mod('efsvp_footer_text');

    if (empty($footer_text)) {
        return '';
    }

    return wp_kses_post($footer_text);
}
add_shortcode('efsvp_footer_text', 'efsvp_footer_text_shortcode');

/**
 * Provide the current year through a shortcode for block templates.
 */
function efsvp_current_year_shortcode() {
    return esc_html(date_i18n('Y'));
}
add_shortcode('efsvp_current_year', 'efsvp_current_year_shortcode');

/**
 * Output the site title in templates via shortcode.
 */
function efsvp_site_title_shortcode() {
    return esc_html(get_bloginfo('name'));
}
add_shortcode('efsvp_site_title', 'efsvp_site_title_shortcode');

/**
 * Output the legal baseline used in the footer.
 */
function efsvp_footer_legal_shortcode() {
    $year      = esc_html(date_i18n('Y'));
    $site_name = esc_html(get_bloginfo('name'));
    $baseline  = sprintf(
        '&copy; %1$s %2$s. %3$s',
        $year,
        $site_name,
        esc_html__('Tous droits réservés.', 'efsvp')
    );

    return '<p class="site-footer__legal-text">' . $baseline . '</p>';
}
add_shortcode('efsvp_footer_legal', 'efsvp_footer_legal_shortcode');
