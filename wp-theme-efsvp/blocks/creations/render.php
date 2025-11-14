<?php
/**
 * Block: Créations Audio
 *
 * @package EfSVP
 * @since 1.0.0
 */

// Variables
$title = $attributes['title'] ?? 'Écoutez ce que nous créons';
$subtitle = $attributes['subtitle'] ?? 'Des récits qui touchent, portés par la musique';
$background_color = $attributes['backgroundColor'] ?? '#faf9f8';
$show_cta = $attributes['showCTA'] ?? true;
$cta_text = $attributes['ctaText'] ?? 'Découvrir tous nos projets';
$cta_url = $attributes['ctaUrl'] ?? '#portfolio';

// Block wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'audio-section',
    'style' => 'background-color: ' . esc_attr($background_color),
]);
?>

<section <?php echo $wrapper_attributes; ?> id="creations" aria-labelledby="creations-title">
    <div class="container">
        <header class="section__header" data-scroll>
            <h2 class="section__title" id="creations-title"><?php echo esc_html($title); ?></h2>
            <p class="section__subtitle"><?php echo esc_html($subtitle); ?></p>
        </header>

        <div class="bento-grid" data-scroll>
            <!-- Audio Player 1 - Featured -->
            <article class="bento-item bento-item--large" data-reveal="scale" data-lift>
                <div class="audio-player audio-player--featured">
                    <div class="audio-player__artwork">
                        <div class="audio-player__artwork-placeholder" style="background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);">
                            <svg class="audio-player__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M9 18V5l12-2v13M9 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm12-2c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="audio-player__info">
                        <div class="audio-player__badge">Hymne officiel</div>
                        <h3 class="audio-player__title">La force de la douceur</h3>
                        <p class="audio-player__client">Département Maine-et-Loire · 2024</p>
                    </div>
                    <div class="audio-player__controls">
                        <button class="audio-player__play" aria-label="Lecture" data-audio="sample-1">
                            <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            <svg class="pause-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
                            </svg>
                        </button>
                        <div class="audio-player__waveform" id="waveform-1"></div>
                        <div class="audio-player__time">
                            <span class="audio-player__current">0:00</span>
                            <span class="audio-player__duration">3:45</span>
                        </div>
                    </div>
                </div>
            </article>

            <!-- Info Card 1 -->
            <article class="bento-item bento-item--card" data-reveal="scale" data-glow>
                <div class="info-card">
                    <div class="info-card__number">3</div>
                    <h3 class="info-card__title">formats</h3>
                    <p class="info-card__text">Écriture · Audio · Live</p>
                    <div class="info-card__decoration"></div>
                </div>
            </article>

            <!-- Audio Player 2 - Standard -->
            <article class="bento-item bento-item--medium">
                <div class="audio-player audio-player--standard">
                    <div class="audio-player__compact">
                        <button class="audio-player__play-compact" aria-label="Lecture" data-audio="sample-2">
                            <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            <svg class="pause-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
                            </svg>
                        </button>
                        <div class="audio-player__compact-info">
                            <h4 class="audio-player__compact-title">Série promotionnelle</h4>
                            <p class="audio-player__compact-client">SIVAL · 2025</p>
                        </div>
                    </div>
                    <div class="audio-player__waveform" id="waveform-2"></div>
                </div>
            </article>

            <!-- Quote Card -->
            <article class="bento-item bento-item--medium">
                <div class="quote-card">
                    <svg class="quote-card__icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                    </svg>
                    <blockquote class="quote-card__text">
                        "J'ai vu des gens pleurer. C'était exactement ce que je voulais."
                    </blockquote>
                    <cite class="quote-card__author">— Cliente institutionnelle</cite>
                </div>
            </article>

            <!-- Audio Player 3 - Compact -->
            <article class="bento-item bento-item--medium">
                <div class="audio-player audio-player--list">
                    <div class="audio-player__list-item">
                        <button class="audio-player__play-small" aria-label="Lecture" data-audio="sample-3">
                            <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            <svg class="pause-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
                            </svg>
                        </button>
                        <div class="audio-player__list-info">
                            <h4>Atelier Lacour</h4>
                            <p>Métaphore forêt · 2024</p>
                        </div>
                    </div>
                    <div class="audio-player__waveform-mini" id="waveform-3"></div>
                </div>
            </article>

            <!-- Stats Card -->
            <article class="bento-item bento-item--card">
                <div class="info-card info-card--accent">
                    <div class="info-card__number">60+</div>
                    <h3 class="info-card__title">représentations</h3>
                    <p class="info-card__text">depuis 2022</p>
                </div>
            </article>
        </div>

        <?php if ($show_cta): ?>
            <div class="section__cta">
                <a href="<?php echo esc_url($cta_url); ?>" class="btn btn--secondary">
                    <?php echo esc_html($cta_text); ?>
                    <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
            </div>
        <?php endif; ?>
    </div>
</section>
