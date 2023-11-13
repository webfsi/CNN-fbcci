
import { articleAnimations, animArticleHero } from "./article-animation.js";
import { animHubText, animHub } from "./hub-animation.js";

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

	// init Lottie
	const isHub = !$('.section-hero').length;
	const jsonPath = isHub ? '' : '../';
	// let srcLottieHubOne = jsonPath + 'json/HUB-A1.json';
	// let srcLottieHubTwo = jsonPath + 'json/HUB-A2.json';
	let srcLottieHubOne = jsonPath + 'json/hub/A1 Assets/HUB-A1.json';
	let srcLottieHubTwo = jsonPath + 'json/hub/A2 Assets/HUB-A2.json';
	let srcLottieHubAir = jsonPath + 'json/hub/Airplane/airplane.json';

	// two train lottie in hub
	var lottieHubAir;
	function lottieInitAir(el, src) {
		lottieHubAir = lottie.loadAnimation({
			container: el,
			renderer: 'svg',
			loop: true,
			duration: 1,
			autoplay: true,
			path: src,
		});
	}
	const $lottieHubAir = document.querySelectorAll('[data-lottie-hub-air]');
	$lottieHubAir.forEach(el => {
		lottieInitAir(el, srcLottieHubAir);
	});

	var lottieHubOne;
	function lottieInit1(el, src) {
		lottieHubOne = lottie.loadAnimation({
			container: el,
			renderer: 'svg',
			loop: true,
			duration: 1,
			autoplay: true,
			path: src,
		});
	}
	const $lottieHubOne = document.querySelectorAll('[data-lottie-hub-one]');
	$lottieHubOne.forEach(el => {
		lottieInit1(el, srcLottieHubOne);
	});

	var lottieHubTwo;
	function lottieInit2(el, src) {
		lottieHubTwo = lottie.loadAnimation({
			container: el,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: src,
		});
	}
	const $lottieHubTwo = document.querySelectorAll('[data-lottie-hub-two]');
	$lottieHubTwo.forEach(el => {
		lottieInit2(el, srcLottieHubTwo);
	});
	// end/ two train lottie in hub

	const steps = [
		{
			imgTo1: 0,
			circlTo1: 0,
			bgStart1: '#068880',
			bgEnd1: '#C91609',
			durationImg: 2,
			imgTo: 80,
			imgEnd: 0
		},
		{
			imgTo0: -38.1,
			circlTo0: 217.1,
			bgStart0: '#C91609',
			bgEnd0: '#068880',
			durationImg: 2,
			imgTo: 0,
			imgEnd: 40
		},
		{
			imgTo0: -58,
			circlTo0: 335,
			bgStart0: '#068880',
			bgEnd0: '#C91609',
			durationImg: 2,
			imgTo: 0,
			imgEnd: 40
		}
	];

	// scroll animation hub down
	function showNextHubScreen(step = 1) {

		console.log('showNextHubScreen', step)

		// animation hub
		const {imgTo0, circlTo0, bgStart0, bgEnd0, durationImg} = steps[step];

		animHub(imgTo0, circlTo0, bgStart0, bgEnd0, durationImg);

		// change value step nav 0 to 1
		navStep++;

		//hub text anim

		const {imgTo, imgEnd} = steps[step];

		animHubText(imgTo, imgEnd);

		// add active nav
		setTimeout(() => {
			navPoints();
		}, durationScroll * 1000 - 500);

		// close scroll
		setTimeout(() => {
			isScrolling = false;
		}, delayScroll);
	}
	// end/ scroll animation hub down

	// scroll animation hub up
	function closeNextHubScreen() {

		const {imgTo1, circlTo1, bgStart1, bgEnd1, durationImg} = steps[0];

		animHub(imgTo1, circlTo1, bgStart1, bgEnd1, durationImg);

		navStep--;
		navPoints();

		//hub text anim
		const {imgTo, imgEnd} = steps[0];

		animHubText(imgTo, imgEnd);

		setTimeout(() => {
			// step--;
			isScrolling = false;
		}, delayScroll);
	}
	// end/ scroll animation hub up

	function showArticle(url = 'embracing-sustainability/index.html') {
		if (!findTransitionBox) return;

		findTransitionBox.classList.add('is-active');

		const closebug = document.querySelector('.hero-hub');

		console.log('currentArticle first', currentArticle);

		if (!currentArticle.isLoaded) { // !currentArticle.isLoaded
			document.body.classList.add('article-open_one');
			currentArticle.isLoaded = true;

			fetch(url)
				.then(function (response) {
					return response.text();
				})
				.then((html) => {
					var parser = new DOMParser();
					var doc = parser.parseFromString(html, "text/html");

					$('[data-articles-container]').append(doc.querySelector("[data-article-parse]").outerHTML);

					$('[data-article-parse]').hide();
					$(`[data-article="${currentArticle.index}"]`).show();

					lScroll.scrollTo(0, {duration: 0, disableLerp: true, offset: 0});

					// document.querySelector(
					// 	"[data-article-parse]"
					// ).outerHTML = doc.querySelector("[data-article-parse]").outerHTML;

					setTimeout(() => {
						closebug.classList.add('_hidden');
					}, delayTrsBox1 - 500);
					setTimeout(() => {
						if (!findArticleBox) return;

						$('.hero-hub').hide();

						findArticleBox.classList.add('is-active');
						document.body.classList.add('article-open');

						navPoints('bg');

						animArticleHero();

						lScroll.update();
						ScrollTrigger.update();
						ScrollTrigger.refresh();

					}, delayTrsBox1);

					setTimeout(() => {
						closebug.classList.remove('_hidden');
						//init animations
						articleAnimations();

						findTransitionBox.classList.remove('is-active');

						ev('transitionFinished', {});

						article = true;
						isScrolling = false;

					}, delayTrsBox2);
				});
		}
		else {
			$('[data-article-parse]').hide();
			console.log('currentArticle', currentArticle);
			console.log('index', currentArticle.index);
			$(`[data-article="${currentArticle.index}"]`).show();

			lScroll.scrollTo(0, {duration: 0, disableLerp: true, offset: 0});

			setTimeout(() => {

				closebug.classList.add('_hidden');
			}, delayTrsBox1 - 500);
			setTimeout(() => {
				if (!findArticleBox) return;
				// fix bug

				//load article with ajax
				//insert article html

				$('.hero-hub').hide();

				findArticleBox.classList.add('is-active');
				document.body.classList.add('article-open');

				navPoints('bg');

				animArticleHero();

				lScroll.update();
				ScrollTrigger.update();
				ScrollTrigger.refresh();

			}, delayTrsBox1);

			setTimeout(() => {
				articleAnimations();

				findTransitionBox.classList.remove('is-active');

				ev('transitionFinished', {});

				article = true;
				isScrolling = false;

				closebug.classList.remove('_hidden');

			}, delayTrsBox2);
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

			navPoints()
		}, delayTrsBox1);

		setTimeout(() => {
			findTransitionBox.classList.remove('is-active')
			findTransitionBox.classList.remove('is-change-color')
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

		if(!location.pathname.includes('embracing-sustainability')) {
			history.pushState('hub', null)
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
			console.log(e);
			if (e.state !== 'hub' && e.state !== 'video' && checkArticleExists(e.state)) {
				// loadNext(e.state || e.target.location.href);
				// console.log(e.state)
				showArticle(e.state);
				return;
			}

			if(e.state === 'hub') {
				closeArticle();
				return;
			}

			// window.location = e.target.location;
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
			step: 2
		},
		{
			id: 'industries-future',
			isLoaded: false,
			index: 2,
			step: 4
		}
	];

	let currentArticle = articles[0];

	const stepsToArticles = {
		2: articles[0],
		4: articles[1]
	};

	if (checkArticleExists(location.pathname)) {
		currentArticle = articles.filter(article => location.pathname?.includes(article.id))[0];
		console.log('loadedArticle', currentArticle);
		currentArticle.isLoaded = true;

		isScrolling = true;

		// animation hub

		const {imgTo0, circlTo0, bgStart0, bgEnd0, durationImg} = steps[currentArticle.index];

		animHub(imgTo0, circlTo0, bgStart0, bgEnd0, 0);

		// change value step nav 0 to 1
		navStep = 1;
		navPoints();

		step = currentArticle.step;

		heroHub = false;
		article = true;

		// document.body.classList.add('article-open_one');

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

	let options = {

		// TODO: DOWN scroll
		onUp: () => {

			console.log('navStep', navStep);

			if(isScrolling) return;
			isScrolling = true;

			if(article) {
				if(lScroll.scroll.instance.scroll.y === lScroll.scroll.instance.limit.y) {
					if(step == 4) {
						isScrolling = false;
						return;
					}

					showNextHubScreen(step);
					window.history.pushState('hub', '', '../');
					// closeArticle();

					step++;
					return;
				}

				isScrolling = false;
				return;
			}

			if (heroHub) {
				if(step === 0) {
					showNextHubScreen(1);

					step++;

					return;
				}

				step++;

				currentArticle = stepsToArticles[step];

				const url = `${location.origin}${location.pathname}${currentArticle.id}/`;

				window.history.pushState(url, '', url);
			}

		},

		// TODO: UP scroll
		onDown: function () {


			console.log('navStep', navStep);
			console.log('onDown', step)

			if(isScrolling) return;
			isScrolling = true;

			if(article) {
				if(lScroll.scroll.instance.scroll.y == 0 && !isTouchDevice) {
					//show back hub title
					showNextHubScreen(stepsToArticles[step].index);
					window.history.pushState('hub', '', '../');

					step--;

					return;
				} else {
					const scrollEl = document.querySelector('[data-scroll-container]');

					let scrollY;
					scrollEl.addEventListener('scroll', function() {
						scrollY = scrollEl.scrollTop;
						if (scrollY == 0) {
							window.history.pushState('', '', '../');

							closeArticle();

							return;
						}
					});
				}

				isScrolling = false;
				return;
			}

			if (heroHub) {
				if (step == 0) return;

				// scroll up HUB Hero step1
				if(step == 1) {
					closeNextHubScreen();

					step--;
					// showNextHubScreen(0);
					return;
				}
				// end scroll up HUB Hero step1

				step--;

				currentArticle = stepsToArticles[step];

				const url = `${location.origin}${location.pathname}${currentArticle.id}/`;

				window.history.pushState(url, '', url);
			}

		}
	};

	// it is touch device or not
	function isTouchDeviceFind(){
		return window.ontouchstart !== undefined;
	}

	var isTouchDevice = isTouchDeviceFind();

	console.log('initPage', isTouchDevice);

	if (isTouchDevice) {
		console.log("isTouchDevice", isTouchDeviceFind());
		var handleSwipe = new onSwipe(document.body, options);

		$('[data-scroll-container]').addClass('_mobile-dev');
		lScroll.destroy();
		ScrollTrigger.refresh();
		ScrollTrigger.update();
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
	}

	// it is touch device or not

	// new Wheel(document.body, options);
	// new onSwipe(document.body, options);



}
