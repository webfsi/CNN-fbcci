import gsap from 'gsap';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
import lottie from "lottie-web";

// animation article hero box
function animArticleHero() {

	let easeHub = 'Power2.easeInOut';

	const articleAnimBox = document.querySelector('[data-anim-hero-article]');
	if (!articleAnimBox) return;
	const boxLogo = articleAnimBox.querySelector('.section-hero_logos'),
		boxName = articleAnimBox.querySelector('.section-hero_name'),
		boxTt = articleAnimBox.querySelector('.section-hero_tt'),
		boxIc = articleAnimBox.querySelector('.section-hero_icon');

	function animHero(el, yStart, duration, delay) {
		gsap.fromTo(el, {
			y: yStart,
			opacity: 0
		}, {
			opacity: 1,
			y: 0,
			duration: duration,
			delay: delay,
			ease: easeHub,
		});
	}

	if (!boxLogo) return;
	animHero(boxLogo, -200, 0.5, 0.7);

	if (!boxName) return;
	animHero(boxName, 100, 1, 0.5);

	if (!boxTt) return;
	animHero(boxTt, 200, 1, 0.5);

	if (!boxIc) return;
	animHero(boxIc, 200, 1, 0.5);
}
// end animation article hero box

function articleAnimations() {

	const animFadeY = document.querySelectorAll('[data-anim-fadey]'),
		animFadeYLast = document.querySelectorAll('[data-anim-fadey-last]'),
		animFadeYFirst = document.querySelectorAll('[data-anim-fadey-first]'),
		animFadeYL = document.querySelectorAll('[data-anim-fadeyl]'),
		paralaxImgFull = document.querySelectorAll('[data-full-img-paralax]'),
		paralaxContainer = document.querySelectorAll('[data-paralax-container]');

	const animDuration = 1,
		animToggleActions = 'play none none none',
		animStart = 'top bottom-=100px',
		animStartFirst = 'top bottom-=200px',
		animStartLast = 'top bottom',
		animEnd = 'top top',
		animHeight = 70;


	// defaults setings from ScrollTrigger
	ScrollTrigger.defaults({
		scroller: '[data-scroll-container]',
	});
	// end/ defaults setings from ScrollTrigger

	// function from animation paralax
	function animParalax(yStart, yEnd, elContainer, elAnim) {
		gsap
			.timeline({
				scrollTrigger: {
					trigger: elContainer,
					start: 'top bottom',
					end: 'bottom top',
					scrub: 1,
				},
			})
			.fromTo(elAnim, {
				y: yStart,
				opacity: 1,
			}, {
				y: yEnd,
				opacity: 1,
				ease: 'none',
			});
	}
	// end/ function from animation paralax

	// animation paralax
	paralaxContainer.forEach((el) => {
		// top paralax
		const paralaxTop = el.querySelectorAll('[data-anim-paralaxT]');
		for (let i = 0; i < paralaxTop.length; i++) {
			const element = paralaxTop[i];
			animParalax(0, -200, el, element);
		}

		// top paralax
		const paralaxBt = el.querySelectorAll('[data-anim-paralaxB]');
		for (let i = 0; i < paralaxBt.length; i++) {
			const element = paralaxBt[i];
			animParalax(0, 200, el, element);
		}

		// both paralax
		const paralaxBotTop = el.querySelectorAll('[data-anim-paralaxBT]');
		for (let i = 0; i < paralaxBotTop.length; i++) {
			const element = paralaxBotTop[i];
			animParalax(100, -100, el, element);
		}
	});

	paralaxImgFull.forEach(el => {
		const img = el.querySelector('img');
		// let h = img.scrollHeight;
		// const box = el.querySelector('.box-full-img_inner');
		// let hB = box.clientHeight;
		// let offset = h - hB;
		animParalax(0, -100, el, img);
	});
	// end/ animation paralax

	// function from animation fade in up
	function animFadeUp(yStart, el) {
		gsap
			.timeline({
				scrollTrigger: {
					trigger: el,
					toggleActions: animToggleActions,
					start: animStart,
					end: animEnd,
				},
			})
			.fromTo(el, {
				y: yStart,
				opacity: 0,
			}, {
				y: 0,
				opacity: 1,
				duration: animDuration,
				delay: el.dataset.animFadey,
			});
	}
	// end/ function from animation fade in up

	// function from animation fade in up
	function animFadeUpLast(yStart, el) {
		gsap
			.timeline({
				scrollTrigger: {
					trigger: el,
					toggleActions: animToggleActions,
					start: animStartLast,
					end: animEnd,
				},
			})
			.fromTo(el, {
				y: yStart,
				opacity: 0,
			}, {
				y: 0,
				opacity: 1,
				duration: animDuration,
				delay: el.dataset.animFadey,
			});
	}
	function animFadeUpFirst(yStart, el) {
		gsap
			.timeline({
				scrollTrigger: {
					trigger: el,
					toggleActions: animToggleActions,
					start: animStartFirst,
					end: animEnd,
				},
			})
			.fromTo(el, {
				y: yStart,
				opacity: 0,
			}, {
				y: 0,
				opacity: 1,
				duration: animDuration,
				delay: el.dataset.animFadey,
			});
	}
	// end/ function from animation fade in up

	// animation fade in up
	animFadeYFirst.forEach((animFY) => {
		animFadeUpFirst(animHeight, animFY);
	});
	// end/ animation fade in up

	// animation fade in up
	animFadeY.forEach((animFY) => {
		animFadeUp(animHeight, animFY);
	});
	// end/ animation fade in up

	// animation fade in up
	animFadeYLast.forEach((animFY) => {
		animFadeUpLast(animHeight, animFY);
	});
	// end/ animation fade in up


	// animation fade in up long
	animFadeYL.forEach((animFY) => {
		animFadeUp(140, animFY);
	});
	// end/ animation fade in up long


	// Init Lottie from article
	function lottieInit(el, src) {
		lottie.loadAnimation({
			container: el,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: src,
		});
	}

	let srcTrain = '../json/train/AF1-1-Train.json',
		srcFabric = '../json/fabric/AF1-3.json',
		srcWindwill = '../json/Windmill/AF1-1-Windmill.json';

	let lottieInitNoLoopStart;
	function lottieInitNoLoop(el, src) {
		lottieInitNoLoopStart = lottie.loadAnimation({
			container: el,
			renderer: 'svg',
			loop: false,
			autoplay: false,
			path: src,
		});
	}
	function lottieInitOnLoop(el, src) {
		lottie.loadAnimation({
			container: el,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: src,
		});
	}

	const $lottieElectroOne = document.querySelectorAll('[data-lottie-train]');
	$lottieElectroOne.forEach(el => {
		if (!el.classList.contains('is-init')) {
			el.classList.add('is-init');
			lottieInit(el, srcTrain);
		}
	});

	const $lottieElectroTwo = document.querySelectorAll('[data-lottie-windwill]');
	$lottieElectroTwo.forEach(el => {
		if (!el.classList.contains('is-init')) {
			el.classList.add('is-init');
			lottieInit(el, srcWindwill);
		}
	});

	const lottieElements = document.querySelectorAll('[data-lottie-element]');
	lottieElements.forEach(el => {
		if (!el.classList.contains('is-init')) {
			el.classList.add('is-init');
			lottieInit(el, el.getAttribute('data-lottie-src'));
		}
	});

	const lottieFabric = document.querySelectorAll('[data-lottie-fabric]');
	lottieFabric.forEach(el => {
		if (!el.classList.contains('is-init')) {
			el.classList.add('is-init')
			lottieInitOnLoop(el, srcFabric);
		}
		// lottieInitNoLoopStart.stop();

		// ScrollTrigger.create({
		// 	trigger: el,
		// 	start: 'center bottom',
		// 	end: 'center top',
		// 	markers: true,
		// 	// scroller: '[data-scroll-container]',
		// 	onEnter: () => {
		// 		lottieInitNoLoopStart.play();
		// 	}
		// });
	});
	// end/ Init Lottie from article


	const fullArticle = document.querySelectorAll('.article_wrapp')
	fullArticle.forEach(el => {
		let h = document.documentElement.clientHeight;
		// let scrollHeight = gsap.utils.normalize(0, 1, 0, el.scrollHeight)(1);
		let scrollHeight = el.offsetHeight;
		let distanceToBottom = scrollHeight - window.innerHeight;
		setTimeout(() => {
			h = document.documentElement.clientHeight;
			// let scrollHeight = gsap.utils.normalize(0, 1, 0, el.scrollHeight)(1);
			scrollHeight = el.offsetHeight;
			distanceToBottom = scrollHeight - window.innerHeight;
			// console.log(scrollHeight);
			// console.log(window.innerHeight);
			// console.log(distanceToBottom);

			ScrollTrigger.create({
				element: el,
				start: "top top+=1px",
				// end: `bottom-=${h}px bottom`,
				end: distanceToBottom,
				// markers: true,
				onEnter: function() {
					if (!el.closest('.article').classList.contains('_is-scroll-top')) {
						el.closest('.article').classList.add('_is-scroll-top');
					}
					if (el.closest('.article').classList.contains('_is-scroll-bottom')) {
						el.closest('.article').classList.remove('_is-scroll-bottom');
					}
				},
				// onEnterBack: function() {
				// 	// console.log("onEnterBack startMain");
				// 	// if (!el.closest('.article').classList.contains('_is-scroll-top')) {
				// 	// 	el.closest('.article').classList.add('_is-scroll-top');
				// 	// }
				// },
				onLeave: function() {
					// console.log("onLeave startMain");

					if (!el.closest('.article').classList.contains('_is-scroll-bottom')) {
						el.closest('.article').classList.add('_is-scroll-bottom');
					}
					if (el.closest('.article').classList.contains('_is-scroll-top')) {
						el.closest('.article').classList.remove('_is-scroll-top');
					}
				},
				onLeaveBack: function() {
					// console.log("onLeaveBack startMain");
					if (el.closest('.article').classList.contains('_is-scroll-bottom')) {
						el.closest('.article').classList.remove('_is-scroll-bottom');
					}
					if (el.closest('.article').classList.contains('_is-scroll-top')) {
						el.closest('.article').classList.remove('_is-scroll-top');
					}
				},
			})
			ScrollTrigger.create({
				element: el,
				start: "top+=1px top+=1px",
				end: distanceToBottom,
				onEnter: function() {
					// console.log("onEnter twoMain");
					if (el.closest('.article').classList.contains('_is-scroll-top')) {
						el.closest('.article').classList.remove('_is-scroll-top');
					}
					if (el.closest('.article').classList.contains('_is-scroll-bottom')) {
						el.closest('.article').classList.remove('_is-scroll-bottom');
					}
				},
				onEnterBack: function() {
					// console.log("onEnterBack twoMain");
					// if (!el.closest('.article').classList.contains('_is-scroll-top')) {
					// 	el.closest('.article').classList.add('_is-scroll-top');
					// }
					if (el.closest('.article').classList.contains('_is-scroll-bottom')) {
						el.closest('.article').classList.remove('_is-scroll-bottom');
					}
					if (el.closest('.article').classList.contains('_is-scroll-top')) {
						el.closest('.article').classList.remove('_is-scroll-top');
					}
				},
				// onLeave: function() {
				// 	// console.log("onLeave twoMain");
				// 	// el.closest('.article').classList.add('_is-scroll-bottom');
				// },
				onLeaveBack: function() {
					// console.log("onLeaveBack twoMain");
					// if (el.closest('.article').classList.contains('_is-scroll-bottom')) {
					// 	el.closest('.article').classList.remove('_is-scroll-bottom');
					// }
					if (!el.closest('.article').classList.contains('_is-scroll-top')) {
						el.closest('.article').classList.add('_is-scroll-top');
					}
					if (el.closest('.article').classList.contains('_is-scroll-bottom')) {
						el.closest('.article').classList.remove('_is-scroll-bottom');
					}
				},
			})
		}, 1000);
	});
}

export {
	articleAnimations, animArticleHero
}
