
import { animHubText, animHub } from "./hub-animation.js";
import { initHubLottie } from "./hub-lottie.js";
import { articleAnimations, animArticleHero } from "./article-animation.js";

export default (lottie, gsap, ScrollTrigger, ScrollToPlugin, LocomotiveScroll, Wheel, onSwipe, $) => {
	// Using Locomotive Scroll
	const lScroll = new LocomotiveScroll({
		el: document.querySelector('[data-scroll-container]'),
		smooth: true
	});

	window.lScroll = lScroll;

	lScroll.on('scroll', ScrollTrigger.update);

	ScrollTrigger.refresh();
	// end/ Using Locomotive Scroll

	// init hub Lottie
	initHubLottie(lottie, $);

	let step = 0;
	let isScrolling = false;
	let heroHub = true;
	let article = false;

	const findTransitionBox = document.querySelectorAll('[data-transition-effect]')[0];
	const findArticleBox = document.querySelectorAll('[data-article-init]')[0];
	const fullArticle = document.querySelectorAll('.article')[0];

	let durationScroll = 2;
	let delayScroll = 3000;
	let easeHub = 'Power2.easeInOut';

	let delayTrsBox1 = 1500;
	let delayTrsBox2 = 2000;

	const hubTitle = 'Booming Bangladesh - FBCCI - CNN';

	const steps = [
		{
			imgTo1: 0,
			circlTo1: 0,
			bgStart1: '#068880',
			bgEnd1: '#C91609',
			imgTo0: 0,
			circlTo0: 0,
			bgStart0: '#068880',
			bgEnd0: '#C91609',
			durationImg: 2,
			imgTo: 80,
			imgEnd: 0
		},
		{
			imgTo0: -38.1,
			circlTo0: 217.1,
			bgStart0: '#C91609',
			bgEnd0: '#068880',
			imgTo1: -38.1,
			circlTo1: 217.1,
			bgStart1: '#C91609',
			bgEnd1: '#068880',
			durationImg: 2,
			imgTo: 0,
			imgEnd: 40
		},
		{
			imgTo0: -58,
			circlTo0: 335,
			bgStart0: '#068880',
			bgEnd0: '#C91609',
			imgTo1: -58,
			circlTo1: 335,
			bgStart1: '#068880',
			bgEnd1: '#C91609',
			durationImg: 2,
			imgTo: 0,
			imgEnd: 40
		},
		{
			imgTo0: -100,
			circlTo0: 566,
			bgStart0: '#C91609',
			bgEnd0: '#068880',
			imgTo1: -100,
			circlTo1: 565,
			bgStart1: '#C91609',
			bgEnd1: '#068880',
			durationImg: 2,
			imgTo: 0,
			imgEnd: 40
		},
		{
			imgTo0: -100,
			circlTo0: 566,
			bgStart0: '#C91609',
			bgEnd0: '#068880',
			imgTo1: -100,
			circlTo1: 565,
			bgStart1: '#C91609',
			bgEnd1: '#068880',
			durationImg: 2,
			imgTo: 0,
			imgEnd: 40
		}
	];

	// scroll animation hub down
	function showNextHubScreen(step = 1) {
		console.log('showNextHubScreen - step', step);

		console.log(steps[step]);
		console.log(steps);
		console.log(step);

		// animation hub
		const {imgTo0, circlTo0, bgStart0, bgEnd0, durationImg} = steps[step];

		animHub(imgTo0, circlTo0, bgStart0, bgEnd0, durationImg);

		//hub text anim

		const {imgTo, imgEnd} = steps[step];

		animHubText(imgTo, imgEnd);

		// close scroll
		setTimeout(() => {
			isScrolling = false;
		}, delayScroll);
	}
	// end/ scroll animation hub down

	// scroll animation hub up
	function closeNextHubScreen(step = 0) {
		console.log('closeNextHubScreen - step', step);

		const {imgTo0, circlTo0, bgStart0, bgEnd0, durationImg} = steps[step];

		animHub(imgTo0, circlTo0, bgStart0, bgEnd0, durationImg);

		//hub text anim
		const {imgTo, imgEnd} = steps[step];

		animHubText(imgTo, imgEnd);

		setTimeout(() => {
			isScrolling = false;
		}, delayScroll);
	}
	// end/ scroll animation hub up

	function revealNextArticle() {
		setTimeout(() => {
			if (!findArticleBox) return;

			$('.hero-hub').hide();

			findArticleBox.classList.add('is-active');
			document.body.classList.add('article-open');

			animArticleHero();

			lScroll.update();
			ScrollTrigger.update();
			ScrollTrigger.refresh();

		}, delayTrsBox1);

		setTimeout(() => {

			//init animations
			articleAnimations();

			findTransitionBox.classList.remove('is-active');
			document.body.classList.remove('_hub-hidden');

			ev('transitionFinished', {});

			article = true;
			isScrolling = false;

			lScroll.update();
			ScrollTrigger.update();
			ScrollTrigger.refresh();

			// document.body.classList.remove('_hub-hidden');

		}, delayTrsBox2);

		if (!isTouchDevice) return;
		setTimeout(() => {
			ScrollTrigger.update();
			ScrollTrigger.refresh();
		}, 10000);
	}

	function switchArticle(content = false) {
		setTimeout(() => {
			// document.body.classList.add('_hub-hidden');

			if(content) $('[data-articles-container]').append(content);

			$('[data-article-parse]').hide();
			$(`[data-article="${currentArticle.index}"]`).show();

			lScroll.scrollTo(0, {duration: 0, disableLerp: true, offset: 0});
			document.querySelector('[data-scroll-container]').scrollTop = 0;

		}, delayTrsBox1 - 500);
	}

	function showArticle(url = 'embracing-sustainability/index.html') {
		if (!findTransitionBox) return;
		heroHub = false;

		findTransitionBox.classList.add('is-active');
		document.body.classList.add('_hub-hidden');

		if (!currentArticle.isLoaded) {
			currentArticle.isLoaded = true;

			fetch(url)
				.then(function (response) {
					return response.text();
				})
				.then((html) => {
					var parser = new DOMParser();
					var doc = parser.parseFromString(html, "text/html");

					switchArticle(doc.querySelector("[data-article-parse]").outerHTML);

					revealNextArticle();
				});
		}
		else {

			switchArticle();

			revealNextArticle();
		}
	}

	function closeArticle() {
		if (!findTransitionBox) return;
		findTransitionBox.classList.add('is-change-color')
		findTransitionBox.classList.add('is-active')

		setTimeout(() => {
			if (!findArticleBox) return;
			$('.hero-hub').show();
			findArticleBox.classList.remove('is-active');
			document.body.classList.remove('article-open');

		}, delayTrsBox1);

		setTimeout(() => {
			findTransitionBox.classList.remove('is-active')
			findTransitionBox.classList.remove('is-change-color')
			article = false;
			heroHub = true;
			isScrolling = false;
		}, delayTrsBox2);
	}

	$('body').on('click', '[data-nav-points] .nav-point', function(e) {

		if(this.classList.contains('_start')) {
			if (step === 0) {
				return;
			}

			step = 0;
			if(!heroHub) window.history.pushState('hub', '', '../');
			closeNextHubScreen(step);

			return;
		}

		const articleId = $(this).data('url');

		const segments = new URL(location.href).pathname.split('/');
		let lastPath = segments.pop() || segments.pop();

		if(lastPath != 'fbcci' && lastPath != 'fbcci-2023' && lastPath != 'fbcci-v2-2023' && lastPath != 'fbcci-v3-2023') {
			lastPath = '';
		} else {
			lastPath = '/' + lastPath;
		}

		const newCurrentArticle = articles.filter(article => article.id === articleId)[0];

		currentArticle = newCurrentArticle;

		step = currentArticle.step;

		const url = `${location.origin}${segments.join('/')}${lastPath}/${articleId}/`;

		window.history.pushState(url, '', new URL(url));
	});

	// navigation active or change color
	function navPoints(bg = false) {
		const $navPoints = $('.nav-points');

		$('.nav-point._start').toggleClass('_is-start', !bg);
		$navPoints.toggleClass('_dark', bg);

		$('[data-nav-points] .nav-point.is-active').removeClass('is-active');

		if(currentArticle.step === step && bg) {
			$('[data-nav-points] .nav-point').eq(currentArticle.index - 1).addClass('is-active');
		}
	}
	// end navigation active or change color

	function initStateHandler() {

		if(!location.pathname.includes('embracing-sustainability')) {
			history.pushState('hub', null);
		}

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
			console.log('stateChanged', e);

			if (e.state !== 'hub' && e.state !== 'video' && checkArticleExists(e.state)) {
				showArticle(e.state);
				document.title = currentArticle.title;
				setTimeout(() => navPoints(true), delayTrsBox2 - 500);
				return;
			}

			if(e.state === 'hub') {
				closeArticle();
				setTimeout(() => navPoints(), delayTrsBox2 - 500);
				document.title = hubTitle;
				return;
			}
		};
	}

	initStateHandler();

	function checkArticleExists(search) {
		return articles.filter(article => search?.includes(article.id)).length;
	}

	const articles = [
		{
			id: 'embracing-sustainability',
			isLoaded: false,
			index: 1,
			step: 2,
			title: 'Embracing Sustainability - FBCCI - CNN'
		},
		{
			id: 'industries-future',
			isLoaded: false,
			index: 2,
			step: 5,
			title: 'Industries of the Future – FBCCI – CNN'
		},
		{
			id: 'smart-life',
			isLoaded: false,
			index: 3,
			step: 8,
			title: 'A Smart Way of Life – FBCCI – CNN'
		}
	];

	let currentArticle = articles[0];

	const stepsToArticles = {
		2: articles[0],
		5: articles[1],
		8: articles[2]
	};

	if (checkArticleExists(location.pathname)) {
		// console.log()
		$('._start').removeClass('_is-start');

		currentArticle = articles.filter(article => location.pathname?.includes(article.id))[0];

		console.log('loadedArticle', currentArticle);

		currentArticle.isLoaded = true;

		isScrolling = true;

		// animation hub

		const {imgTo0, circlTo0, bgStart0, bgEnd0, durationImg} = steps[currentArticle.index];

		animHub(imgTo0, circlTo0, bgStart0, bgEnd0, 0);

		step = currentArticle.step;
		navPoints(true);

		heroHub = false;
		article = true;

		//hub text anim

		const {imgTo, imgEnd} = steps[currentArticle.index];

		animHubText(imgTo, imgEnd);

		// add active nav
		setTimeout(() => {
			showArticle();
		}, durationScroll * 2000 - 1000);

		// close scroll
		setTimeout(() => {
			isScrolling = false;
			// lottieHubOne.stop();
		}, durationScroll * 2000);
	}

	const stepsBetweenArticles = 3;

	function transitToNextArticle(currentStep) { // for example currentStep == 2
		const prevArticleIndex = stepsToArticles[step].index; // 1

		showNextHubScreen(prevArticleIndex); // 1
		window.history.pushState('hub', '', '../');

		// transit to article title #2
		setTimeout(() => {
			showNextHubScreen(prevArticleIndex + 1); // 2

			// transit to article #2
			setTimeout(() => {
				step = currentStep + stepsBetweenArticles; // 5

				changeArticle(step);
			}, 3000);
		}, 3000);
	}

	function transitToPrevArticle(currentStep) { // for example currentStep == 5
		const prevArticleIndex = stepsToArticles[step].index; // 2

		//show back hub title
		showNextHubScreen(prevArticleIndex); // 2
		window.history.pushState('hub', '', '../');

		setTimeout(() => {
			step = currentStep - 1; // 4

			if (step >= articles[1].step - 1) {
				closeNextHubScreen(prevArticleIndex - 1); // 1

				setTimeout(() => {
					step = currentStep - stepsBetweenArticles; // 2

					changeArticle(step);
				}, 3000);
			}
		}, 3000);
	}

	function changeArticle(step) {
		currentArticle = stepsToArticles[step];

		const url = `${location.origin}${location.pathname}${currentArticle.id}/`;

		window.history.pushState(url, '', url);
	}

	let options = {

		// TODO: DOWN scroll
		onDown: () => {

			if(isScrolling) return;
			isScrolling = true;

			if(article) {
				if(
					lScroll.scroll.instance.scroll.y === lScroll.scroll.instance.limit.y ||
					(isTouchDevice && fullArticle.classList.contains('_is-scroll-bottom'))
				) { //end of artilce

					if(step === 8) {
						isScrolling = false;
						return;
					}

					if (fullArticle.classList.contains('_is-scroll-bottom')) {
						setTimeout(() => {
							let containerArticle = fullArticle.querySelector('[data-scroll-container]')
							gsap.to(containerArticle, {duration: 0, scrollTo: {y: '.article_wrapp', offsetY: 0}});
						}, 1000);
					}

					transitToNextArticle(step);

					return;
				}
			}

			if (heroHub) {
				// fix bug
				if(step === -1) {
					step++;
					return;
				}

				if(step === 0) {
					showNextHubScreen(1);

					setTimeout(() => {
						step++;
					}, 3000);

					return;
				}

				// add from step 1
				if(step === 1) {
					step++;

					changeArticle(step);

					return;
				}
			}

			isScrolling = false;

		},

		// TODO: UP scroll
		onUp: function() {
			console.log('onScrollUp');

			if(isScrolling) return;
			isScrolling = true;

			if(article) {
				const scrollEl = document.querySelector('[data-scroll-container]');
				const scrollY = scrollEl.scrollTop;

				console.log('onScrollUp scrollY', scrollY);

				if(lScroll.scroll.instance.scroll.y === 0 && !isTouchDevice || (isTouchDevice && scrollY <= 0)) {
					console.log('article onScrollUp y == 0');

					transitToPrevArticle(step);
					return;
				}

				isScrolling = false;
				return;
			}

			if (heroHub) {
				if (step === -1) {
					step++;
					isScrolling = false;
					return;
				}
				if (step === 0) {
					isScrolling = false;
					return;
				}

				// scroll up HUB Hero step1
				if(step === 1) {
					closeNextHubScreen(0);

					setTimeout(() => {
						step--;
					}, 3000);
					// showNextHubScreen(0);
					return;
				}
				// end scroll up HUB Hero step1

				isScrolling = false;
				return;
			}

			isScrolling = false;
		}

	};

	// it is touch device or not
	function isTouchDeviceFind() {
		return window.ontouchstart !== undefined;
	}

	var isTouchDevice = isTouchDeviceFind();

	console.log('initPage', isTouchDevice);

	if (isTouchDevice) {
		console.log("isTouchDevice", isTouchDeviceFind());
		var handleSwipe = new onSwipe(document.body, options);

		$('body').addClass('_mobile-dev');
		lScroll.destroy();
		ScrollTrigger.update();
		ScrollTrigger.refresh();
		// let handleWheel = new Wheel(document.body, options);
	} else if (!isTouchDevice) {
		console.log("isTouchDevice", isTouchDeviceFind());
		let handleWheel = new Wheel(document.body, options);

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

		window.lscrollObserver = new ResizeObserver(() => {
			lScroll.update();
			ScrollTrigger.update();
			ScrollTrigger.refresh();
			// console.log('updateLscroll');
		}).observe(
			document.querySelector("[data-scroll-container]")
		);

	}

};
