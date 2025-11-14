<?php
/**
 * Audio Bento Block Template
 *
 * @param array    $attributes Block attributes
 * @param string   $content    Block content (not used)
 * @param WP_Block $block      Block instance
 */

if (!defined('ABSPATH')) {
    exit;
}

$section_title    = $attributes['sectionTitle'] ?? '';
$section_subtitle = $attributes['sectionSubtitle'] ?? '';
$tracks           = is_array($attributes['playlists'] ?? null) ? $attributes['playlists'] : [];

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'efsvp-audio-bento'
]);
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="container">
        <?php if ($section_title || $section_subtitle) : ?>
            <header class="section__header">
                <?php if ($section_title) : ?>
                    <h2 class="section__title"><?php echo wp_kses_post($section_title); ?></h2>
                <?php endif; ?>
                <?php if ($section_subtitle) : ?>
                    <p class="section__subtitle"><?php echo wp_kses_post($section_subtitle); ?></p>
                <?php endif; ?>
            </header>
        <?php endif; ?>

        <?php if (!empty($tracks)) : ?>
            <div class="bento-grid">
                <?php foreach ($tracks as $index => $track) :
                    $layout    = isset($track['layout']) ? sanitize_key($track['layout']) : 'standard';
                    $badge     = $track['badge'] ?? '';
                    $title     = $track['title'] ?? '';
                    $client    = $track['client'] ?? '';
                    $audio_url = $track['audioUrl'] ?? '';
                    $duration  = $track['duration'] ?? '';
                    $metadata  = $track['metadata'] ?? '';
                    $track_id  = 'efsvp-audio-' . ($index + 1);
                    $button_id = $track_id . '-button';
                    $wave_id   = $track_id . '-wave';
                    ?>

                    <?php if ('featured' === $layout) : ?>
                        <article class="bento-item bento-item--large">
                            <div class="audio-player audio-player--featured">
                                <div class="audio-player__artwork">
                                    <div class="audio-player__artwork-placeholder"></div>
                                </div>
                                <div class="audio-player__info">
                                    <?php if ($badge) : ?>
                                        <div class="audio-player__badge"><?php echo esc_html($badge); ?></div>
                                    <?php endif; ?>
                                    <?php if ($title) : ?>
                                        <h3 class="audio-player__title"><?php echo esc_html($title); ?></h3>
                                    <?php endif; ?>
                                    <?php if ($client) : ?>
                                        <p class="audio-player__client"><?php echo esc_html($client); ?></p>
                                    <?php endif; ?>
                                    <?php if ($metadata) : ?>
                                        <p class="audio-player__meta"><?php echo esc_html($metadata); ?></p>
                                    <?php endif; ?>
                                </div>
                                <div class="audio-player__controls">
                                    <button
                                        id="<?php echo esc_attr($button_id); ?>"
                                        class="audio-player__play"
                                        type="button"
                                        data-audio="<?php echo esc_url($audio_url); ?>"
                                        aria-label="<?php esc_attr_e('Lecture audio', 'efsvp'); ?>"
                                    >
                                        <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                        <svg class="pause-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                                        </svg>
                                    </button>
                                    <div class="audio-player__waveform" id="<?php echo esc_attr($wave_id); ?>"></div>
                                    <div class="audio-player__time">
                                        <span class="audio-player__current">0:00</span>
                                        <?php if ($duration) : ?>
                                            <span class="audio-player__duration"><?php echo esc_html($duration); ?></span>
                                        <?php endif; ?>
                                    </div>
                                </div>
                            </div>
                        </article>
                    <?php elseif ('list' === $layout) : ?>
                        <article class="bento-item bento-item--medium">
                            <div class="audio-player audio-player--list">
                                <div class="audio-player__list-item">
                                    <button
                                        id="<?php echo esc_attr($button_id); ?>"
                                        class="audio-player__play-small"
                                        type="button"
                                        data-audio="<?php echo esc_url($audio_url); ?>"
                                        aria-label="<?php esc_attr_e('Lecture audio', 'efsvp'); ?>"
                                    >
                                        <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                        <svg class="pause-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                                        </svg>
                                    </button>
                                    <div class="audio-player__list-info">
                                        <?php if ($title) : ?>
                                            <h4><?php echo esc_html($title); ?></h4>
                                        <?php endif; ?>
                                        <?php if ($client) : ?>
                                            <p><?php echo esc_html($client); ?></p>
                                        <?php endif; ?>
                                        <?php if ($metadata) : ?>
                                            <p class="audio-player__meta"><?php echo esc_html($metadata); ?></p>
                                        <?php endif; ?>
                                    </div>
                                </div>
                                <div class="audio-player__waveform-mini" id="<?php echo esc_attr($wave_id); ?>"></div>
                                <?php if ($duration) : ?>
                                    <div class="audio-player__time audio-player__time--compact">
                                        <span class="audio-player__duration"><?php echo esc_html($duration); ?></span>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </article>
                    <?php else : ?>
                        <article class="bento-item bento-item--medium">
                            <div class="audio-player audio-player--standard">
                                <div class="audio-player__compact">
                                    <button
                                        id="<?php echo esc_attr($button_id); ?>"
                                        class="audio-player__play-compact"
                                        type="button"
                                        data-audio="<?php echo esc_url($audio_url); ?>"
                                        aria-label="<?php esc_attr_e('Lecture audio', 'efsvp'); ?>"
                                    >
                                        <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                        <svg class="pause-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                                        </svg>
                                    </button>
                                    <div class="audio-player__compact-info">
                                        <?php if ($title) : ?>
                                            <h4 class="audio-player__compact-title"><?php echo esc_html($title); ?></h4>
                                        <?php endif; ?>
                                        <?php if ($client) : ?>
                                            <p class="audio-player__compact-client"><?php echo esc_html($client); ?></p>
                                        <?php endif; ?>
                                        <?php if ($metadata) : ?>
                                            <p class="audio-player__meta"><?php echo esc_html($metadata); ?></p>
                                        <?php endif; ?>
                                    </div>
                                </div>
                                <div class="audio-player__waveform" id="<?php echo esc_attr($wave_id); ?>"></div>
                                <?php if ($duration) : ?>
                                    <div class="audio-player__time">
                                        <span class="audio-player__duration"><?php echo esc_html($duration); ?></span>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </article>
                    <?php endif; ?>
                <?php endforeach; ?>
            </div>
        <?php else : ?>
            <p class="efsvp-audio-bento__empty">
                <?php esc_html_e('Ajoutez des extraits audio pour compléter cette section.', 'efsvp'); ?>
            </p>
        <?php endif; ?>
    </div>
</section>
