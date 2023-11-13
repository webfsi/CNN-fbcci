function initHubLottie(lottie, $) {
	const isHub = !$('.section-hero').length;
	const jsonPath = isHub ? '' : '../';
	let srcLottieHubOne = jsonPath + 'json/hub/A1 Assets/HUB-A1.json';
	let srcLottieHubTwo = jsonPath + 'json/hub/A2 Assets/HUB-A2.json';
	let srcLottieHubAir = jsonPath + 'json/hub/Airplane/airplane.json';
	let srcLottieHubFlag = jsonPath + 'json/hub/Flag/flag.json';
	let srclottieHubThree = jsonPath + 'json/hub/A4/HUB-A3-2.json';
	let srclottieHubFour = jsonPath + 'json/hub/hub A6/HUB-A6.json';
	let srclottieHubFive = jsonPath + 'json/hub/hub A7/HUB-A5.json';
	let srclottieHubSix = jsonPath + 'json/hub/hub A8/HUB-A6.json';

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

	var lottieHubFlag;
	function lottieInitFlag(el, src) {
		lottieHubFlag = lottie.loadAnimation({
			container: el,
			renderer: 'svg',
			loop: true,
			duration: 1,
			autoplay: true,
			path: src,
		});
	}
	const $lottieHubFlag = document.querySelectorAll('[data-lottie-hub-flag]');
	$lottieHubFlag.forEach(el => {
		lottieInitFlag(el, srcLottieHubFlag);
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

	var lottieHubThree;
	function lottieInit3(el, src) {
		lottieHubThree = lottie.loadAnimation({
			container: el,
			renderer: 'svg',
			loop: true,
			duration: 1,
			autoplay: true,
			path: src,
		});
	}
	const $lottieHubThree = document.querySelectorAll('[data-lottie-hub-three]');
	$lottieHubThree.forEach(el => {
		lottieInit3(el, srclottieHubThree);
	});

	var lottieHubFour;
	function lottieInit4(el, src) {
		lottieHubFour = lottie.loadAnimation({
			container: el,
			renderer: 'svg',
			loop: true,
			duration: 1,
			autoplay: true,
			path: src,
		});
	}
	const $lottieHubFour = document.querySelectorAll('[data-lottie-hub-four]');
	$lottieHubFour.forEach(el => {
		lottieInit4(el, srclottieHubFour);
	});

	var lottieHubFive;
	function lottieInit5(el, src) {
		lottieHubFive = lottie.loadAnimation({
			container: el,
			renderer: 'svg',
			loop: true,
			duration: 1,
			autoplay: true,
			path: src,
		});
	}
	const $lottieHubFive = document.querySelectorAll('[data-lottie-hub-five]');
	$lottieHubFive.forEach(el => {
		lottieInit5(el, srclottieHubFive);
	});

	var lottieHubSix;
	function lottieInit6(el, src) {
		lottieHubSix = lottie.loadAnimation({
			container: el,
			renderer: 'svg',
			loop: true,
			duration: 1,
			autoplay: true,
			path: src,
		});
	}
	const $lottieHubSix = document.querySelectorAll('[data-lottie-hub-six]');
	$lottieHubSix.forEach(el => {
		lottieInit6(el, srclottieHubSix);
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
}

export {
	initHubLottie,
};


