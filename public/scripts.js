'use strict';
/**
 * INSPINIA - Responsive Admin Theme
 * 2.2
 *
 * Custom scripts
 */

$(document).ready(function() {

	// Full height
	function fixHeight() {
		var heightWithoutNavbar = $('body > #wrapper').height() - 61;
		$('.sidebard-panel').css('min-height', heightWithoutNavbar + 'px');

		var navbarHeigh = $('nav.navbar-default').height();
		var wrapperHeigh = $('#page-wrapper').height();

		if (navbarHeigh > wrapperHeigh) {
			$('#page-wrapper').css('min-height', navbarHeigh + 'px');
		}

		if (navbarHeigh < wrapperHeigh) {
			$('#page-wrapper').css('min-height', $(window).height() + 'px');
		}

		if ($('body').hasClass('fixed-nav')) {
			$('#page-wrapper').css('min-height', $(window).height() - 60 + 'px');
		}
	}

	$(window).bind('load resize scroll', function() {
		if (!$('body').hasClass('body-small')) {
			fixHeight();
		}
	});

	setTimeout(function() {
		fixHeight();
	});
});

// Minimalize menu when screen is less than 768px
$(function() {
	$(window).bind('load resize', function() {
		if ($(this).width() < 769) {
			$('body').addClass('body-small');
		} else {
			$('body').removeClass('body-small');
		}
	});
});
