(function(blocks, element, components, blockEditor, i18n) {
    const { registerBlockType } = blocks;
    const { Fragment } = element;
    const { __ } = i18n;
    const { PanelBody, TextControl } = components;
    const { InspectorControls, InnerBlocks, RichText } = blockEditor || wp.editor;

    const createCaseTemplate = ({ badge, title, client, featured = false }) => {
        const classes = ['case-card'];
        if (featured) {
            classes.push('case-card--featured');
        }

        const storyTemplate = [
            {
                title: '🎯 ' + __('Problème', 'efsvp'),
                description: __('Décrivez le contexte initial et le besoin.', 'efsvp')
            },
            {
                title: '⚙️ ' + __('Approche', 'efsvp'),
                description: __('Expliquez votre méthodologie ou le format proposé.', 'efsvp')
            },
            {
                title: '✨ ' + __('Effet', 'efsvp'),
                description: __('Indiquez les résultats clés obtenus.', 'efsvp')
            }
        ];

        return [
            'core/group',
            {
                className: classes.join(' '),
                layout: { type: 'constrained' }
            },
            [
                ['core/group', { className: 'case-card__visual', layout: { type: 'default' } },
                    [
                        ['core/group', { className: 'case-card__gradient', layout: { type: 'default' } }],
                        ['core/paragraph', { className: 'case-card__badge', content: badge || __('Badge', 'efsvp') }],
                        featured ? ['core/paragraph', { className: 'case-card__tag-featured', content: __('Création phare', 'efsvp') }] : null
                    ].filter(Boolean)
                ],
                ['core/group', { className: 'case-card__content', layout: { type: 'default' } },
                    [
                        ['core/heading', { level: 3, className: 'case-card__title', content: title || __('Titre du projet', 'efsvp') }],
                        ['core/paragraph', { className: 'case-card__client', content: client || __('Client · Année', 'efsvp') }],
                        ['core/group', { className: 'case-card__story', layout: { type: 'default' } },
                            storyTemplate.map((step) => (
                                ['core/group', { className: 'case-card__step', layout: { type: 'default' } },
                                    [
                                        ['core/heading', { level: 4, className: 'case-card__step-title', content: step.title }],
                                        ['core/paragraph', { content: step.description }]
                                    ]
                                ]
                            ))
                        ],
                        ['core/group', { className: 'case-card__cta', layout: { type: 'default' } },
                            [
                                ['core/button', {
                                    className: featured ? 'case-card__audio-btn case-card__audio-btn--featured' : 'case-card__audio-btn',
                                    text: __('Écouter 30s', 'efsvp')
                                }]
                            ]
                        ]
                    ]
                ]
            ]
        ];
    };

    const getDefaultTemplate = () => [
        createCaseTemplate({
            badge: __('Série narrative', 'efsvp'),
            title: __('SIVAL — L\'innovation agricole racontée', 'efsvp'),
            client: __('Destination Angers · 2025', 'efsvp')
        }),
        createCaseTemplate({
            badge: __('Anniversaire entreprise', 'efsvp'),
            title: __('Atelier Lacour — Métaphore de la forêt', 'efsvp'),
            client: __('Entreprise familiale · 2024', 'efsvp')
        }),
        createCaseTemplate({
            badge: __('Spectacle immersif', 'efsvp'),
            title: __('État de nature — Spectacle en pleine forêt', 'efsvp'),
            client: __('PNR Loire-Anjou-Touraine · 2023 →', 'efsvp'),
            featured: true
        })
    ];

    registerBlockType('efsvp/flagship-cases', {
        edit({ attributes, setAttributes }) {
            const { sectionTitle, sectionSubtitle, ctaText, ctaUrl } = attributes;

            const updateSectionTitle = (value) => setAttributes({ sectionTitle: value });
            const updateSectionSubtitle = (value) => setAttributes({ sectionSubtitle: value });
            const updateCtaText = (value) => setAttributes({ ctaText: value });
            const updateCtaUrl = (value) => setAttributes({ ctaUrl: value });

            return element.createElement(
                Fragment,
                null,
                element.createElement(
                    InspectorControls,
                    null,
                    element.createElement(
                        PanelBody,
                        { title: __('Lien d\'appel à l\'action', 'efsvp'), initialOpen: true },
                        element.createElement(TextControl, {
                            label: __('Texte du lien', 'efsvp'),
                            value: ctaText,
                            onChange: updateCtaText
                        }),
                        element.createElement(TextControl, {
                            label: __('URL du lien', 'efsvp'),
                            value: ctaUrl,
                            onChange: updateCtaUrl
                        })
                    )
                ),
                element.createElement(
                    'section',
                    { className: 'efsvp-flagship-cases-editor' },
                    element.createElement(
                        'div',
                        { className: 'efsvp-flagship-cases-editor__header' },
                        element.createElement(RichText, {
                            tagName: 'h2',
                            value: sectionTitle,
                            onChange: updateSectionTitle,
                            placeholder: __('Ajouter un titre de section…', 'efsvp')
                        }),
                        element.createElement(RichText, {
                            tagName: 'p',
                            value: sectionSubtitle,
                            onChange: updateSectionSubtitle,
                            placeholder: __('Ajouter un sous-titre…', 'efsvp')
                        })
                    ),
                    element.createElement(
                        'div',
                        { className: 'efsvp-flagship-cases-editor__grid' },
                        element.createElement(InnerBlocks, {
                            allowedBlocks: ['core/group'],
                            template: getDefaultTemplate(),
                            templateLock: false
                        })
                    ),
                    element.createElement(
                        'div',
                        { className: 'efsvp-flagship-cases-editor__cta' },
                        element.createElement(RichText, {
                            tagName: 'a',
                            value: ctaText,
                            onChange: updateCtaText,
                            placeholder: __('Texte du lien…', 'efsvp'),
                            href: ctaUrl || '#',
                            className: 'btn btn--secondary'
                        }),
                        element.createElement(TextControl, {
                            label: __('URL du bouton', 'efsvp'),
                            value: ctaUrl,
                            onChange: updateCtaUrl,
                            className: 'efsvp-flagship-cases-editor__cta-url-control'
                        })
                    )
                )
            );
        },
        save() {
            return null;
        }
    });
})(window.wp.blocks, window.wp.element, window.wp.components, window.wp.blockEditor || window.wp.editor, window.wp.i18n);
