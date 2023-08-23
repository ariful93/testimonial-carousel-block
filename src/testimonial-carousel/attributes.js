const attributes = {
    testimonialItems: {
        type: "array",
        default: [
            {
                id: 1,
                descText: 'I have been working with these guys for years now! With lots of hard work and timely communication, they made sure they delivered the best to me. Highly recommended!',
                authorText: 'John Doe',
                companyName: 'Company Name',
                image: '',
                
            }
        ]
    },
    slidesToShow: {
        type: 'number',
        default: 1
    },
    slidesArrowShow: {
        type: 'boolean',
        default: false
    },
    slidesDotsShow: {
        type: 'boolean',
        default: true
    },
    slidesAutoplay: {
        type: 'boolean',
        default: true
    },
    pauseOnHover: {
		type: 'boolean',
		default: true,
	},
	infiniteLoop: {
		type: 'boolean',
		default: true,
	},
    draggable: {
		type: 'boolean',
		default: false,
	},
	transitionSpeed: {
		type: 'number',
		default: 500,
	},
	autoplaySpeed: {
		type: 'number',
		default: 2000,
	},
    imagePosition: {
        type: 'string',
        default: 'left'
    },
    enableImage: {
        type: 'boolean',
        default: true
    },
    alignment: {
        type: 'string',
        default: 'center'
    },
    paddingTop: {
		type: 'number',
		default: 0,
	},
    paddingRight: {
		type: 'number',
		default: 0,
	},
    paddingBottom: {
		type: 'number',
		default: 0,
	},
    paddingLeft: {
		type: 'number',
		default: 0,
	},
    
};

export default attributes;