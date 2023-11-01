import domReady from '@wordpress/dom-ready';
import { createRoot, render } from '@wordpress/element';
import { Icon, chevronLeft, chevronRight } from '@wordpress/icons';
import Slider from 'react-slick';

const App = ( { attributes } ) => {
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
    } =
		attributes;

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
		prevArrow: <Icon icon={ chevronLeft } />,
        nextArrow: <Icon icon={ chevronRight } />,
		
	};

	const alignmentStyle = {
		textAlign: alignment,
		paddingTop: paddingTop,
		paddingRight: paddingRight,
		paddingBottom: paddingBottom,
		paddingLeft: paddingLeft
	}

	return (
		<Slider { ...settings }>
			{ testimonialItems &&
				testimonialItems?.map( ( testimonial, index ) => (
					<div className='testimonial-item__wrap' key={index}>
						<div className='testimonial-item__content' style={ alignmentStyle }>
							<div className='test-desc'>
								<p>{testimonial.descText}</p>
							</div>
							<div className='testimonial-footer'>
								{
									imagePosition === 'left' && enableImage && (
										<div className='author-image'>
											{
												testimonial.image.url ? (
													<img src={testimonial.image.url} atl={testimonial.image.title} width="80"/>
												) : (
													<div className='default-image'></div>
												)
											}
										</div>
									)
								}
								<div className='author-info'>
									{
										testimonial.authorText && (
											<h4>{testimonial.authorText}</h4>
										)
									}
									{
										testimonial.companyName && (
											<h5>{testimonial.companyName}</h5>
										)
									}
								</div>
								{
									imagePosition === 'right' && enableImage && (
										<div className='author-image'>
											{
												testimonial.image.url ? (
													<img src={testimonial.image.url} atl={testimonial.image.title} width="80"/>
												) : (
													<div className='default-image'></div>
												)
											}
										</div>
									)
								}
							</div>
						</div>
                    </div>
				) ) }
		</Slider>
	);
};

domReady( () => {
	const elements = document.querySelectorAll(
		'.wp-block-wpfound-testimonial-carousel'
	);
	const elementsArr = Array.from( elements );

	elementsArr.forEach( ( item ) => {
		if ( createRoot ) {
			createRoot( item ).render(
				<App
					attributes={ JSON.parse(
						item.getAttribute( 'data-attributes' )
					) }
				/>
			);
		} else {
			render(
				<App
					attributes={ JSON.parse(
						item.getAttribute( 'data-attributes' )
					) }
				/>,
				item
			);
		}
	} );

} );
