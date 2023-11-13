export default (gsap, ScrollTrigger, $) => {

	document.addEventListener("transitionFinished", () => {
		if(window.location.hash.includes('video')) openVideo(true, $('.video-st').data('video'));
	}, {once: true});

	$('body').on('click', '.video-st', function() {
		openVideo(false, $(this).data('video'));
	});

	$('body').on('click', '.video-modal_close', function (e) {
		e.preventDefault();

		window.history.pushState('video', '', window.location.href.split('#')[0]);

		$('.video-modal').removeClass('is-active');

		document.querySelector('.video-modal video').pause();
	});

	function openVideo(fromPage = false, videoSrc) {
		const $video = $('.video-modal video');

		if(!fromPage) window.history.pushState('video', '', window.location.href.split('#')[0] + '#video');

		$video.find('source')[0].setAttribute('src', videoSrc);

		const video = $video[0];
		video.load();

		$('.video-modal').addClass('is-active');

		if(fromPage) {
			video.muted = true;
			video.volume = 0;
		}

		video.play();
	}

	const videoBox = document.querySelectorAll('[data-init-video]');

	videoBox.forEach((el) => {
		el.pause();
		ScrollTrigger.create({
			trigger: el,
			start: 'top-=800px top-=200px',
			end: 'top top',
			// markers: true,
			scroller: '[data-scroll-container]',
			// animation: scrollTween,
			// snap: true,
			onEnter: () => {
				// console.log('onEnter');
				el.play();
			},
			onEnterBack: () => {
				// console.log('onEnterBack');
				el.play();
			},
			onLeave: () => {
				// console.log('onLeave');
				el.pause();
			},
			onLeaveBack: () => {
				// console.log('onLeaveBack');
				el.pause();
			},
		});
	});
}
