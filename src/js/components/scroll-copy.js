
import articleAnimations from "./article-animation.js";

export default (lottie, gsap, ScrollTrigger, ScrollToPlugin, LocomotiveScroll, Wheel, $) => {
	// window.history.pushState({}, '', `/name/`);
	// Using Locomotive Scroll

	const lScroll = new LocomotiveScroll({
		el: document.querySelector('[data-scroll-container]'),
		smooth: true
	});

	lScroll.on('scroll', ScrollTrigger.update);

	ScrollTrigger.scrollerProxy('[data-scroll-container]', {
		scrollTop(value) {
			return arguments.length ? lScroll.scrollTo(value, 0, 0) : lScroll.scroll.instance.scroll.y;
		}, // we don't have to define a scrollLeft because we're only scrolling vertically.
		getBoundingClientRect() {
			return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
		}
	});

	ScrollTrigger.addEventListener('refresh', () => lScroll.update());

	ScrollTrigger.refresh();

	// end/ Using Locomotive Scroll

	// function ajaxArticle() {

	// 	fetch('../embracing-sustainability/index.html')
	// 		.then(function (response) {
	// 			return response.text();
	// 		})
	// 		.then((html) => {
	// 			var parser = new DOMParser();
	// 			var doc = parser.parseFromString(html, "text/html");

	// 			console.log(doc);
	// 			console.log(doc.querySelector("[data-scroll-container]"));

	// 			document.querySelector(
	// 				"[data-article-parse]"
	// 			).outerHTML = doc.querySelector("[data-article-parse]").outerHTML;

	// 	//init animations
	// 	//hide transition box
	// 		});
	// }

	// init Lottie

	// var lottieHubOne;

	const isHub = !$('.section-hero').length;
	const jsonPath = isHub ? '' : '../';

	var lottieHubOne;
	function lottieInit1(el, src) {
		lottieHubOne = lottie.loadAnimation({
			container: el,
			renderer: 'svg',
			loop: false,
			duration: 1,
			autoplay: false,
			path: src,
		});
	}
	const $lottieHubOne = document.querySelectorAll('[data-lottie-hub-one]');
	$lottieHubOne.forEach(el => {
		let src = jsonPath + 'json/HUB-A1.json';
		lottieInit1(el, src);
	});

	var lottieHubTwo;
	function lottieInit2(el, src) {
		lottieHubTwo = lottie.loadAnimation({
			container: el,
			renderer: 'svg',
			loop: false,
			autoplay: false,
			path: src,
		});
	}
	const $lottieHubTwo = document.querySelectorAll('[data-lottie-hub-two]');
	$lottieHubTwo.forEach(el => {
		let src = jsonPath + 'json/HUB-A2.json';
		lottieInit2(el, src);
	});


	// animation HUB function
	function animArticleHero() {

		const articleAnimBox = document.querySelector('[data-anim-hero-article]');
		if (!articleAnimBox) return;
		const boxLogo = articleAnimBox.querySelector('.section-hero_logos'),
			boxName = articleAnimBox.querySelector('.section-hero_name'),
			boxTt = articleAnimBox.querySelector('.section-hero_tt'),
			boxIc = articleAnimBox.querySelector('.section-hero_icon');
		// let transitionYHub = hubAnimBox.scrollHeight - findHub.offsetHeight;


		if (!boxLogo) return;
		gsap.fromTo(boxLogo, {
			y: -200,
			opacity: 0
		}, {
			opacity: 1,
			y: 0,
			duration: 0.5,
			delay: 0.7,
			ease: easeHub,
		});

		if (!boxName) return;
		gsap.fromTo(boxName, {
			y: 100,
			opacity: 0
		}, {
			opacity: 1,
			y: 0,
			duration: 1,
			delay: 0.5,
			ease: easeHub,
		});

		if (!boxTt) return;
		gsap.fromTo(boxTt, {
			y: 200,
			opacity: 0
		}, {
			opacity: 1,
			y: 0,
			duration: 1,
			delay: 0.5,
			ease: easeHub,
		});

		if (!boxIc) return;
		gsap.fromTo(boxIc, {
			y: 200,
			opacity: 0
		}, {
			opacity: 1,
			y: 0,
			duration: 1,
			delay: 0.5,
			ease: easeHub,
		});
	}
	// end animation HUB function

	// animation HUB function
	function animHubText(imgTo, imgEnd) {

		const hubAnimBox = findHub.querySelector('[data-hub-hero-one]');
		// let transitionYHub = hubAnimBox.scrollHeight - findHub.offsetHeight;

		if (!hubAnimBox) return;

		gsap.fromTo(hubAnimBox, {
			yPercent: imgTo,
		}, {
			yPercent: imgEnd,
			duration: 2,
			ease: easeHub,
		});
	}
	// end animation HUB function

	// animation HUB function
	function animHub(imgTo, circlTo, bgStart, bgEnd, durationImg) {

		const hubAnimBox = findHub.querySelector('.hero-hub_wrapp');
		const hubCircle = findHub.querySelector('.hero-hub_circle');
		// let transitionYHub = hubAnimBox.scrollHeight - findHub.offsetHeight;

		if (!hubAnimBox) return;

		gsap.to(hubAnimBox, {
			yPercent: imgTo,
			duration: durationImg,
			ease: easeHub,
		});
		gsap.fromTo(hubCircle, {
			backgroundColor: bgStart,
		}, {
			yPercent: circlTo,
			backgroundColor: bgEnd,
			duration: durationImg,
			ease: 'Power3.easeInOut',
		});
	}
	// end animation HUB function

	// scroll animation hub down
	function showNextHubScreen() {

		// const hubAnimBox = findHub.querySelector('.hero-hub_wrapp');
		// // console.log(hubAnimBox.scrollHeight - findHub.offsetHeight);
		// let transitionYHub = hubAnimBox.scrollHeight - findHub.offsetHeight;

		// animation hub
		let imgTo0 = -38.1,
			circlTo0 = 217.1,
			bgStart0 = '#C91609',
			bgEnd0 = '#068880',
			durationImg = 2;
		animHub(imgTo0, circlTo0, bgStart0, bgEnd0, durationImg);

		// change value step nav 0 to 1
		navStep++;

		//hub text anim
		let imgTo = 0,
			imgEnd = 40;
		animHubText(imgTo, imgEnd);

		// hub train 1
		if (document.querySelector('[data-lottie-hub-one]')) {
			lottieHubOne.setSpeed(2);
			lottieHubOne.setDirection(1);
			lottieHubOne.play();

			// hub train 2
			lottieHubTwo.setSpeed(0.5);
			lottieHubTwo.setDirection(1);
			lottieHubTwo.play();
		}



		// add active nav
		setTimeout(() => {
			navPoints();
		}, durationScroll * 1000 - 500);

		// close scroll
		setTimeout(() => {
			isScrolling = false;
			// lottieHubOne.stop();
		}, delayScroll);
	}
	// end/ scroll animation hub down

	// scroll animation hub up
	function closeNextHubScreen() {
		// if (!findHub) {
		// 	return;
		// }
		// const hubAnimBox = findHub.querySelector('.hero-hub_wrapp');

		let imgTo1 = 0,
			circlTo1 = 0,
			bgStart1 = '#068880',
			bgEnd1 = '#C91609',
			durationImg = 2;

		animHub(imgTo1, circlTo1, bgStart1, bgEnd1, durationImg);

		navStep--;
		navPoints();

		//hub text anim
		let imgTo = 80,
			imgEnd = 0;
		animHubText(imgTo, imgEnd);

		// hub train 1
		if (document.querySelector('[data-lottie-hub-one]')) {
			lottieHubOne.setSpeed(2);
			lottieHubOne.setDirection(-1);
			lottieHubOne.play();

			// hub train 2
			lottieHubTwo.setSpeed(1);
			lottieHubTwo.setDirection(-1);
			lottieHubTwo.play();
		}

		setTimeout(() => {
			step--;
			isScrolling = false;
			// lottieHubOne.stop();
			// heroHub = true;
		}, delayScroll);
	}
	// end/ scroll animation hub up

	function showArticle(url) {
		if (!findTransitionBox) return;

		findTransitionBox.classList.add('is-active');


		if (!document.body.classList.contains('article-open_one')) {
			document.body.classList.add('article-open_one')

			fetch('embracing-sustainability/index.html')
				.then(function (response) {
					return response.text();
				})
				.then((html) => {
					var parser = new DOMParser();
					var doc = parser.parseFromString(html, "text/html");

					// console.log(doc);
					// console.log(doc.querySelector("[data-scroll-container]"));

					document.querySelector(
						"[data-article-parse]"
					).outerHTML = doc.querySelector("[data-article-parse]").outerHTML;

					//hide transition box
					// lScroll.update();
					// ScrollTrigger.update();
					// ScrollTrigger.refresh();


					setTimeout(() => {
						if (!findArticleBox) return;

						//load article with ajax
						//insert article html

						findArticleBox.classList.add('is-active');
						document.body.classList.add('article-open');

						navPoints('bg');

						animArticleHero();


						lScroll.update();
						ScrollTrigger.update();
						ScrollTrigger.refresh();

						// setTimeout(() => {
						// 	ScrollTrigger.refresh();
						// }, 500);


					}, delayTrsBox1);

					setTimeout(() => {
						//init animations
						articleAnimations();

						findTransitionBox.classList.remove('is-active');

						article = true;
						isScrolling = false;

					}, delayTrsBox2);
				});
		}
		else if (document.body.classList.contains('article-open_one')) {
			setTimeout(() => {
				if (!findArticleBox) return;

				//load article with ajax
				//insert article html

				findArticleBox.classList.add('is-active');
				document.body.classList.add('article-open');

				navPoints('bg');

				animArticleHero();


				lScroll.update();
				ScrollTrigger.update();
				ScrollTrigger.refresh();

				// setTimeout(() => {
				// 	ScrollTrigger.refresh();
				// }, 500);


			}, delayTrsBox1);

			setTimeout(() => {
				articleAnimations();

				findTransitionBox.classList.remove('is-active');

				article = true;
				isScrolling = false;

			}, delayTrsBox2);
		}


	}

	function closeArticle() {
		if (!findTransitionBox) return;
		findTransitionBox.classList.add('is-active')

		setTimeout(() => {
			if (!findArticleBox) return;
			findArticleBox.classList.remove('is-active');
			document.body.classList.remove('article-open');

			navPoints()
		}, delayTrsBox1);

		setTimeout(() => {
			findTransitionBox.classList.remove('is-active')
			article = false;
			heroHub = true;
			isScrolling = false;
		}, delayTrsBox2);
	}

	// navigation active or change color
	function navPoints(bg) {
		const findNav = document.querySelectorAll('[data-nav-points] .nav-point');
		findNav.forEach((el, index) => {
			index = index + 1;
			if (index == navStep) {
				if (el.closest('.nav-points').querySelector('.is-active')) {
					el.closest('.nav-points').querySelector('.is-active').classList.remove('is-active');
				}
				el.classList.add('is-active');
			}
			else if (navStep == 0) {
				el.classList.remove('is-active');
			}

			if (bg) {
				el.closest('.nav-points').classList.add('_dark');
			}
			else if (!bg) {
				el.closest('.nav-points').classList.remove('_dark');
			}

		});
	}
	// end navigation active or change color


	let step = 0;
	let navStep = 0;
	let isScrolling = false;
	let isScrollingDown = false;
	let isScrollingUp = false;
	let heroHub = true;
	let article = false;



	const findHub = document.querySelectorAll('[data-hub-scroll]')[0];
	const findTransitionBox = document.querySelectorAll('[data-transition-effect]')[0];
	const findArticleBox = document.querySelectorAll('[data-article-init]')[0];

	let durationScroll = 2;
	let delayScroll = 3000;
	let easeHub = 'Power2.easeInOut';

	let durationTrsBox = 1.5;
	let delayTrsBox1 = 1500;
	let delayTrsBox2 = 2000;
	let easeTrsBox = 'Power1.easeOut';

	function initStateHandler() {
		(function (history) {
			var pushState = history.pushState;
			history.pushState = function (state) {
				if (typeof history.onpushstate == 'function') {
					history.onpushstate({
						state: state,
					});
				}
				return pushState.apply(history, arguments);
			};
		})(window.history);

		window.onpopstate = history.onpushstate = (e) => {
			console.log(e);
			if (e.state) {
				// loadNext(e.state || e.target.location.href);
				showArticle('embracing-sustainability/index.html');
				return;
			}

			// window.location = e.target.location;
		};
	}

	initStateHandler();

	// console.log(window.history.state)

	if (location.pathname.includes('embracing-sustainability')) {
		console.log(" szasd s");
		isScrolling = true;
		// animation hub
		let imgTo0 = -38.1,
			circlTo0 = 217.1,
			bgStart0 = '#C91609',
			bgEnd0 = '#068880',
			durationImg = 0;
		animHub(imgTo0, circlTo0, bgStart0, bgEnd0, durationImg);

		// change value step nav 0 to 1
		navStep = 1;

		step = 1;

		heroHub = false;
		article = true;

		document.body.classList.add('article-open_one');

		//hub text anim
		let imgTo = 0,
			imgEnd = 40;
		animHubText(imgTo, imgEnd);

		// hub train 1
		lottieHubOne.setSpeed(1);
		lottieHubOne.setDirection(1);
		lottieHubOne.play();

		// hub train 2
		lottieHubTwo.setSpeed(0.5);
		lottieHubTwo.setDirection(1);
		lottieHubTwo.play();


		navPoints();

		// add active nav
		setTimeout(() => {
			showArticle();
		}, durationScroll * 2000 - 500);

		// close scroll
		setTimeout(() => {
			isScrolling = false;
			// lottieHubOne.stop();
		}, durationScroll * 2000);
	}

	let options = {

		// TODO: DOWN scroll
		onUp: () => {
			// console.log(window.history.state);
			// if (window.history.pushState('embracing-sustainability/', '', 'embracing-sustainability/')) {
			// 	console.log("object true");
			// }
			if(isScrolling) return;
			isScrolling = true;

			if(article) {
				// if(lScroll.y == lScroll.y) {
				// 	//show next hub title (2)

				// 	return;
				// }
				isScrolling = false;
				return;
			}

			if (heroHub) {
				if(step == 1) {
					window.history.pushState('embracing-sustainability/', '', 'embracing-sustainability/');
					// showArticle();
					return;
				}

				showNextHubScreen();

				step++;
				return;
			}

		},


		// TODO: UP scroll
		onDown: function () {
			// console.log(isScrolling);

			if(isScrolling) return;
			isScrolling = true;

			if(article) {
				if(lScroll.scroll.instance.scroll.y == 0) {
					//show back hub title (1)

					window.history.pushState('', '', '../');

					closeArticle();

					return;
				}
				isScrolling = false;
				return;
			}

			if (heroHub) {
				// if(step == 1) {
				// 	showArticle();
				// 	return;
				// }

				// showNextHubScreen();

				// scroll up HUB Hero step1
				// fnct top hero

				if(step == 1) {
					closeNextHubScreen()
					return;
				}
				// end scroll up HUB Hero step1

				isScrolling = false;
				if (step == 0) return;

				step--;
				// console.log(step);
			}

		}
	}


	new Wheel(document.body, options);

	// function articleAnimations() {

	// 	// const init = document.querySelector('.article.is-active')
	// 	// if (!init) {
	// 	// 	return;
	// 	// }

	// 	const animFadeY = document.querySelectorAll('[data-anim-fadey]');
	// 	const animFadeYL = document.querySelectorAll('[data-anim-fadeyl]');
	// 	// const animFadeYFix = document.querySelectorAll('[data-anim-fadey-fix]');
	// 	// const animFadeL = document.querySelectorAll('[data-anim-fadel]');
	// 	// const animFadeR = document.querySelectorAll('[data-anim-fader]');
	// 	// const animFadeZ = document.querySelectorAll('[data-anim-zoom]');
	// 	const animDuration = 1;
	// 	const animToggleActions = 'play none none none';
	// 	const animStart = 'top bottom-=100px';
	// 	const animEnd = 'top top';
	// 	const animHeight = 70;

	// 	const paralaxContainer = document.querySelectorAll('[data-paralax-container]');

	// 	paralaxContainer.forEach((el) => {
	// 		const paralaxTop = el.querySelectorAll('[data-anim-paralaxT]');
	// 		for (let i = 0; i < paralaxTop.length; i++) {
	// 			const element = paralaxTop[i];
	// 			gsap
	// 				.timeline({
	// 					scrollTrigger: {
	// 						trigger: el,
	// 						// toggleActions: 'play none none none';
	// 						start: 'top bottom',
	// 						scroller: '[data-scroll-container]',
	// 						end: 'bottom top',
	// 						// markers: true,
	// 						// pin: true,
	// 						// snap: true,
	// 						scrub: 1,
	// 					},
	// 				})
	// 				.fromTo(element, {
	// 					y: 0,
	// 					opacity: 1,
	// 				}, {
	// 					y: -400,
	// 					opacity: 1,
	// 					ease: 'none',
	// 					// duration: animDuration,
	// 					// delay: animFY.dataset.animFadey,
	// 				})
	// 		}

	// 		const paralaxBt = el.querySelectorAll('[data-anim-paralaxB]');
	// 		for (let i = 0; i < paralaxBt.length; i++) {
	// 			const element = paralaxBt[i];
	// 			gsap
	// 				.timeline({
	// 					scrollTrigger: {
	// 						trigger: el,
	// 						// toggleActions: 'play none none none';
	// 						start: 'top bottom',
	// 						scroller: '[data-scroll-container]',
	// 						end: 'bottom top',
	// 						// markers: true,
	// 						// pin: true,
	// 						// snap: true,
	// 						scrub: 1,
	// 					},
	// 				})
	// 				.fromTo(element, {
	// 					y: 0,
	// 					opacity: 1,
	// 				}, {
	// 					y: 400,
	// 					opacity: 1,
	// 					ease: 'none',
	// 					// duration: animDuration,
	// 					// delay: animFY.dataset.animFadey,
	// 				})
	// 		}

	// 		const paralaxBotTop = el.querySelectorAll('[data-anim-paralaxBT]');
	// 		for (let i = 0; i < paralaxBotTop.length; i++) {
	// 			const element = paralaxBotTop[i];
	// 			gsap
	// 				.timeline({
	// 					scrollTrigger: {
	// 						trigger: el,
	// 						// toggleActions: 'play none none none';
	// 						start: 'top bottom',
	// 						scroller: '[data-scroll-container]',
	// 						end: 'bottom top',
	// 						// markers: true,
	// 						// pin: true,
	// 						// snap: true,
	// 						scrub: 1,
	// 					},
	// 				})
	// 				.fromTo(element, {
	// 					y: 200,
	// 					opacity: 1,
	// 				}, {
	// 					y: -200,
	// 					opacity: 1,
	// 					ease: 'none',
	// 					// duration: animDuration,
	// 					// delay: animFY.dataset.animFadey,
	// 				})
	// 		}
	// 	});

	// 	animFadeY.forEach((animFY) => {
	// 		gsap
	// 			.timeline({
	// 				scrollTrigger: {
	// 					trigger: animFY,
	// 					toggleActions: animToggleActions,
	// 					start: animStart,
	// 					// markers: true,
	// 					scroller: '[data-scroll-container]',
	// 					end: animEnd,
	// 				},
	// 			})
	// 			.fromTo(animFY, {
	// 				y: animHeight,
	// 				opacity: 0,
	// 			}, {
	// 				y: 0,
	// 				opacity: 1,
	// 				duration: animDuration,
	// 				delay: animFY.dataset.animFadey,
	// 			})
	// 	});


	// 	animFadeYL.forEach((animFY) => {
	// 		gsap
	// 			.timeline({
	// 				scrollTrigger: {
	// 					trigger: animFY,
	// 					toggleActions: animToggleActions,
	// 					start: animStart,
	// 					// markers: true,
	// 					scroller: '[data-scroll-container]',
	// 					end: animEnd,
	// 				},
	// 			})
	// 			.fromTo(animFY, {
	// 				y: 140,
	// 				opacity: 0,
	// 			}, {
	// 				y: 0,
	// 				opacity: 1,
	// 				duration: animDuration,
	// 				delay: animFY.dataset.animFadey,
	// 			})
	// 	});

	// 	// animFadeYFix.forEach((animFY) => {
	// 	// 	gsap
	// 	// 		.timeline({
	// 	// 			scrollTrigger: {
	// 	// 				trigger: animFY,
	// 	// 				toggleActions: animToggleActions,
	// 	// 				start: animStart,
	// 	// 				scroller: '[data-scroll-container]',
	// 	// 				end: 'top center',
	// 	// 				scrub: true,
	// 	// 			},
	// 	// 		})
	// 	// 		.fromTo(animFY, {
	// 	// 			y: animHeight,
	// 	// 			opacity: 0,
	// 	// 		}, {
	// 	// 			y: 0,
	// 	// 			opacity: 1,
	// 	// 			duration: animDuration,
	// 	// 			delay: animFY.dataset.animFadey,
	// 	// 		})
	// 	// });

	// 	// animFadeL.forEach(e => {
	// 	// 	gsap
	// 	// 		.timeline({
	// 	// 			scrollTrigger: {
	// 	// 				trigger: e,
	// 	// 				toggleActions: animToggleActions,
	// 	// 				start: animStart,
	// 	// 				scroller: '[data-scroll-container]',
	// 	// 				end: animEnd,
	// 	// 			},
	// 	// 		})
	// 	// 		.fromTo(e, {
	// 	// 			x: -animHeight,
	// 	// 			opacity: 0,
	// 	// 		}, {
	// 	// 			x: 0,
	// 	// 			opacity: 1,
	// 	// 			duration: animDuration,
	// 	// 			delay: e.dataset.animFadel,
	// 	// 		})
	// 	// });

	// 	// animFadeR.forEach(e => {
	// 	// 	gsap
	// 	// 		.timeline({
	// 	// 			scrollTrigger: {
	// 	// 				trigger: e,
	// 	// 				toggleActions: animToggleActions,
	// 	// 				start: animStart,
	// 	// 				scroller: '[data-scroll-container]',
	// 	// 				end: animEnd,
	// 	// 			},
	// 	// 		})
	// 	// 		.fromTo(e, {
	// 	// 			x: animHeight,
	// 	// 			opacity: 0,
	// 	// 		}, {
	// 	// 			x: 0,
	// 	// 			opacity: 1,
	// 	// 			duration: animDuration,
	// 	// 			delay: e.dataset.animFader,
	// 	// 		})
	// 	// });

	// 	// animFadeZ.forEach(e => {
	// 	// 	gsap
	// 	// 		.timeline({
	// 	// 			scrollTrigger: {
	// 	// 				trigger: e,
	// 	// 				toggleActions: animToggleActions,
	// 	// 				start: animStart,
	// 	// 				end: 'top center',
	// 	// 				scroller: '[data-scroll-container]',
	// 	// 				// markers: true,
	// 	// 				scrub: true,
	// 	// 			},
	// 	// 		})
	// 	// 		.fromTo(e, {
	// 	// 			scale: 0.8,
	// 	// 			opacity: 0,
	// 	// 		}, {
	// 	// 			scale: 1,
	// 	// 			opacity: 1,
	// 	// 			duration: animDuration,
	// 	// 			delay: e.dataset.animFader,
	// 	// 		})
	// 	// });

	// 	// data-lottie-fabric

	// 	function lottieInit(el, src) {
	// 		lottie.loadAnimation({
	// 			container: el,
	// 			renderer: 'svg',
	// 			loop: true,
	// 			autoplay: true,
	// 			path: src,
	// 		});
	// 	}

	// 	let lottieInitNoLoopStart;
	// 	function lottieInitNoLoop(el, src) {
	// 		lottieInitNoLoopStart = lottie.loadAnimation({
	// 			container: el,
	// 			renderer: 'svg',
	// 			loop: false,
	// 			autoplay: false,
	// 			path: src,
	// 		});
	// 	}

	// 	const $lottieElectroOne = document.querySelectorAll('[data-lottie-train]');
	// 	$lottieElectroOne.forEach(el => {
	// 		if (!el.classList.contains('is-active')) {
	// 			el.classList.add('is-active');
	// 			let src = '../json/train/AF1-1-Train.json';
	// 			lottieInit(el, src);
	// 		}
	// 	});

	// 	const $lottieElectroTwo = document.querySelectorAll('[data-lottie-windwill]');
	// 	$lottieElectroTwo.forEach(el => {
	// 		if (!el.classList.contains('is-active')) {
	// 			el.classList.add('is-active');
	// 			let src = '../json/Windmill/AF1-1-Windmill.json';
	// 			lottieInit(el, src);
	// 		}
	// 	});


	// 	const lottieFabric = document.querySelectorAll('[data-lottie-fabric]');
	// 	lottieFabric.forEach(el => {
	// 		let src = '../json/FBCCI-AF1-2.json';
	// 		lottieInitNoLoop(el, src);
	// 		lottieInitNoLoopStart.stop();

	// 		ScrollTrigger.create({
	// 			trigger: el,
	// 			start: 'bottom bottom',
	// 			end: 'top top',
	// 			scroller: '[data-scroll-container]',
	// 			onEnter: () => {
	// 				lottieInitNoLoopStart.play();
	// 			}
	// 		});
	// 	});

	// }

}
