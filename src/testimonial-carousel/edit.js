import { BlockControls, MediaUpload, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, Dashicon, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

import Slider from 'react-slick';

import { nanoid } from 'nanoid';
import Inspector from './Inspector';


export default function Edit({ attributes, setAttributes, clientId }) {
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
		testimonialItems,
		imagePosition,
		enableImage,
		alignment,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft
		
	} = attributes;

	const settings = {
		dots: slidesDotsShow,
		arrows: slidesArrowShow,
		slidesToShow: slidesToShow,
		autoplay: slidesAutoplay,
		slidesToScroll: 1,
		draggable: draggable,
		accessibility: false,
		autoplaySpeed: autoplaySpeed,
		infinite: infiniteLoop,
		speed: transitionSpeed,
		pauseOnHover: pauseOnHover,
		prevArrow: <button type="button"><span class="dashicons dashicons-arrow-left-alt"></span></button>,
        nextArrow: <button type="button"><span class="dashicons dashicons-arrow-right-alt"></span></button>,
		
	};

	const blockProps = useBlockProps();

	const alignmentStyle = {
		textAlign: alignment,
		paddingTop: paddingTop,
		paddingRight: paddingRight,
		paddingBottom: paddingBottom,
		paddingLeft: paddingLeft
	}

	return (
		<div {...blockProps}>
			
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton>
						<Button
							onClick={() => {
								const newItems = [...testimonialItems]
								newItems.push({
									id: nanoid(),
									authorText: 'John Doe',
									companyName: 'Company Name',
									descText: 'I have been working with these guys for years now! With lots of hard work and timely communication, they made sure they delivered the best to me. Highly recommended!',
									image: ''

								});
								setAttributes({
									testimonialItems: newItems
								})
							}}
						>
							{ __( 'Add Item', 'testimonial-carousel-block' ) }
						</Button>
						
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			
			<Slider { ...settings }>
				{ testimonialItems?.map( ( testimonial, index ) => (
					<div className='testimonial-item__wrap' key={testimonial.id}>
						<div className='testimonial-item__content' style={ alignmentStyle }>

							<Button
								showTooltip={ true }
								tooltipPosition="top"
								label={ __( 'Delete', 'testimonial-carousel-block' ) }
								variant="primary"
								icon={ <Dashicon icon="trash" /> }
								onClick={ () => {
									const deleteFaqs = testimonialItems.filter(
										( ele ) => ele.id !== testimonial.id
									);

									setAttributes( {
										testimonialItems: [ ...deleteFaqs ],
									} );
								} }
							/>
							
							<RichText 
								value={ testimonial.descText }
								onChange={(value) =>{
									const newItems = [...testimonialItems]
									newItems[index].descText = value
								}}
								placeholder="Description"
								tagName='p'
							/>
							
							<div className='testimonial-footer'>

								{
									imagePosition === 'left' && enableImage && (
										<MediaUpload
											onSelect={ (value) => {
												const newItems = [...testimonialItems]
												newItems[index].image = value
												setAttributes({
													testimonialItems: newItems
												})
											} }
											multiple={false}
											render={({ open }) => (
												<div className='author-image'>
													{
														testimonial.image.url ? (
															<>
																<img onClick={open} src={testimonial.image.url} atl={testimonial.image.title} width="80"/>
																<Dashicon icon="edit" />
															</>
														) : (
															<div className='default-image' onClick={open}>
																<Dashicon icon="plus-alt" />
															</div>
														)
													}
												</div>
											)}
										/>
									)
								}
								
								<div className='author-info'>
									<RichText 
										value={ testimonial.authorText }
										onChange={(value) =>{
											const newItems = [...testimonialItems]
											newItems[index].authorText = value
										}}
										placeholder="Author"
										tagName='h4'
									/>

									<RichText 
										value={ testimonial.companyName }
										onChange={(value) =>{
											const newItems = [...testimonialItems]
											newItems[index].companyName = value
										}}
										placeholder="Designation"
										tagName='h5'
									/>
								</div>
								{
									imagePosition === 'right' && enableImage && (
										<MediaUpload
											onSelect={ (value) => {
												const newItems = [...testimonialItems]
												newItems[index].image = value
												setAttributes({
													testimonialItems: newItems
												})
											} }
											multiple={false}
											render={({ open }) => (
												<div className='author-image'>
													{
														testimonial.image.url ? (
															<>
																<img onClick={open} src={testimonial.image.url} atl={testimonial.image.title} width="80"/>
																<Dashicon icon="edit" />
															</>
														) : (
															<div className='default-image' onClick={open}>
																<Dashicon icon="plus-alt" />
															</div>
														)
													}
												</div>
											)}
										/>
									)
								}
							</div>
						</div>
					</div>
				) ) }
			</Slider>

		</div>
	);
}
