<?php
/**
 * Custom post types & ACF field registration for EfSVP.
 *
 * @package EfSVP
 * @since 1.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register custom post types used by the theme.
 */
function efsvp_register_custom_post_types() {
    $common_supports = ['title', 'editor', 'thumbnail', 'revisions'];

    register_post_type('efsvp_portfolio', [
        'labels' => [
            'name'               => __('Portfolio', 'efsvp'),
            'singular_name'      => __('Projet', 'efsvp'),
            'add_new_item'       => __('Ajouter un projet', 'efsvp'),
            'edit_item'          => __('Modifier le projet', 'efsvp'),
            'new_item'           => __('Nouveau projet', 'efsvp'),
            'view_item'          => __('Voir le projet', 'efsvp'),
            'search_items'       => __('Rechercher un projet', 'efsvp'),
            'not_found'          => __('Aucun projet trouvé', 'efsvp'),
            'not_found_in_trash' => __('Aucun projet dans la corbeille', 'efsvp'),
        ],
        'public'             => true,
        'has_archive'        => false,
        'show_in_rest'       => true,
        'menu_icon'          => 'dashicons-portfolio',
        'supports'           => $common_supports,
        'rewrite'            => ['slug' => 'creations'],
    ]);

    register_post_type('efsvp_testimonial', [
        'labels' => [
            'name'               => __('Témoignages', 'efsvp'),
            'singular_name'      => __('Témoignage', 'efsvp'),
            'add_new_item'       => __('Ajouter un témoignage', 'efsvp'),
            'edit_item'          => __('Modifier le témoignage', 'efsvp'),
            'new_item'           => __('Nouveau témoignage', 'efsvp'),
            'view_item'          => __('Voir le témoignage', 'efsvp'),
            'search_items'       => __('Rechercher un témoignage', 'efsvp'),
            'not_found'          => __('Aucun témoignage trouvé', 'efsvp'),
            'not_found_in_trash' => __('Aucun témoignage dans la corbeille', 'efsvp'),
        ],
        'public'             => true,
        'has_archive'        => false,
        'show_in_rest'       => true,
        'menu_icon'          => 'dashicons-testimonial',
        'supports'           => ['title', 'thumbnail', 'revisions'],
        'rewrite'            => ['slug' => 'temoignages'],
    ]);

    register_post_type('efsvp_faq', [
        'labels' => [
            'name'               => __('FAQ', 'efsvp'),
            'singular_name'      => __('Question FAQ', 'efsvp'),
            'add_new_item'       => __('Ajouter une question', 'efsvp'),
            'edit_item'          => __('Modifier la question', 'efsvp'),
            'new_item'           => __('Nouvelle question', 'efsvp'),
            'view_item'          => __('Voir la question', 'efsvp'),
            'search_items'       => __('Rechercher dans la FAQ', 'efsvp'),
            'not_found'          => __('Aucune question trouvée', 'efsvp'),
            'not_found_in_trash' => __('Aucune question dans la corbeille', 'efsvp'),
        ],
        'public'             => true,
        'has_archive'        => false,
        'show_in_rest'       => true,
        'menu_icon'          => 'dashicons-editor-help',
        'supports'           => ['title', 'revisions'],
        'rewrite'            => ['slug' => 'faq'],
    ]);
}
add_action('init', 'efsvp_register_custom_post_types');

/**
 * Register ACF field groups if the plugin is available.
 */
