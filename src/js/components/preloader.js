export default (gsap, $) => {

	if(!$('.preloader').hasClass('_hidden')) {
		const preload = document.querySelector('.preloader');
		if (!preload) return;
		setTimeout(() => {
			preload.classList.add('is-done');
		}, 700);

		return;
	}

	const isHub = !$('.section-hero').length;

	if(!isHub) return;

	let easeHub = 'Power2.easeInOut';

	const $hubTemplate = $(`
		<div class="hero-hub_img">
			<img style="opacity: 0; pointer-events: none;" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 4095'%3E%3C/svg%3E">
		</div>
		<div class="hero-hub_img-one">
			<picture>
				<source srcset="img/BEFORE-A1.webp" type="image/webp">
				<img src="img/BEFORE-A1.svg" alt="image">
			</picture>
		</div>
		<div class="hero-hub_img-two">
			<picture>
				<source srcset="img/BEFORE-A2.webp" type="image/webp">
				<source srcset="img/BEFORE-A2.png" media="(max-width: 2000px)">
				<img src="img/BEFORE-A2.svg" alt="image">
			</picture>
		</div>
		<div class="hero-hub_img-three">
			<picture>
			<!-- <source srcset="img/BEFORE-A3.webp" type="image/webp"> -->
				<img src="img/BEFORE-A3_last.svg" alt="image">
			</picture>
		</div>
		<div class="hero-hub_img-five">
			<picture>
				<source srcset="img/BEFORE-A4.webp" type="image/webp">
				<img src="img/BEFORE-A4.svg" alt="image">
			</picture>
		</div>
		<div class="hero-hub_img-six">
			<picture>
				<source srcset="img/BEFORE-A5.webp" type="image/webp">
				<img src="img/BEFORE-A5.svg" alt="image">
			</picture>
		</div>
		<div class="hero-hub_img-seven">
			<picture>
				<source srcset="img/BEFORE-A6.webp" type="image/webp">
				<img src="img/BEFORE-A6.svg" alt="image">
			</picture>
		</div>
		<div class="hero-hub_lottie-one" data-lottie-hub-one></div>
		<div class="hero-hub_lottie-two" data-lottie-hub-two></div>
		<div class="hero-hub_lottie-air" data-lottie-hub-air></div>
		<div class="hero-hub_lottie-flag" data-lottie-hub-flag></div>
		<div class="hero-hub_lottie-three" data-lottie-hub-three></div>
		<div class="hero-hub_lottie-five" data-lottie-hub-five></div>
		<div class="hero-hub_lottie-six" data-lottie-hub-six></div>
	`);

	// console.log();
	$('.hero-hub_bg-wrap').height($('.hero-hub_bg-wrap').height());

	$('.hero-hub_bg-wrap').append($hubTemplate);
	$('.hero-hub_img-placeholder').css({'position': 'absolute'});
	// $('.hero-hub_bg-wrap').height('auto');

	gsap.registerPlugin(SplitText);

	const hubTitleSplit = new SplitText(document.querySelector('.hero-hub_tt'), { type: "chars, words" });

	const preloaderTimeline = gsap.timeline({paused: true, onComplete: ()=>{
		$('.hero-hub_bg-wrap').height('auto');
	}});

	// console.log(hubTitleSplit.chars.length)

	const hubTitleAnimation = gsap.from(hubTitleSplit.chars, {
		// paused: true,
		stagger: .1,
		duration: 1.2,
		opacity: 0,
		ease: "expo.out",
		visibility: "visible",
	});

	// .from(splitChars.chars, {
	// 	opacity: 0,
	// 	ease: "expo.out",
	// 	stagger: .06,
	// 	duration: 1.2,
	// 	visibility: "visible",
	// 	delay:0.2
	// })

	gsap.set('.hero-hub_tt', {
		opacity:1
	})

	preloaderTimeline
		.fromTo(document.querySelectorAll('.hero-hub_circle, .hero-hub_txt-bl'), {
			scale: 0.5,
			ease: easeHub
		}, {
			scale: 0.8,
			duration: 3,
		})
		.to(document.querySelectorAll('.hero-hub_circle, .hero-hub_txt-bl'), {
			duration: 1,
			scale: 1,
			ease: 'power3.out',
			overwrite: 'auto'
		}, '-=1')
		.add(hubTitleAnimation, '0')
		.to('.hero-hub_tt', {
			y: 0,
			duration: 1,
			ease: 'power2.out',
		}, '-=1')
		.to('.hero-hub_txt', {
			opacity: 1,
			duration: 0.5,
			ease: 'power2.out',
		}, '-=0.8')
		.to('.hero-hub_icon', {
			scaleY: 1,
			transformOrigin: 'center top',
			duration: 0.8,
			ease: 'expo.out',
		}, '-=0.5')
		.to('.hero-hub_bg-wrap', {
			opacity: 1,
			scale: 1,
			duration: 0,
			ease: 'expo.out',
		}, '-=1.1')

	preloaderTimeline.play();

	window.preloaderTimeline = preloaderTimeline;
}
