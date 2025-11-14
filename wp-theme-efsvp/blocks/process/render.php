<?php
/**
 * Block: Process Timeline
 *
 * @package EfSVP
 * @since 1.0.0
 */

// Variables
$title = $attributes['title'] ?? 'Comment ça marche';
$subtitle = $attributes['subtitle'] ?? 'Un process simple et rassurant en 4 étapes';
$background_color = $attributes['backgroundColor'] ?? '#faf9f8';
$show_cta = $attributes['showCTA'] ?? true;
$cta_text = $attributes['ctaText'] ?? 'Démarrer votre projet';
$cta_url = $attributes['ctaUrl'] ?? '#contact';

// Block wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'process',
    'style' => 'background-color: ' . esc_attr($background_color),
]);
?>

<section <?php echo $wrapper_attributes; ?> id="process">
    <div class="container">
        <header class="section__header" data-scroll>
            <h2 class="section__title" id="process-title"><?php echo esc_html($title); ?></h2>
            <p class="section__subtitle"><?php echo esc_html($subtitle); ?></p>
        </header>

        <div class="process__timeline">
            <!-- Step 1: Écoute -->
            <article class="process__step" data-scroll>
                <div class="process__step-number">
                    <span>01</span>
                </div>
                <div class="process__step-content">
                    <div class="process__step-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                        </svg>
                    </div>
                    <h3 class="process__step-title">Écoute</h3>
                    <p class="process__step-duration">2 semaines</p>
                    <p class="process__step-description">
                        Vous nous racontez votre histoire, vos enjeux. Nous collectons, écoutons, immergeons.
                    </p>
                    <ul class="process__step-details">
                        <li>Entretiens approfondis</li>
                        <li>Documents et archives</li>
                        <li>Immersion terrain si besoin</li>
                    </ul>
                </div>
                <div class="process__connector"></div>
            </article>

            <!-- Step 2: Création -->
            <article class="process__step" data-scroll>
                <div class="process__step-number">
                    <span>02</span>
                </div>
                <div class="process__step-content">
                    <div class="process__step-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                        </svg>
                    </div>
                    <h3 class="process__step-title">Création</h3>
                    <p class="process__step-duration">3-6 semaines</p>
                    <p class="process__step-description">
                        Nous écrivons et composons votre récit. Un processus créatif rigoureux et transparent.
                    </p>
                    <ul class="process__step-details">
                        <li>Écriture du texte</li>
                        <li>Composition musicale</li>
                        <li>Enregistrement professionnel</li>
                    </ul>
                </div>
                <div class="process__connector"></div>
            </article>

            <!-- Step 3: Validation -->
            <article class="process__step" data-scroll>
                <div class="process__step-number">
                    <span>03</span>
                </div>
                <div class="process__step-content">
                    <div class="process__step-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <h3 class="process__step-title">Validation</h3>
                    <p class="process__step-duration">Inclus</p>
                    <p class="process__step-description">
                        2 allers-retours inclus. Vous validez chaque étape, nous ajustons avec vous.
                    </p>
                    <ul class="process__step-details">
                        <li>Version 1 → Retours</li>
                        <li>Ajustements</li>
                        <li>Version 2 → Validation finale</li>
                    </ul>
                    <span class="process__badge">Transparence totale</span>
                </div>
                <div class="process__connector"></div>
            </article>

            <!-- Step 4: Performance -->
            <article class="process__step" data-scroll>
                <div class="process__step-number">
                    <span>04</span>
                </div>
                <div class="process__step-content">
                    <div class="process__step-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>
                        </svg>
                    </div>
                    <h3 class="process__step-title">Performance</h3>
                    <p class="process__step-duration">Jour J</p>
                    <p class="process__step-description">
                        Nous venons jouer chez vous ou nous livrons l'enregistrement audio HD.
                    </p>
                    <ul class="process__step-details">
                        <li>Performance live</li>
                        <li>Audio HD professionnel</li>
                        <li>Captation vidéo (option)</li>
                    </ul>
                    <span class="process__badge">Clé en main</span>
                </div>
            </article>
        </div>

        <?php if ($show_cta): ?>
            <div class="section__cta">
                <a href="<?php echo esc_url($cta_url); ?>" class="btn btn--primary btn--large">
                    <?php echo esc_html($cta_text); ?>
                    <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
            </div>
        <?php endif; ?>
    </div>
</section>
