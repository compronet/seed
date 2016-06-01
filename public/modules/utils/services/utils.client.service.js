/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

(function() {
	'use strict';

	angular
		.module('utils')
		.service('Utils', Utils);

	Utils.$inject = ['$window', 'APP_MEDIAQUERY'];

	function Utils($window, APP_MEDIAQUERY) {

		var $html = angular.element('html');
		var $win = angular.element($window);
		var $body = angular.element('body');

		return {
			// DETECTION
			support: {
				transition: (function() {
					var transitionEnd = (function() {

						var element = document.body || document.documentElement;
						var transEndEventNames = {
							WebkitTransition: 'webkitTransitionEnd',
							MozTransition: 'transitionend',
							OTransition: 'oTransitionEnd otransitionend',
							transition: 'transitionend'
						};
						var name;

						for (name in transEndEventNames) {
							if (element.style[name] !== undefined) {
								return transEndEventNames[name];
							}
						}
					}());

					return transitionEnd && {
						end: transitionEnd
					};
				})(),

				animation: (function() {

					var animationEnd = (function() {

						var element = document.body || document.documentElement;
						var animEndEventNames = {
							WebkitAnimation: 'webkitAnimationEnd',
							MozAnimation: 'animationend',
							OAnimation: 'oAnimationEnd oanimationend',
							animation: 'animationend'
						};
						var name;

						for (name in animEndEventNames) {
							if (element.style[name] !== undefined) {
								return animEndEventNames[name];
							}
						}
					}());

					return animationEnd && {
						end: animationEnd
					};
				})(),

				requestAnimationFrame: window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					function(callback) {
						window.setTimeout(callback, 1000 / 60);
					},
				/*jshint -W069*/
				touch: (
					('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
					(window.DocumentTouch && document instanceof window.DocumentTouch) ||
					(window.navigator.msPointerEnabled && window.navigatormsMaxTouchPoints > 0) || //IE 10
					(window.navigator.pointerEnabled && window.navigatormaxTouchPoints > 0) || //IE >=11
					false
				),

				mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
			},

			// UTILITIES
			isInView: function(element, options) {
				/*jshint -W106*/
				var $element = $(element);

				if (!$element.is(':visible')) {
					return false;
				}

				var windowLeft = $win.scrollLeft();
				var windowTop = $win.scrollTop();
				var offset = $element.offset();
				var left = offset.left;
				var top = offset.top;

				options = $.extend({
					topoffset: 0,
					leftoffset: 0
				}, options);

				if (top + $element.height() >= windowTop && top - options.topoffset <= windowTop + $win.height() &&
					left + $element.width() >= windowLeft && left - options.leftoffset <= windowLeft + $win.width()) {
					return true;
				} else {
					return false;
				}
			},

			langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',

			isTouch: function() {
				return $html.hasClass('touch');
			},

			isSidebarCollapsed: function() {
				return $body.hasClass('aside-collapsed');
			},

			isSidebarToggled: function() {
				return $body.hasClass('aside-toggled');
			},

			isMobile: function() {
				return $win.width() < APP_MEDIAQUERY.tablet;
			}

		};
	}
})();
