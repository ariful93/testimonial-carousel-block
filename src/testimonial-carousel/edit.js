import { MediaUpload, RichText, useBlockProps } from '@wordpress/block-editor';
import { Dashicon } from '@wordpress/components';
import './editor.scss';

import Slider from 'react-slick';

import Inspector from './Inspector';


export default function Edit({ attributes, setAttributes }) {
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
		prevArrow: <button type="button"><Dashicon icon="arrow-left-alt2" /></button>,
        nextArrow: <button type="button"><Dashicon icon="arrow-right-alt2" /></button>,
		
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
			
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			
			<Slider { ...settings }>
				{ testimonialItems?.map( ( testimonial, index ) => (
					<div className='testimonial-item__wrap' key={testimonial.id}>
						<div className='testimonial-item__content' style={ alignmentStyle }>
							
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
