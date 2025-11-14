( function ( wp ) {
  const { __, sprintf } = wp.i18n;
  const {
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    PanelColorSettings,
    useBlockProps,
  } = wp.blockEditor;
  const {
    PanelBody,
    TextControl,
    TextareaControl,
    ToggleControl,
    Button,
    RangeControl,
  } = wp.components;
  const { Fragment, useEffect } = wp.element;
  const { addFilter } = wp.hooks;
  const ServerSideRender = wp.serverSideRender;
  const UnitControl =
    wp.components?.UnitControl || wp.components?.__experimentalUnitControl;

  const DEFAULT_METRICS = [
    { value: '60+', label: __('Représentations', 'efsvp') },
    { value: '15+', label: __('Projets institutionnels', 'efsvp') },
    { value: '1200€', label: __('À partir de', 'efsvp') },
  ];

  const getMediaObject = ( media ) => {
    if ( ! media || ! media.url ) {
      return null;
    }

    return {
      id: media.id || null,
      url: media.url,
      alt: media.alt || media.title || '',
      mime: media.mime || media.mime_type || '',
    };
  };

  const HeroEdit = ( props ) => {
    const { attributes, setAttributes } = props;
    const {
      title,
      subtitle,
      description,
      backgroundImage,
      backgroundVideo,
      posterImage,
      ctaText,
      ctaUrl,
      enableOverlay,
      overlayColor,
      overlayOpacity,
      minHeight,
      showMetrics,
      metrics,
    } = attributes;

    useEffect( () => {
      if ( ! Array.isArray( metrics ) || metrics.length === 0 ) {
        setAttributes( { metrics: DEFAULT_METRICS } );
      }
    }, [] );

    const currentMetrics =
      Array.isArray( metrics ) && metrics.length > 0 ? metrics : DEFAULT_METRICS;

    const updateMetric = ( index, field, value ) => {
      const nextMetrics = currentMetrics.map( ( metric, metricIndex ) => {
        if ( metricIndex === index ) {
          return {
            ...metric,
            [ field ]: value,
          };
        }
        return metric;
      } );

      setAttributes( { metrics: nextMetrics } );
    };

    const addMetric = () => {
      setAttributes( {
        metrics: [
          ...currentMetrics,
          {
            value: '',
            label: '',
          },
        ],
      } );
    };

    const removeMetric = ( index ) => {
      const nextMetrics = currentMetrics.filter( ( _, metricIndex ) => metricIndex !== index );
      setAttributes( { metrics: nextMetrics } );
    };

    const blockProps = useBlockProps( {
      className: 'efsvp-hero-editor-preview',
    } );

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={ __( 'Contenu', 'efsvp' ) } initialOpen={ true }>
            <TextControl
              label={ __( 'Titre', 'efsvp' ) }
              value={ title }
              onChange={ ( value ) => setAttributes( { title: value } ) }
            />
            <TextControl
              label={ __( 'Sous-titre', 'efsvp' ) }
              value={ subtitle }
              onChange={ ( value ) => setAttributes( { subtitle: value } ) }
            />
            <TextareaControl
              label={ __( 'Description', 'efsvp' ) }
              value={ description }
              onChange={ ( value ) => setAttributes( { description: value } ) }
            />
            <TextControl
              label={ __( 'Texte du bouton', 'efsvp' ) }
              value={ ctaText }
              onChange={ ( value ) => setAttributes( { ctaText: value } ) }
            />
            <TextControl
              label={ __( 'Lien du bouton', 'efsvp' ) }
              value={ ctaUrl }
              onChange={ ( value ) => setAttributes( { ctaUrl: value } ) }
            />
          </PanelBody>

          <PanelBody title={ __( 'Médias de fond', 'efsvp' ) } initialOpen={ false }>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={ ( media ) =>
                  setAttributes( { backgroundImage: getMediaObject( media ) } )
                }
                allowedTypes={ [ 'image' ] }
                value={ backgroundImage?.id }
                render={ ( { open } ) => (
                  <div className="efsvp-hero-media-control">
                    <Button variant="secondary" onClick={ open }>
                      { backgroundImage?.url
                        ? __( 'Changer l\'image', 'efsvp' )
                        : __( 'Choisir une image', 'efsvp' ) }
                    </Button>
                    { backgroundImage?.url && (
                      <Button
                        variant="link"
                        isDestructive
                        onClick={ () => setAttributes( { backgroundImage: null } ) }
                      >
                        { __( 'Supprimer', 'efsvp' ) }
                      </Button>
                    ) }
                  </div>
                ) }
              />
            </MediaUploadCheck>

            <MediaUploadCheck>
              <MediaUpload
                onSelect={ ( media ) =>
                  setAttributes( { backgroundVideo: getMediaObject( media ) } )
                }
                allowedTypes={ [ 'video' ] }
                value={ backgroundVideo?.id }
                render={ ( { open } ) => (
                  <div className="efsvp-hero-media-control">
                    <Button variant="secondary" onClick={ open }>
                      { backgroundVideo?.url
                        ? __( 'Changer la vidéo', 'efsvp' )
                        : __( 'Choisir une vidéo', 'efsvp' ) }
                    </Button>
                    { backgroundVideo?.url && (
                      <Button
                        variant="link"
                        isDestructive
                        onClick={ () => setAttributes( { backgroundVideo: null } ) }
                      >
                        { __( 'Supprimer', 'efsvp' ) }
                      </Button>
                    ) }
                  </div>
                ) }
              />
            </MediaUploadCheck>

            <MediaUploadCheck>
              <MediaUpload
                onSelect={ ( media ) =>
                  setAttributes( { posterImage: getMediaObject( media ) } )
                }
                allowedTypes={ [ 'image' ] }
                value={ posterImage?.id }
                render={ ( { open } ) => (
                  <div className="efsvp-hero-media-control">
                    <Button variant="secondary" onClick={ open }>
                      { posterImage?.url
                        ? __( 'Changer le poster vidéo', 'efsvp' )
                        : __( 'Choisir un poster', 'efsvp' ) }
                    </Button>
                    { posterImage?.url && (
                      <Button
                        variant="link"
                        isDestructive
                        onClick={ () => setAttributes( { posterImage: null } ) }
                      >
                        { __( 'Supprimer', 'efsvp' ) }
                      </Button>
                    ) }
                  </div>
                ) }
              />
            </MediaUploadCheck>
          </PanelBody>

          <PanelBody title={ __( 'Overlay & mise en page', 'efsvp' ) } initialOpen={ false }>
            <ToggleControl
              label={ __( 'Afficher l\'overlay', 'efsvp' ) }
              checked={ enableOverlay }
              onChange={ ( value ) => setAttributes( { enableOverlay: value } ) }
            />
            <RangeControl
              label={ __( 'Opacité de l\'overlay', 'efsvp' ) }
              value={ enableOverlay ? overlayOpacity : 0 }
              onChange={ ( value ) => setAttributes( { overlayOpacity: value } ) }
              min={ 0 }
              max={ 0.95 }
              step={ 0.05 }
              disabled={ ! enableOverlay }
            />
            <PanelColorSettings
              title={ __( 'Couleur de l\'overlay', 'efsvp' ) }
              colorSettings={ [
                {
                  value: overlayColor,
                  onChange: ( value ) =>
                    setAttributes( { overlayColor: value || '#0f141a' } ),
                  label: __( 'Couleur', 'efsvp' ),
                  disableCustomColors: false,
                },
              ] }
              disableCustomColors={ false }
            />
            { UnitControl && (
              <UnitControl
                label={ __( 'Hauteur minimale', 'efsvp' ) }
                value={ minHeight }
                onChange={ ( value ) => setAttributes( { minHeight: value } ) }
                units={ [
                  { value: 'vh', label: 'vh' },
                  { value: 'px', label: 'px' },
                  { value: '%', label: '%' },
                ] }
              />
            ) }
          </PanelBody>

          <PanelBody title={ __( 'Métriques', 'efsvp' ) } initialOpen={ false }>
            <ToggleControl
              label={ __( 'Afficher les métriques', 'efsvp' ) }
              checked={ showMetrics }
              onChange={ ( value ) => setAttributes( { showMetrics: value } ) }
            />

            { showMetrics && (
              <div className="efsvp-hero-metrics-controls">
                { currentMetrics.map( ( metric, index ) => (
                  <div className="efsvp-hero-metric" key={ `metric-${ index }` }>
                    <TextControl
                      label={ sprintf( __( 'Valeur %d', 'efsvp' ), index + 1 ) }
                      value={ metric?.value || '' }
                      onChange={ ( value ) =>
                        updateMetric( index, 'value', value )
                      }
                    />
                    <TextControl
                      label={ sprintf( __( 'Libellé %d', 'efsvp' ), index + 1 ) }
                      value={ metric?.label || '' }
                      onChange={ ( value ) =>
                        updateMetric( index, 'label', value )
                      }
                    />
                    { currentMetrics.length > 1 && (
                      <Button
                        variant="link"
                        isDestructive
                        onClick={ () => removeMetric( index ) }
                      >
                        { __( 'Supprimer', 'efsvp' ) }
                      </Button>
                    ) }
                  </div>
                ) ) }

                <Button variant="secondary" onClick={ addMetric }>
                  { __( 'Ajouter une métrique', 'efsvp' ) }
                </Button>
              </div>
            ) }
          </PanelBody>
        </InspectorControls>

        <div { ...blockProps }>
          <ServerSideRender block="efsvp/hero" attributes={ attributes } />
        </div>
      </Fragment>
    );
  };

  addFilter( 'blocks.registerBlockType', 'efsvp/hero-edit', ( settings, name ) => {
    if ( name !== 'efsvp/hero' ) {
      return settings;
    }

    return {
      ...settings,
      edit: HeroEdit,
    };
  } );
} )( window.wp );
