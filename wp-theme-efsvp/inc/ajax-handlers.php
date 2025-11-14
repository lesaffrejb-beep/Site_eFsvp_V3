<?php
/**
 * AJAX Handlers for theme functionality
 *
 * @package EfSVP
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Handle contact form submission via AJAX
 */
function efsvp_submit_contact_form() {
    // Verify nonce
    if (!isset($_POST['efsvp_contact_nonce']) || !wp_verify_nonce($_POST['efsvp_contact_nonce'], 'efsvp_contact_form')) {
        wp_send_json_error('Invalid security token', 403);
        return;
    }

    // Sanitize and validate form data
    $nom = isset($_POST['nom']) ? sanitize_text_field($_POST['nom']) : '';
    $email = isset($_POST['email']) ? sanitize_email($_POST['email']) : '';
    $organisation = isset($_POST['organisation']) ? sanitize_text_field($_POST['organisation']) : '';
    $type_projet = isset($_POST['type-projet']) ? sanitize_text_field($_POST['type-projet']) : '';
    $date = isset($_POST['date']) ? sanitize_text_field($_POST['date']) : '';
    $budget = isset($_POST['budget']) ? intval($_POST['budget']) : 0;
    $message = isset($_POST['message']) ? sanitize_textarea_field($_POST['message']) : '';
    $consent = isset($_POST['consent']) ? true : false;

    // Validate required fields
    $errors = [];

    if (empty($nom)) {
        $errors[] = 'Le nom est requis';
    }

    if (empty($email) || !is_email($email)) {
        $errors[] = 'Email invalide';
    }

    if (empty($organisation)) {
        $errors[] = "L'organisation est requise";
    }

    if (empty($type_projet)) {
        $errors[] = 'Le type de projet est requis';
    }

    if (empty($message)) {
        $errors[] = 'Le message est requis';
    }

    if (!$consent) {
        $errors[] = 'Le consentement est requis';
    }

    if (!empty($errors)) {
        wp_send_json_error(implode(', ', $errors), 400);
        return;
    }

    // Prepare email to admin
    $admin_email = get_option('admin_email');
    $site_name = get_bloginfo('name');

    $subject = sprintf('[%s] Nouveau message de contact - %s', $site_name, $nom);

    $email_message = sprintf(
        "Nouveau message de contact reçu\n\n" .
        "Nom: %s\n" .
        "Email: %s\n" .
        "Organisation: %s\n" .
        "Type de projet: %s\n" .
        "Date envisagée: %s\n" .
        "Budget estimé: %s€\n\n" .
        "Message:\n%s\n\n" .
        "---\n" .
        "Consentement: Accepté\n" .
        "Envoyé le: %s",
        $nom,
        $email,
        $organisation,
        $type_projet,
        $date ? $date : 'Non spécifiée',
        number_format($budget, 0, ',', ' '),
        $message,
        current_time('mysql')
    );

    $headers = [
        'Content-Type: text/plain; charset=UTF-8',
        'From: ' . $site_name . ' <' . $admin_email . '>',
        'Reply-To: ' . $nom . ' <' . $email . '>'
    ];

    // Send email
    $sent = wp_mail($admin_email, $subject, $email_message, $headers);

    if ($sent) {
        // Optionally save to database or custom post type
        efsvp_save_contact_submission([
            'nom' => $nom,
            'email' => $email,
            'organisation' => $organisation,
            'type_projet' => $type_projet,
            'date' => $date,
            'budget' => $budget,
            'message' => $message,
        ]);

        // Send auto-reply to customer (optional)
        efsvp_send_contact_auto_reply($email, $nom);

        wp_send_json_success('Message envoyé avec succès');
    } else {
        wp_send_json_error('Erreur lors de l\'envoi du message', 500);
    }
}
add_action('wp_ajax_efsvp_submit_contact_form', 'efsvp_submit_contact_form');
add_action('wp_ajax_nopriv_efsvp_submit_contact_form', 'efsvp_submit_contact_form');

/**
 * Save contact form submission to database (optional)
 *
 * @param array $data Form data
 */
function efsvp_save_contact_submission($data) {
    // Save to custom post type 'efsvp_contact'
    $post_data = [
        'post_title' => sprintf('%s - %s', $data['nom'], $data['organisation']),
        'post_type' => 'efsvp_contact',
        'post_status' => 'private',
        'post_content' => $data['message'],
        'meta_input' => [
            'contact_nom' => $data['nom'],
            'contact_email' => $data['email'],
            'contact_organisation' => $data['organisation'],
            'contact_type_projet' => $data['type_projet'],
            'contact_date' => $data['date'],
            'contact_budget' => $data['budget'],
        ]
    ];

    $post_id = wp_insert_post($post_data);

    // Log the submission
    if ($post_id && !is_wp_error($post_id)) {
        error_log(sprintf('Contact form submission saved: ID %d', $post_id));
    }

    return $post_id;
}

/**
 * Send auto-reply email to customer
 *
 * @param string $email Customer email
 * @param string $nom Customer name
 */
function efsvp_send_contact_auto_reply($email, $nom) {
    $site_name = get_bloginfo('name');
    $prenom = explode(' ', $nom)[0]; // Get first name

    $subject = sprintf('Merci pour votre message - %s', $site_name);

    $message = sprintf(
        "Bonjour %s,\n\n" .
        "Merci de nous avoir contactés !\n\n" .
        "Nous avons bien reçu votre message et nous vous répondrons dans les 48 heures.\n\n" .
        "En attendant, n'hésitez pas à découvrir nos réalisations sur notre site.\n\n" .
        "À très bientôt,\n" .
        "L'équipe %s\n\n" .
        "---\n" .
        "Ceci est un message automatique, merci de ne pas y répondre.",
        $prenom,
        $site_name
    );

    $headers = [
        'Content-Type: text/plain; charset=UTF-8',
        'From: ' . $site_name . ' <' . get_option('admin_email') . '>'
    ];

    wp_mail($email, $subject, $message, $headers);
}

/**
 * Enqueue AJAX URL for frontend scripts
 */
function efsvp_localize_ajax_data() {
    wp_localize_script('efsvp-main', 'efsvpData', [
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('efsvp_ajax_nonce')
    ]);
}
add_action('wp_enqueue_scripts', 'efsvp_localize_ajax_data', 20);
