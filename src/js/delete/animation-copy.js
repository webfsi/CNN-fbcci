export default (gsap, lottie, ScrollTrigger) => {

	const animFadeY = document.querySelectorAll('[data-anim-fadey]'),
		animFadeYL = document.querySelectorAll('[data-anim-fadeyl]'),
		paralaxContainer = document.querySelectorAll('[data-paralax-container]');

	const animDuration = 1,
		animToggleActions = 'play none none none',
		animStart = 'top bottom-=100px',
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

	// animation fade in up
	animFadeY.forEach((animFY) => {
		animFadeUp(animHeight, animFY);
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
		srcFabric = '../json/FBCCI-AF1-2.json',
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

	const $lottieElectroOne = document.querySelectorAll('[data-lottie-train]');
	$lottieElectroOne.forEach(el => {
		lottieInit(el, srcTrain);
	});

	const $lottieElectroTwo = document.querySelectorAll('[data-lottie-windwill]');
	$lottieElectroTwo.forEach(el => {
		lottieInit(el, srcWindwill);
	});


	const lottieFabric = document.querySelectorAll('[data-lottie-fabric]');
	lottieFabric.forEach(el => {
		lottieInitNoLoop(el, srcFabric);
		lottieInitNoLoopStart.stop();

		ScrollTrigger.create({
			trigger: el,
			start: 'bottom bottom',
			end: 'top top',
			// scroller: '[data-scroll-container]',
			onEnter: () => {
				lottieInitNoLoopStart.play();
			}
		});
	});
	// end/ Init Lottie from article
}
