$(function() {
	
	$('#fullpage').fullpage({   
		anchors:['index', 'food', 'about', 'catering', 'contact'], 
	    afterLoad: function (anchorLink, index) {
	            $('.linck_check').removeClass('active');
	            $('a[href="#'+anchorLink+'"]').addClass('active');
	            
	    },
	});


	$('.slides').slick({
	  	cssEase: 'linear',
	  	autoplay: true,
	  	dots: false,
	  	autoplaySpeed: 3000,
	  	prevArrow: '<div class="prev"></div>',
		nextArrow: '<div class="next"></div>'
	})

	$('#left_arrow').click(function(e){
		e.preventDefault();
	})
	$('#right_arrow').click(function(e){
		e.preventDefault();
	})
		
		$('#left_door').delay(1000).animate({'right':'100%'}, 1500, 'easeInOutCubic');
		$('#right_door').delay(1000).animate({'left':'100%'}, 1500, 'easeInOutCubic');
		$('#logo_big').delay(1000).fadeOut(1500, function(){$('.intro_animation').css({'display':'none'});});
});


