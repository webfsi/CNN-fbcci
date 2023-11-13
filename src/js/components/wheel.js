
// WHELL FUNCTION
function Wheel(element, options) {

	var t, e = '';

	element.addEventListener ? t = 'addEventListener' : (t = 'attachEvent', e = "on");
	var n = 'onwheel' in document.createElement('div') ? 'wheel' : void 0 !== element.onmousewheel ? 'mousewheel' : 'DOMMouseScroll';
	'DOMMouseScroll' == n ? element[t](e + 'MozMousePixelScroll', onWheel) : element[t](e + n, onWheel);

	this.destroy = () => {
		element.addEventListener ? t = 'removeEventListener' : (t = 'detachEvent', e = 'on');
		var n = 'onwheel' in document.createElement('div') ? 'wheel' : void 0 !== element.onmousewheel ? 'mousewheel' : 'DOMMouseScroll';
		'DOMMouseScroll' == n ? element[t](e + 'MozMousePixelScroll', onWheel) : element[t](e + n, onWheel);
	}

	var l = [], c = (new Date).getTime();
	var canScroll = !0;

	var getAverage = function(t, e) {
		for (var n = 0, o = t.slice(Math.max(t.length - e, 1)), r = 0; r < o.length; r++)
			n += o[r];
		return Math.ceil(n / e)
	}

	function onWheel(t) {
		var e = (new Date).getTime()
			, n = (t = t || window.event).wheelDelta || -t.deltaY || -t.detail
			, o = Math.max(-1, Math.min(1, n))
			, r = void 0 !== t.wheelDeltaX || void 0 !== t.deltaX
			, i = Math.abs(t.wheelDeltaX) < Math.abs(t.wheelDelta) || Math.abs(t.deltaX) < Math.abs(t.deltaY) || !r;
		149 < l.length && l.shift(),
		l.push(Math.abs(n));
		var a = e - c;
		if (c = e,
		200 < a && (l = []),
		canScroll) {
			var u = (0,
			getAverage)(l, 10);
			(0,
			getAverage)(l, 70) <= u && i && (o < 0 ? (options.onDown()) : (options.onUp()));
		}
	}
}
// end WHELL FUNCTION

//Swipe
function onSwipe(element, options) {
	let touchstartX = 0;
	let touchstartY = 0;
	let touchendX = 0;
	let touchendY = 0;

	const gestureZone = element;

	gestureZone.addEventListener(
		"touchstart",
		function (event) {
			touchstartX = event.changedTouches[0].screenX;
			touchstartY = event.changedTouches[0].screenY;
		},
		false
	);

	gestureZone.addEventListener(
		"touchend",
		function (event) {
			touchendX = event.changedTouches[0].screenX;
			touchendY = event.changedTouches[0].screenY;
			handleGesture();
		},
		false
	);

	function handleGesture() {
		if (touchendX < touchstartX) {
			// console.log('Swiped left');

			if (options.onLeft !== undefined) options.onLeft();
		}

		if (touchendX > touchstartX) {
			// console.log('Swiped right');
			if (options.onRight !== undefined) options.onRight();
		}

		if (touchendY < touchstartY) {
			// console.log("Swiped up");

			if (options.onUp !== undefined) options.onDown();
		}

		if (touchendY > touchstartY) {
			// console.log("Swiped down");

			if (options.onDown !== undefined) options.onUp();
		}

		if (touchendY === touchstartY) {
			// console.log('Tap');
		}
	}
}

export {
	Wheel, onSwipe,
}