function efsvp_register_acf_groups() {
    if (!function_exists('acf_add_local_field_group')) {
        return;
    }

    acf_add_local_field_group([
        'key' => 'group_efsvp_portfolio',
        'title' => __('Détails du projet', 'efsvp'),
        'fields' => [
            [
                'key' => 'field_efsvp_portfolio_tagline',
                'label' => __('Tagline', 'efsvp'),
                'name' => 'tagline',
                'type' => 'text',
                'wrapper' => ['width' => '50'],
            ],
            [
                'key' => 'field_efsvp_portfolio_client',
                'label' => __('Client', 'efsvp'),
                'name' => 'client',
                'type' => 'text',
                'wrapper' => ['width' => '50'],
            ],
            [
                'key' => 'field_efsvp_portfolio_year',
                'label' => __('Année', 'efsvp'),
                'name' => 'project_year',
                'type' => 'text',
                'wrapper' => ['width' => '33'],
            ],
            [
                'key' => 'field_efsvp_portfolio_category',
                'label' => __('Catégorie (filtre)', 'efsvp'),
                'name' => 'category',
                'type' => 'text',
                'instructions' => __('Utilisé pour le filtre principal (ex: institutions, entreprises).', 'efsvp'),
                'wrapper' => ['width' => '33'],
            ],
            [
                'key' => 'field_efsvp_portfolio_client_filter',
                'label' => __('Type de client (filtre)', 'efsvp'),
                'name' => 'client_filter',
                'type' => 'select',
                'choices' => [
                    'all'          => __('Tous', 'efsvp'),
                    'institution'  => __('Institution', 'efsvp'),
                    'entreprise'   => __('Entreprise', 'efsvp'),
                    'association'  => __('Association', 'efsvp'),
                    'particulier'  => __('Particulier', 'efsvp'),
                ],
                'default_value' => 'all',
                'wrapper' => ['width' => '33'],
            ],
            [
                'key' => 'field_efsvp_portfolio_type_filter',
                'label' => __('Type de projet (filtre)', 'efsvp'),
                'name' => 'type_filter',
                'type' => 'select',
                'choices' => [
                    'all'       => __('Tous', 'efsvp'),
                    'brand'     => __('Brand content', 'efsvp'),
                    'mediation' => __('Médiation', 'efsvp'),
                    'immersive' => __('Immersif', 'efsvp'),
                    'live'      => __('Live', 'efsvp'),
                ],
                'default_value' => 'all',
                'wrapper' => ['width' => '50'],
            ],
            [
                'key' => 'field_efsvp_portfolio_description',
                'label' => __('Description courte', 'efsvp'),
                'name' => 'description',
                'type' => 'textarea',
                'rows' => 4,
            ],
            [
                'key' => 'field_efsvp_portfolio_accent_color',
                'label' => __("Couleur d'accent", 'efsvp'),
                'name' => 'accent_color',
                'type' => 'color_picker',
                'default_value' => '#0F151D',
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'efsvp_portfolio',
                ],
            ],
        ],
    ]);

    acf_add_local_field_group([
        'key' => 'group_efsvp_testimonial',
        'title' => __('Détails du témoignage', 'efsvp'),
        'fields' => [
            [
                'key' => 'field_efsvp_testimonial_quote',
                'label' => __('Citation', 'efsvp'),
                'name' => 'quote',
                'type' => 'textarea',
                'rows' => 4,
                'required' => 1,
            ],
            [
                'key' => 'field_efsvp_testimonial_role',
                'label' => __('Rôle', 'efsvp'),
                'name' => 'role',
                'type' => 'text',
                'wrapper' => ['width' => '50'],
            ],
            [
                'key' => 'field_efsvp_testimonial_company',
                'label' => __('Organisation', 'efsvp'),
                'name' => 'company',
                'type' => 'text',
                'wrapper' => ['width' => '50'],
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'efsvp_testimonial',
                ],
            ],
        ],
    ]);

    acf_add_local_field_group([
        'key' => 'group_efsvp_faq',
        'title' => __('Réponse de la FAQ', 'efsvp'),
        'fields' => [
            [
                'key' => 'field_efsvp_faq_answer',
                'label' => __('Réponse', 'efsvp'),
                'name' => 'answer',
                'type' => 'wysiwyg',
                'tabs' => 'all',
                'toolbar' => 'basic',
                'media_upload' => 0,
            ],
            [
                'key' => 'field_efsvp_faq_category',
                'label' => __('Catégorie', 'efsvp'),
                'name' => 'faq_category',
                'type' => 'text',
                'instructions' => __('Optionnel — utilisé pour regrouper visuellement les questions.', 'efsvp'),
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'efsvp_faq',
                ],
            ],
        ],
    ]);
}
add_action('acf/init', 'efsvp_register_acf_groups');
