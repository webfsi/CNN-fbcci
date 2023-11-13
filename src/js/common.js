import setFullHeight from './helpers/setFullHeight';

//gsap
import gsap from 'gsap';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

import lottie from "lottie-web";
import LocomotiveScroll from 'locomotive-scroll';
import $ from "jquery";
// import { exportAnimations } from "./delete/animation-copy.js";


import preloader from "./components/preloader.js";
import header from "./components/header.js";
import scroll from "./components/scroll.js";
// import animation from "./delete/animation-copy.js";
import video from "./components/video.js";
import { Wheel, onSwipe } from './components/wheel.js';

// require('./SplitText.min.js');

var ev = function (eventName, data, target) {
	var target = target ? target : document;
	var e = new CustomEvent(eventName, { detail: data });
	target.dispatchEvent(e);
};

window.ev = ev;

export default () => {
	preloader(gsap, $);
	setFullHeight(); //Set VH variable for mobile safari 100VH, use scss mixin fullheight()

	scroll(lottie, gsap, ScrollTrigger, ScrollToPlugin, LocomotiveScroll, Wheel, onSwipe, $);
	// animation(gsap, lottie, ScrollTrigger);
	video(gsap, ScrollTrigger, $);
	header($);

};
