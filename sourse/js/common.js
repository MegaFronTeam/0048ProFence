"use strict";

const $ = jQuery;


function eventHandler() {

	JSCCommon.init()


	function whenResize() {
		JSCCommon.setFixedNav();
	}

	window.addEventListener('scroll', () => {
		JSCCommon.setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});

	const swiper4 = new Swiper('.sBanners__slider--js', { // если не используешь методы swiper  - можно обращаться без нее к Swiper
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});

	
	document.addEventListener('click', (event) => {
		let categoryDropdownTargetBtn = event.target.closest('.top-nav__catalog');
		let categoryDropdownTargetBackBtn = event.target.closest('.category-dropdown__back');
		let categoryDropdownTarget = event.target.closest('.category-dropdown');
		let categoryBtnTarget = event.target.closest('.category-dropdown__category');

		let categoryDropdownBtn = document.querySelector('.top-nav__catalog');
		let categoryDropdown = document.querySelector('.category-dropdown');

		if (categoryDropdownTargetBtn) {
			categoryDropdownBtn.classList.toggle('active');
			if (window.matchMedia('(min-width: 992px)').matches) {
				$('body').toggleClass('fixed-catalog');
				$(categoryDropdown).fadeToggle();
			} else {
				categoryDropdown.classList.toggle('active');
			}
		}
		if (categoryDropdownTargetBackBtn) {
			categoryDropdownBtn.classList.remove('active');
			if (window.matchMedia('(min-width: 992px)').matches) {
				$(categoryDropdown).fadeOut();
			} else {
				categoryDropdown.classList.remove('active');
			}
		}
		if (!categoryDropdownTargetBtn && !categoryDropdownTarget) {
			categoryDropdownBtn.classList.remove('active');
			categoryDropdownBtn.classList.remove('active');
			$(categoryDropdown).fadeOut();
			if (window.matchMedia('(min-width: 992px)').matches) {
				$('body').removeClass('fixed-catalog');
			}
		}
		if (categoryBtnTarget) {
			let categoryDropdowns = document.querySelectorAll('.category-dropdown__item');
			for (const categoryDropdown of categoryDropdowns) {
				categoryDropdown.classList.remove('active');
			}
			categoryBtnTarget.closest('.category-dropdown__item').classList.add('active');
		}
	})

	window.addEventListener('resize', () => {
		if (window.matchMedia('(max-width: 992px)').matches) {
			$('body').removeClass('fixed-catalog');
			document.querySelector('.top-nav__catalog').classList.remove('active');
			$('.category-dropdown').fadeOut();
		};
	},
		{ passive: true },
	);

	document.addEventListener('click', function (event) {
		let scrollTopBtn = event.target.closest('.footer__scrollTop--js');
		if (scrollTopBtn) window.scrollTo(0, 0);
	});


	const sliderParents = document.querySelectorAll('.slider-wrapper');
	for (const sliderParent of sliderParents) {
		const autoSlider = new Swiper((sliderParent.querySelector('.slider-auto-js')), {
			slidesPerView: 'auto',
			spaceBetween: 12,
			watchOverflow: true,
			observer: true,
			observeSlideChildren: true,
			freeMode: {
				enabled: true,
				sticky: true,
				momentumVelocityRatio: 0.3
			},
			lazy: {
				loadPrevNext: true,
			},
			breakpoints: {
				768: {
					spaceBetween: 24
				}
			},
			scrollbar: {
        el: ".swiper-scrollbar",
      },
		});
	};

	const defSliders = document.querySelectorAll('.def-slider-js');
	if (defSliders.length > 0) {
		for (const defSlider of defSliders) {
			new Swiper((defSlider.querySelector('.swiper')), {
				slidesPerView: 'auto',
				loop: true,
				scrollbar: {
					el: defSlider.querySelector('.swiper-scrollbar'),
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});
		}
	}
	
	const gallerySliders = document.querySelector('.gallery-slider-js');
	if(gallerySliders) {
		new Swiper((gallerySliders.querySelector('.swiper')), {
			slidesPerView: 'auto',
			loop: true,
			centeredSlides: true,
			scrollbar: {
				el: gallerySliders.querySelector('.swiper-scrollbar'),
			},
		});
	}

	let showMoreBtns = document.querySelectorAll('.sAbout__show-more');
	let content = document.querySelectorAll('.sAbout__content');
	if(showMoreBtns.length > 0) {
		for (let i = 0; i < showMoreBtns.length; i++) {
			showMoreBtns[i].addEventListener('click', () => {
				$(showMoreBtns[i]).slideUp();
				$(content[i]).find('p:hidden').slideDown()
				$(content[i]).find('span:hidden').slideDown()
			});
		}
	}

	$('.plus-js').click(function () {
		const input = $(this).closest(".spinner--js").find("input");
		input.val(+input.val() + 1);
	});

	$('.minus-js').click(function () {
		const input = $(this).closest(".spinner--js").find("input");
		if (input.val() > 0) {
			input.val(+input.val() - 1);
		}
	});
	
	$('.sticky-js').hcSticky({
    stickTo: $('.sticky-content-js'),
		top: 128 + 40,
		mobileFirst: true,
		disable: true,
		responsive: {
			992: {
				disable: false,
			},
		},
  });

	document.addEventListener('click', (event) => {
		let clearInputBtnTarget = event.target.closest('.btn-close-js');
		if(clearInputBtnTarget) {
			$('.btn-close-js').parent().find('.input-search').val("");
			$('.btn-close-js').parent().find('.input-search').focus();
		}
	})

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }