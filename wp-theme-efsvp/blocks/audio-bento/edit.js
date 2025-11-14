(function(blocks, element, components, blockEditor, i18n) {
    const { registerBlockType } = blocks;
    const { Fragment } = element;
    const { __ } = i18n;
    const { PanelBody, TextControl, TextareaControl, SelectControl, Button } = components;
    const { InspectorControls, RichText } = blockEditor || wp.editor;

    const layoutOptions = [
        { label: __('Mise en avant', 'efsvp'), value: 'featured' },
        { label: __('Standard', 'efsvp'), value: 'standard' },
        { label: __('Liste compacte', 'efsvp'), value: 'list' }
    ];

    function ensureArray(value) {
        return Array.isArray(value) ? value : [];
    }

    registerBlockType('efsvp/audio-bento', {
        edit({ attributes, setAttributes }) {
            const { sectionTitle, sectionSubtitle } = attributes;
            const playlists = ensureArray(attributes.playlists);

            const updateSectionTitle = (value) => setAttributes({ sectionTitle: value });
            const updateSectionSubtitle = (value) => setAttributes({ sectionSubtitle: value });

            const updateTrack = (index, key, value) => {
                const nextTracks = playlists.map((track, trackIndex) => {
                    if (trackIndex !== index) {
                        return track;
                    }
                    return {
                        ...track,
                        [key]: value
                    };
                });

                setAttributes({ playlists: nextTracks });
            };

            const addTrack = () => {
                const nextTracks = [
                    ...playlists,
                    {
                        layout: 'standard',
                        badge: '',
                        title: '',
                        client: '',
                        audioUrl: '',
                        duration: '',
                        metadata: ''
                    }
                ];

                setAttributes({ playlists: nextTracks });
            };

            const removeTrack = (index) => {
                const nextTracks = playlists.filter((_, trackIndex) => trackIndex !== index);
                setAttributes({ playlists: nextTracks });
            };

            return element.createElement(
                Fragment,
                null,
                element.createElement(
                    InspectorControls,
                    null,
                    element.createElement(
                        PanelBody,
                        { title: __('Paramètres de la section', 'efsvp'), initialOpen: true },
                        element.createElement(TextControl, {
                            label: __('Titre', 'efsvp'),
                            value: sectionTitle,
                            onChange: updateSectionTitle
                        }),
                        element.createElement(TextControl, {
                            label: __('Sous-titre', 'efsvp'),
                            value: sectionSubtitle,
                            onChange: updateSectionSubtitle
                        })
                    ),
                    element.createElement(
                        PanelBody,
                        { title: __('Extraits audio', 'efsvp'), initialOpen: true },
                        playlists.map((track, index) =>
                            element.createElement(
                                'div',
                                { key: index, className: 'efsvp-audio-bento-editor__track-settings' },
                                element.createElement(SelectControl, {
                                    label: __('Mise en page', 'efsvp'),
                                    value: track.layout || 'standard',
                                    options: layoutOptions,
                                    onChange: (value) => updateTrack(index, 'layout', value)
                                }),
                                element.createElement(TextControl, {
                                    label: __('Badge', 'efsvp'),
                                    value: track.badge || '',
                                    onChange: (value) => updateTrack(index, 'badge', value)
                                }),
                                element.createElement(TextControl, {
                                    label: __('Titre', 'efsvp'),
                                    value: track.title || '',
                                    onChange: (value) => updateTrack(index, 'title', value)
                                }),
                                element.createElement(TextControl, {
                                    label: __('Métadonnée principale', 'efsvp'),
                                    value: track.client || '',
                                    onChange: (value) => updateTrack(index, 'client', value)
                                }),
                                element.createElement(TextareaControl, {
                                    label: __('Description courte', 'efsvp'),
                                    value: track.metadata || '',
                                    onChange: (value) => updateTrack(index, 'metadata', value)
                                }),
                                element.createElement(TextControl, {
                                    label: __('URL audio (mp3, wav...)', 'efsvp'),
                                    value: track.audioUrl || '',
                                    onChange: (value) => updateTrack(index, 'audioUrl', value),
                                    help: __('URL directe vers le fichier audio à lire.', 'efsvp')
                                }),
                                element.createElement(TextControl, {
                                    label: __('Durée affichée', 'efsvp'),
                                    value: track.duration || '',
                                    onChange: (value) => updateTrack(index, 'duration', value)
                                }),
                                element.createElement(
                                    Button,
                                    {
                                        isDestructive: true,
                                        variant: 'secondary',
                                        onClick: () => removeTrack(index)
                                    },
                                    __('Supprimer cet extrait', 'efsvp')
                                )
                            )
                        ),
                        element.createElement(
                            Button,
                            {
                                variant: 'primary',
                                onClick: addTrack
                            },
                            __('Ajouter un extrait audio', 'efsvp')
                        )
                    )
                ),
                element.createElement(
                    'div',
                    { className: 'efsvp-audio-bento-editor' },
                    element.createElement(
                        'div',
                        { className: 'efsvp-audio-bento-editor__header' },
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
                        { className: 'efsvp-audio-bento-editor__playlist' },
                        playlists.length === 0 &&
                            element.createElement(
                                'p',
                                { className: 'efsvp-audio-bento-editor__empty' },
                                __('Ajoutez des extraits audio via le panneau latéral.', 'efsvp')
                            ),
                        playlists.map((track, index) =>
                            element.createElement(
                                'div',
                                { key: index, className: 'efsvp-audio-bento-editor__item' },
                                element.createElement(
                                    'strong',
                                    { className: 'efsvp-audio-bento-editor__item-title' },
                                    track.title || __('Titre de l’extrait', 'efsvp')
                                ),
                                element.createElement(
                                    'span',
                                    { className: 'efsvp-audio-bento-editor__item-meta' },
                                    [track.badge, track.client].filter(Boolean).join(' · ')
                                ),
                                track.duration &&
                                    element.createElement(
                                        'span',
                                        { className: 'efsvp-audio-bento-editor__item-duration' },
                                        track.duration
                                    )
                            )
                        )
                    )
                )
            );
        },
        save() {
            return null;
        }
    });
})(window.wp.blocks, window.wp.element, window.wp.components, window.wp.blockEditor || window.wp.editor, window.wp.i18n);
