import { AlignmentToolbar, BlockControls, InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl, SelectControl, ToggleControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { nanoid } from 'nanoid';

const Inspector = ( { attributes, setAttributes } ) => {
	const {
        slidesToShow,
		slidesArrowShow, 
		slidesDotsShow,
		slidesAutoplay,
		pauseOnHover,
		infiniteLoop,
		transitionSpeed,
		autoplaySpeed,
		draggable,
		imagePosition,
		enableImage,
		alignment,
        paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
        testimonialItems,
        testimonial_number

	} = attributes;

	return (
        <>
            <BlockControls key="controls">
                <AlignmentToolbar
                    value={alignment}
                    onChange={ alignment => setAttributes( { alignment } ) }
                    controls={['left', 'center', 'right']}
                />
            </BlockControls>
            
            <InspectorControls>
                <PanelBody title={ __( 'General', 'testimonial-carousel-block' ) }>
                    <RangeControl
                        label={ __( 'Number of Testimonials', 'testimonial-carousel-block' ) }
                        value={ testimonial_number }

                        onChange={ ( newNumber ) => {
                            const cloneBlocks = [ ...testimonialItems ];
                            
                            if ( cloneBlocks.length < newNumber ) {
                                const numbers = Math.abs( newNumber - cloneBlocks.length );
                                for ( let i = 0; i < numbers; i++ ) {
                                    cloneBlocks.push( {
                                        id: nanoid(),
                                        authorText: 'John Doe',
                                        companyName: 'Company Name',
                                        descText: 'I have been working with these guys for years now! With lots of hard work and timely communication, they made sure they delivered the best to me. Highly recommended!',
                                        image: ''
                                    } );
                                }
                                setAttributes( {
                                    testimonialItems: cloneBlocks,
                                } );
                            } else {
                                const numbers = Math.abs( newNumber - cloneBlocks.length );
                                const data_new = cloneBlocks;
                                for ( let i = 0; i < numbers; i++ ) {
                                    data_new.pop();
                                }
                                setAttributes( {
                                    testimonialItems: data_new,
                                } );
                            }
                            setAttributes( {
                                testimonial_number: newNumber,
                            } );
                        } }
                        min={ 1 }
                        max={ 50 }
                    />

                    <RangeControl
                        label={ __( 'Number of Columns', 'testimonial-carousel-block' ) }
                        min={ 1 }
                        max={ 10 }
                        value={ slidesToShow }
                        onChange={ ( value ) =>
                            setAttributes( {
                                slidesToShow: value,
                            } )
                        }
                    />
                    
                </PanelBody>
                <PanelBody title={ __( 'Carousel Settings', 'testimonial-carousel-block' ) } initialOpen={false}>
                    <ToggleControl
                        className='wpf-component_toggle-control'
                        label={ __( 'Show Arrows', 'testimonial-carousel-block' ) }
                        checked={ slidesArrowShow }
                        onChange={ () => {
                            setAttributes( {
                                slidesArrowShow: ! slidesArrowShow,
                            } );
                        } }
                    />

                    <ToggleControl
                        className='wpf-component_toggle-control'
                        label={ __( 'Show Dots', 'testimonial-carousel-block' ) }
                        checked={ slidesDotsShow }
                        onChange={ () => {
                            setAttributes( {
                                slidesDotsShow: ! slidesDotsShow,
                            } );
                        } }
                    />
                    <ToggleControl
                        className='wpf-component_toggle-control'
                        label={ __( 'Autoplay', 'testimonial-carousel-block' ) }
                        checked={ slidesAutoplay }
                        onChange={ () => {
                            setAttributes( {
                                slidesAutoplay: ! slidesAutoplay,
                            } );
                        } }
                    />
                    {
                        slidesAutoplay && (
                            <RangeControl
                                label={ __( 'Autoplay Speed', 'testimonial-carousel-block' ) }
                                min={ 100 }
                                max={ 20000 }
                                value={ autoplaySpeed }
                                onChange={ ( value ) =>
                                    setAttributes( {
                                        autoplaySpeed: value,
                                    } )
                                }
                            />
                        )
                    }
                   
                    <ToggleControl
                        className='wpf-component_toggle-control'
                        label={ __( 'Infinite Loop', 'testimonial-carousel-block' ) }
                        checked={ infiniteLoop }
                        onChange={ () => {
                            setAttributes( {
                                infiniteLoop: ! infiniteLoop,
                            } );
                        } }
                    />
                    <RangeControl
                        label={ __( 'Transition Speed', 'testimonial-carousel-block' ) }
                        min={ 100 }
                        max={ 5000 }
                        value={ transitionSpeed }
                        onChange={ ( value ) =>
                            setAttributes( {
                                transitionSpeed: value,
                            } )
                        }
                    />
                    <ToggleControl
                        className='wpf-component_toggle-control'
                        label={ __( 'Pause On Hover', 'testimonial-carousel-block' ) }
                        checked={ pauseOnHover }
                        onChange={ () => {
                            setAttributes( {
                                pauseOnHover: ! pauseOnHover,
                            } );
                        } }
                    />
                    <ToggleControl
                        className='wpf-component_toggle-control'
                        label={ __( 'Draggable', 'testimonial-carousel-block' ) }
                        checked={ draggable }
                        onChange={ () => {
                            setAttributes( {
                                draggable: ! draggable,
                            } );
                        } }
                    />
                </PanelBody>
                <PanelBody title={ __( 'Image settings', 'testimonial-carousel-block' ) } initialOpen={false}>
                    <ToggleControl 
                        label={ __( 'Enable image', 'testimonial-carousel-block' ) }
                        checked={enableImage}
                        onChange={ enableImage => setAttributes( { enableImage } ) }
                    />
                    {
                        enableImage && (
                            <SelectControl 
                                label={ __( 'Image Position', 'testimonial-carousel-block' ) }
                                value={ imagePosition }
                                options={ [
                                    {
                                        label: __( 'Left', 'testimonial-carousel-block' ),
                                        value: 'left'
                                    },
                                    {
                                        label: __( 'Right', 'testimonial-carousel-block' ),
                                        value: 'right'
                                    },
                                    
                                ] }
                                onChange={ imagePosition => setAttributes( { imagePosition } ) }
                            />
                        )
                    }
                    
                </PanelBody>
                <PanelBody title={ __( 'Styles', 'testimonial-carousel-block' ) } initialOpen={false}>
                    <RangeControl
                        label={ __( 'Padding Top', 'testimonial-carousel-block' ) }
                        min={ 0 }
                        max={ 500 }
                        value={ paddingTop }
                        onChange={ ( value ) =>
                            setAttributes( {
                                paddingTop: value,
                            } )
                        }
                    />
                    <RangeControl
                        label={ __( 'Padding Right', 'testimonial-carousel-block' ) }
                        min={ 0 }
                        max={ 500 }
                        value={ paddingRight }
                        onChange={ ( value ) =>
                            setAttributes( {
                                paddingRight: value,
                            } )
                        }
                    />
                    <RangeControl
                        label={ __( 'Padding Bottom', 'testimonial-carousel-block' ) }
                        min={ 0 }
                        max={ 500 }
                        value={ paddingBottom }
                        onChange={ ( value ) =>
                            setAttributes( {
                                paddingBottom: value,
                            } )
                        }
                    />
                    <RangeControl
                        label={ __( 'Padding Left', 'testimonial-carousel-block' ) }
                        min={ 0 }
                        max={ 500 }
                        value={ paddingLeft }
                        onChange={ ( value ) =>
                            setAttributes( {
                                paddingLeft: value,
                            } )
                        }
                    />
                    
                </PanelBody>
            </InspectorControls>
        </>
	);
};

export default Inspector;
