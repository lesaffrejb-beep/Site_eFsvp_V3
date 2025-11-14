<?php
/**
 * FAQ Block Template
 * Reproduit exactement la structure HTML de la maquette (index.html lignes 1383-1621)
 *
 * @param array    $attributes Block attributes
 * @param string   $content    Block content
 * @param WP_Block $block      Block instance
 */

if (!defined('ABSPATH')) {
    exit;
}

// Récupération des attributs
$section_title = $attributes['sectionTitle'] ?? 'Vos questions, nos réponses';
$faq_items = $attributes['faqItems'] ?? [];

// Wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'faq',
    'id' => 'faq',
    'aria-labelledby' => 'faq-title'
]);
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="container">
        <header class="section__header">
            <h2 class="section__title" id="faq-title"><?php echo esc_html($section_title); ?></h2>
        </header>

        <!-- FAQ Grid -->
        <div class="faq__grid">
            <?php foreach ($faq_items as $index => $item): ?>
                <?php
                $answer_id = 'faq-answer-' . ($index + 1);
                $question = $item['question'] ?? '';
                $answer = $item['answer'] ?? '';
                ?>

                <!-- Question <?php echo ($index + 1); ?> -->
                <article class="faq__item">
                    <button
                        class="faq__question"
                        aria-expanded="false"
                        aria-controls="<?php echo esc_attr($answer_id); ?>"
                    >
                        <span class="faq__question-text"><?php echo esc_html($question); ?></span>
                        <svg
                            class="faq__icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </button>
                    <div class="faq__answer-wrapper">
                        <div class="faq__answer" id="<?php echo esc_attr($answer_id); ?>">
                            <p><?php echo wp_kses_post($answer); ?></p>
                        </div>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>
