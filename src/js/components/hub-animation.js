import gsap from 'gsap';

// hub animations FUNCTION


let easeHub = 'Power2.easeInOut';
const findHub = document.querySelectorAll('[data-hub-scroll]')[0];
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
		color: bgStart,
	}, {
		yPercent: circlTo,
		color: bgEnd,
		duration: durationImg,
		ease: 'Power3.easeInOut',
	});
}
// end animation HUB function

// end hub animations FUNCTION

export {
	animHubText, animHub,
}


