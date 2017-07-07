$(function() {
	
	$('#fullpage').fullpage({   
		anchors:['index', 'food', 'about', 'catering', 'contact'], 
	    afterLoad: function (anchorLink, index) {
	            $('.linck_check').removeClass('active');
	            $('a[href="#'+anchorLink+'"]').addClass('active');
	            if(anchorLink == 'food') {
		            setTimeout(function(){
					  $('#spoon').css('opacity', 1);
					  $('#open_menu').css('opacity', 1);
					}, 100);
					setTimeout(function(){
					  $( ".food_title #food-title-text" ).animate({
					    width: "300px"
					  }, 1000, function() {
					    
					  });
					  $('#spoon_text').css('opacity', 1);
					}, 300);

					
				} else if (anchorLink == 'about') {
					setTimeout(function(){
					  $( "#food-title-text-2" ).animate({
					    width: "400px"
					  }, 1100, function() {
					    
					  });
					  $('#did-you-know').css('opacity', '1');
					}, 300);
					
				} else {
					$('#spoon').css('opacity', 0);
					$('#spoon_text').css('opacity', 0);
					$('#open_menu').css('opacity', 0);
					$('.food_title #food-title-text').css('width', '90px');
					$('.food_title #food-title-text-2').css('width', '90px');
					$('#did-you-know').css('opacity', '0');
				}
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
	$( "#datepicker" ).datepicker({minDate: 0});
	
	$('#form_right').click(function(e){
		e.preventDefault();
		$('.form_slide').css('transform', 'translateX(-100%)');
		$('#form_right').css('opacity', '0');
		$('#form_left').css('opacity', '1');
		$('#submit-form').css('opacity', '1');
	})
	$('#form_left').click(function(e){
		e.preventDefault();
		$('.form_slide').css('transform', 'translateX(0)');
		$('#form_left').css('opacity', '0');
		$('#form_right').css('opacity', '1');
		$('#submit-form').css('opacity', '0');;
	})

	$('#spoon a').click(function(){
		setTimeout(function(){
			var text = $('#carouselExampleControls .active').attr('data-text');
			$('#insert-text').html(text);

			$( "#food-title-text" ).animate({
			    width: "300px",
			    opacity: 1
			}, 1000, function() {
			    
			});
			$( "#insert-text" ).animate({
			    opacity: 1
			}, 1000, function() {
			    
			});
		}, 800);
		$('#food-title-text').css({
			width: '90px',
			opacity: 0
		});
		$('#insert-text').css('opacity', '0');
	});

	$('#open_menu').click(function(e){
		e.preventDefault();
		$('#menu-outer').addClass('show-menu');
	})

	$('#close_menu').click(function(e){
		e.preventDefault();
		$('#menu-outer').removeClass('show-menu');

	})
});