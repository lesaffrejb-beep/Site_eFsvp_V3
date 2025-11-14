<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="description" content="<?php bloginfo('description'); ?>">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Skip to main content (Accessibility) -->
<a href="#main" class="skip-link sr-only"><?php esc_html_e('Aller au contenu principal', 'efsvp'); ?></a>

<!-- Navigation principale -->
<nav class="nav" id="nav" aria-label="<?php esc_attr_e('Navigation principale', 'efsvp'); ?>">
    <div class="nav__container">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="nav__logo" aria-label="<?php esc_attr_e('Retour à l\'accueil', 'efsvp'); ?>">
            <span class="nav__logo-text">
                <?php bloginfo('name'); ?>
            </span>
        </a>

        <div class="nav__menu" id="nav-menu">
            <?php
            wp_nav_menu([
                'theme_location' => 'primary',
                'container'      => false,
                'menu_class'     => 'nav__list',
                'items_wrap'     => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                'walker'         => new class extends Walker_Nav_Menu {
                    function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
                        $output .= '<li class="nav__item">';
                        $output .= '<a href="' . esc_url($item->url) . '" class="nav__link">' . esc_html($item->title) . '</a>';
                    }
                    function end_el(&$output, $item, $depth = 0, $args = null) {
                        $output .= '</li>';
                    }
                },
                'fallback_cb'    => function() {
                    echo '<ul class="nav__list">';
                    echo '<li class="nav__item"><a href="#creations" class="nav__link">Créations</a></li>';
                    echo '<li class="nav__item"><a href="#portfolio" class="nav__link">Portfolio</a></li>';
                    echo '<li class="nav__item"><a href="#process" class="nav__link">Process</a></li>';
                    echo '<li class="nav__item"><a href="#faq" class="nav__link">FAQ</a></li>';
                    echo '</ul>';
                }
            ]);
            ?>
        </div>

        <a href="#contact" class="nav__cta btn btn--primary-small"><?php esc_html_e('Démarrer votre projet', 'efsvp'); ?></a>

        <!-- Mobile Toggle -->
        <button class="nav__toggle" id="nav-toggle" aria-label="<?php esc_attr_e('Menu', 'efsvp'); ?>" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
</nav>

<main id="main" class="site-main" role="main">
