$(function () {
	AOS.init({
		once: false,
		startEvent: 'load',
		offset: 200,
		disable: function () {
			//var maxWidth = 1024;
			//return window.innerWidth < maxWidth;
		}
	});

	function fnWinInfo() {
		window.scrY = $(window).scrollTop();
		window.scrX = $(window).scrollLeft();
		window.winH = $(window).innerHeight();
		window.winW = $(window).innerWidth();
	} //fnWinInfo

	fnWinInfo();
	$(window)
		.scroll(function () {
			fnWinInfo();
		})
		.resize(function () {
			fnWinInfo();
		}); //windowEvt
	
	$('.top_btn').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 400);
	});

	const fnON = () => {
		if(scrY >= $('#section1').offset().top - 90 && scrY < $('#contents-contest').offset().top - 90 ){
			$('.nav_wrap ul li').removeClass('on')
			$('.nav_wrap ul li:nth-child(2)').addClass('on')
		}else if(scrY >= $('#contents-contest').offset().top - 90 ){
			$('.nav_wrap ul li').removeClass('on')
			$('.nav_wrap ul li:nth-child(3)').addClass('on')
		}
	}
	
	$('.nav_wrap ul li:nth-child(2) a').click(function(e){
		e.preventDefault();
		$('body,html').animate({
			scrollTop: $('#section1').offset().top -90
		}, 400);
	})
	
	$('.nav_wrap ul li:nth-child(3) a').click(function(e){
		e.preventDefault();
		$('body,html').animate({
			scrollTop: $('#contents-contest').offset().top - 90
		}, 400);
	})
	
	

	/* Header Sticky */
	const fnHeaderSticky = () => {
		let offsetNavT = $('#container').offset().top
		if (scrY >= offsetNavT) {
			$(`#nav_box`).addClass("sticky");
		} else {
			$(`#nav_box`).removeClass("sticky");
		} //if
	}

	fnHeaderSticky()
	fnON()
	$(window).scroll(function () {
		fnON()
		fnHeaderSticky()
	}).resize(function () {
		fnON()
		fnHeaderSticky()
	})

	/*
	$('.pop_btn').on('click', function() {
		$('.pop_cont').toggleClass('open');
		$('body,html').toggleClass('scroll');
		return false;
	}); */

});