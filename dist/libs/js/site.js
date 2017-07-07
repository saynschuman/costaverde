
$(function() {
		   
	var ios = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i)

	var linck_check_val, food, check_url_our_food, first_ative, this_link, IntervalGallery, horizontal_linck_check_val, horizontal_linck_check_val_slider;
	var finish_wheel = 0;
	var finish = 0;
	
	var current_url = window.location.toString();
	var base_url = window.location.protocol + '//' + window.location.hostname + '/';
	var hash_url = window.location.hash;
	var check_url;
	if(hash_url == ''){check_url = current_url.replace(base_url, '');}
	else{check_url = hash_url.replace('#', ''); window.location = check_url;}
	
	if($.browser.msie && $.browser.version==7){
		$('body').html('<div id="ie7_overlay" style="width:100%; position:fixed; left:0px; top:0px; height:100%; background:#000; z-index:1000; color:#fff; font-size:16px; line-height:18px; text-transform:uppercase;"><div id="ie7_wraper" style="width:500px; position:fixed; left:50%; margin-left:-250px; background:#000; text-align:center; top:50%; margin-top:-250px;"><img src="img/logo.png"/><div class="clear"></div><p><br/>Sorry. The browser you are using is outdated and does not allow you to properly see website"s content. To access this website, you can upgrade your browser to a more recent version by <br/><br/></p><a href="http://ie.microsoft.com/" target="_blank" style="color:#999; font-weight:bold; font-size:25px;">clicking here</a><p><br/>If you have any questions, please contact us </p><div class="clear"></div><div style="width:500px; float:left;"><h3 style="font-size:18px; letter-spacing:-1px;"><br/>Costa Verde Canada Head Office</h3><p style="padding-top:0px;"><br/>Midtown <br/> 370 Oakwood Ave. <br/> Toronto, ON M6E 2W3, <br/> 416-658-9577 </p></div></div></div>');
	}
	
	var bg_ratio, video_ratio;
	
	//********************************************************************************************************************
	//preload
	//********************************************************************************************************************
	function showprogress() {
		if (document.images.length == 0) {return false;}
		var loaded = 0;
		for (var i=0; i<document.images.length; i++) {
			if (document.images[i].complete) {
				loaded++;
			}
		}
		percentage  = (loaded / document.images.length);
	}
	var ID;

	$(window).load(function(){
		function all_rax(){
			if(($(window).height())<750){$('#content, .horizontal_content, .project_slide_out, .project_slide_in, .bg_wrapper').css({'height':'750px'});}
			else{$('#content, .horizontal_content, .project_slide_out, .project_slide_in, .bg_wrapper').css({'height':$(window).height()});};
			$('.bg_wrapper, .horizontal_content_slide, .horizontal_content').width($(window).width());

			$('.background').each(function(){
				var bg_ratio = $(this).width()/$(this).height();
				var wrapper_ratio = $(this).parent().width()/$(this).parent().height();
				if(bg_ratio<wrapper_ratio){
					var center = ($(this).parent().width()/bg_ratio - $(this).parent().height())*(-0.5);
					$(this).css({'left':'0px', 'top':center, 'width':'100%', 'height':'auto'});
				}
				else{
					var center_hor = (bg_ratio*$(this).parent().height() - $(this).parent().width())*(-0.5);
					$(this).css({'left':center_hor, 'top':'0px', 'height':'100%', 'width':'auto'});
				}
			});
			
		}	
		
		$(window).resize(function(){
			all_rax();					  
		});
		
		//********************************************************************************************************************
		//index_template
		//********************************************************************************************************************
		
		function index(){
			all_rax();

			if(refresh_index==1){
				$('#logo_big, .intro_animation').css({'display':'none'});
			}else{
				$('#left_door').delay(1000).animate({'right':'100%'}, 1500, 'easeInOutCubic');
				$('#right_door').delay(1000).animate({'left':'100%'}, 1500, 'easeInOutCubic');
				$('#logo_big').delay(1000).fadeOut(1500, function(){$('.intro_animation').css({'display':'none'});});
			}
		}
		
		//********************************************************************************************************************
		//our food template
		//********************************************************************************************************************
		
		function our_food(){
			all_rax();

			if(refresh_index==1){
				setTimeout(function(){$('.food_title table').fadeIn(500); $('.food_title div').animate({'width':'400px', 'left':'0px'}, 500);}, 1000);
			}
			else{
				$('.food_title table').fadeIn(500); $('.food_title div').animate({'width':'400px', 'left':'0px'}, 500); $('#open_menu').animate({'right':'0px'}, 500);
			}
			IntervalGallery = setInterval(function(){ifg();}, 10000);
		}
		
		function ifg(){$('#right_arrow').click();}
		$('#left_arrow span, #right_arrow span').live("click", function(){
			clearInterval(IntervalGallery);															
		});
		
		//********************************************************************************************************************
		//menu template
		//********************************************************************************************************************
		
		function menu(){
			all_rax();
			if($(window).width()<1100){$('.dishes_wrapper').css({'width':'465px'}); $('.dishes_wrapper img').css({'width':'459px'});}
			else{$('.dishes_wrapper').css({'width':'511px'}); $('.dishes_wrapper img').css({'width':'505px'});}
		}	
		
		//right menu click - show dish
		var dish_open = 0;
		$('#right_part_wrapper td a').live("click", function(){
			var val = $('#right_part_wrapper td a').index(this);
			$('#right_part_wrapper table').fadeOut(1000);
			$('.dishes_wrapper').fadeIn(1000, function(){dish_open = 1;});
			$('.dishes_wrapper div').css({'display':'none', 'z-index':'0'});
			$('.dishes_wrapper div').eq(val).css({'display':'block', 'z-index':'10'});
			return false;
		});
		
		//close image dish
		$('.small_button_right').live("click", function(){												 
			$('#right_part_wrapper table').fadeIn(1000);
			$('.dishes_wrapper').fadeOut(1000, function(){$('.dishes_wrapper div').css({'display':'none', 'z-index':'0'}); dish_open = 0;});
			return false;
		});
		
		//close on whole menu
		$('#menu_wrapper').live("click", function(){
			if(dish_open==1) $('.small_button_right').click();							  
		});

		
		//********************************************************************************************************************
		//text template
		//********************************************************************************************************************
		
		function texttemplate(){
			all_rax();
			setTimeout(function(){
				if($('#map_canvas').length>0)initialize();
				$( "#datepicker" ).datepicker({minDate: 0});				
			}, 1000);
		}
		
		//********************************************************************************************************************
		//form
		//********************************************************************************************************************
		
		var form_finish = 0;
		$('#form_left').live("click", function(){
			if(form_finish) return false;
			form_finish = 1;
			$('.form_in').animate({'left':'+='+464+'px'}, 800, function(){form_finish = 0;});
			$(this).fadeOut(800);
			$('.submit_wrapper input[type="submit"]').fadeOut(800);
			$('#form_right').fadeIn(800);
		});
		
		$('#form_right').live("click", function(){
			if(form_finish) return false;
			form_finish = 1;									
			$('.form_in').animate({'left':'-='+464+'px'}, 800, function(){form_finish = 0;});
			$('#form_left').fadeIn(800);
			$('.submit_wrapper input[type="submit"]').fadeIn(800);
			$(this).fadeOut(800);
		});
		
		/*$('.submit_wrapper input[type="submit"]').live("click", function(){
			$('.form_out').fadeOut(1000);
			$('.thank_you_popup').fadeIn(1000);
			setTimeout(function(){
				$('.form_out').fadeIn(1000);
				$('.thank_you_popup').fadeOut(1000);
			}, 4000);
			return false;															 
		});*/
		
		//********************************************************************************************************************
		//ajax functions
		//********************************************************************************************************************

		function ajax_linck(){
			$.ajax({
				type:"GET",
				async:true,
				url:'ajax_'+check_url,
				success:function(msg){
					if(linck_check_val == 1){
						move_from_bottom_to_top(msg);
					}
					else{
						move_from_top_to_bottom(msg);
					}	
				}
			});
		}
		
		function ajax_linck_horizontal(){
			$.ajax({
				type:"GET",
				async:true,
				url:'ajax_'+check_url,
				success:function(msg){
					if(horizontal_linck_check_val == 1){
						move_from_right_to_left(msg);
					}
					else{
						move_from_left_to_right(msg);
					}	
				}
			});
		}
		
		function ajax_linck_menu_left(){
			$.ajax({
				type:"GET",
				async:true,
				url:'ajax_'+check_url,
				success:function(msg){
					fade_menu_first_level(msg);
				}
			});
		}
		
		function ajax_linck_dishes_slider(){
			$.ajax({
				type:"GET",
				async:true,
				url:'ajax_'+check_url,
				success:function(msg){
					if(horizontal_linck_check_val_slider == 1){
						move_from_right_to_left_slider(msg);
					}
					else{
						move_from_left_to_right_slider(msg);
					}	
				}
			});
		}

		
		function move_from_top_to_bottom(msg){
			$(msg).insertBefore('.horizontal_content:first');
			all_rax();
			$('.vertical_content_in').css({'top':(-1)*$('#content').height()});
			ID = window.setInterval(function(){
				 showprogress();
				 if (percentage == 1) {
					window.clearInterval(ID);
					$('#loader_wrapper').css({'display':'none'});
					percentage = 0;
					var string_template = $('.horizontal_content_slide').eq(0).attr('data-template');
					eval(string_template+'()');
					$('.vertical_content_in').animate({'top':'0px'}, 1000, 'easeInOutCubic', function(){
						$('.horizontal_content').eq(1).remove();
						finish = 0;
						page_back_var = 0;
						finish_wheel = 0;
					});
				}
			}, 100);
		}
		
		function move_from_bottom_to_top(msg){
			
			$(msg).insertAfter('.horizontal_content:first');
			all_rax();
			ID = window.setInterval(function(){
				 showprogress();
				 if (percentage == 1) {
					window.clearInterval(ID);
					$('#loader_wrapper').css({'display':'none'});
					percentage = 0;
					var string_template = $('.horizontal_content_slide').eq(1).attr('data-template');
					eval(string_template+'()');
					$('.vertical_content_in').animate({'top':'-=' + $('#content').height() + 'px'}, 1000, 'easeInOutCubic', function(){
						$('.horizontal_content').eq(0).remove();
						$('.vertical_content_in').css({'top':'0px'});
						finish = 0;
						page_back_var = 0;
						finish_wheel = 0;
					});
				}
			}, 100);
		}
		
		function move_from_right_to_left(msg){
			$('.vertical_content_in').width($(window).width()*3);
			$(msg).insertAfter('.horizontal_content:first');

			all_rax();
			ID = window.setInterval(function(){
				 showprogress();
				 if (percentage == 1) {
					window.clearInterval(ID);
					$('#loader_wrapper').css({'display':'none'});
					percentage = 0;
					var string_template = $('.horizontal_content_slide').eq(1).attr('data-template');
					eval(string_template+'()');
					$('.vertical_content_in').animate({'left':'-=' + $(window).width() + 'px'}, 1000, 'easeInOutCubic', function(){
						$('.horizontal_content').eq(0).remove();
						$('.vertical_content_in').css({'left':'0px', 'width':$(window).width()});
						finish = 0;
						page_back_var = 0;
						finish_wheel = 0;
					});
				}
			}, 100);
		}
		
		function move_from_left_to_right(msg){
			$('.vertical_content_in').width($(window).width()*3);
			$(msg).insertBefore('.horizontal_content:first');

			$('.vertical_content_in').css({'left':'-=' + $(window).width() + 'px'});
			all_rax();
			ID = window.setInterval(function(){
				 showprogress();
				 if (percentage == 1) {
					window.clearInterval(ID);
					$('#loader_wrapper').css({'display':'none'});
					percentage = 0;
					var string_template = $('.horizontal_content_slide').eq(0).attr('data-template');
					eval(string_template+'()');
					$('.vertical_content_in').animate({'left':'0px'}, 1000, 'easeInOutCubic', function(){
						$('.horizontal_content').eq(1).remove();
						$('.vertical_content_in').css({'width':$(window).width()});
						finish = 0;
						page_back_var = 0;
						finish_wheel = 0;
					});
				}
			}, 100);
		}
		
		function fade_menu_first_level(msg){
			$('.menu_temp_wrapper').html(msg);
			$('#right_part').fadeOut(1000, function(){
				var obj = $('.menu_temp_wrapper').find('#right_part_wrapper').clone('true');
				$('#right_part_wrapper').eq(0).replaceWith(obj);
				$('.menu_temp_wrapper').html('');
				ID = window.setInterval(function(){
					showprogress();
					if (percentage == 1) {
						window.clearInterval(ID);
						$('#loader_wrapper').css({'display':'none'});
						percentage = 0;
						var string_template = $('.horizontal_content_slide').eq(0).attr('data-template');
						eval(string_template+'()');
						$('#right_part').fadeIn(1000, function(){
							finish = 0;
							page_back_var = 0;
							finish_wheel = 0;
						});
					}
				}, 100);
			});
		}
		
		function move_from_right_to_left_slider(msg){
			$('.menu_temp_wrapper').html(msg);
			ID = window.setInterval(function(){
				showprogress();
				if (percentage == 1) {
					window.clearInterval(ID);
					$('#loader_wrapper').css({'display':'none'});
					percentage = 0;
					var obj = slider_clone();
					$(obj).insertAfter('.bg_wrapper:first');
					all_rax();
					$('.project_slide_in').animate({'left':'-='+$(window).width()}, 1000, function(){
						$('.bg_wrapper').eq(0).remove();
						$('.project_slide_in').css({'left':'0px'});
						finish = 0;
						page_back_var = 0;
						finish_wheel = 0;
					});
				}
			}, 100);

		}
		
		function move_from_left_to_right_slider(msg){
			$('.menu_temp_wrapper').html(msg);
			ID = window.setInterval(function(){
				showprogress();
				if (percentage == 1) {
					window.clearInterval(ID);
					$('#loader_wrapper').css({'display':'none'});
					percentage = 0;
					var obj = slider_clone();
					$(obj).insertBefore('.bg_wrapper:first');
					$('.project_slide_in').css({'left':(-1)*$(window).width()});
					all_rax();
					$('.project_slide_in').animate({'left':'0px'}, 1000, function(){
						$('.bg_wrapper').eq(1).remove();
						finish = 0;
						page_back_var = 0;
						finish_wheel = 0;
					});
				}
			}, 100);

		}
		
		function slider_clone(){
			var obj = $('.menu_temp_wrapper').find('.bg_wrapper').clone('true');
			var obj_text = $('.menu_temp_wrapper').find('.background').attr('alt');
			$('.round_content_food .dishes_slider_link').eq(0).attr('href', $('.menu_temp_wrapper .dishes_slider_link').eq(0).attr('href'));
			$('.round_content_food .dishes_slider_link').eq(1).attr('href', $('.menu_temp_wrapper .dishes_slider_link').eq(1).attr('href'));
			$('.menu_temp_wrapper').html('');
			
			$('.food_title table').fadeOut(500, function(){
				$(this).find('span').text(obj_text);
				$(this).fadeIn(500);
			});
		
			$('.food_title div').animate({'width':'70px', 'left':'160px'}, 250, function(){$('.food_title div').animate({'width':'400px', 'left':'0px'}, 250);});
			return obj;
		};
	

		refresh_index = 0;
		$('.linck_check').live("click", function(){
			if($(this).hasClass('active') && $(this).attr('href')==check_url) return false;		
			if(finish) return false;
			finish = 1;
			clearInterval(IntervalGallery);	
			$('#loader_wrapper').css({'display':'block'});
			refresh_index = 1;
			if(parseInt($(this).attr('data-val'))>parseInt($('.linck_check.active').attr('data-val'))){linck_check_val = 1;}
			else{linck_check_val = 0;}	
			$('.linck_check.active').removeClass('active');
			$(this).addClass('active');
			check_url = $(this).attr('href');
			$('.linck_check[href="'+check_url+'"]').addClass('active');
			//if($.browser.msie && $.browser.version==7){check_url = check_url.replace(base_url, '');};
			setLocation(check_url);
			ajax_linck();
			return false;
		});
		
		$('.horizontal_linck_check').live("click", function(){	
			if(finish) return false;
			finish = 1;
			clearInterval(IntervalGallery);	
			$('#loader_wrapper').css({'display':'block'});
			refresh_index = 1;
			if($(this).attr('data-direction')=='to_left'){horizontal_linck_check_val = 1;}
			else{horizontal_linck_check_val = 0;}	
			check_url = $(this).attr('href');
			//if($.browser.msie && $.browser.version==7){check_url = check_url.replace(base_url, '');};
			setLocation(check_url);
			ajax_linck_horizontal();
			return false;
		});
		
		$('.menu_left_a').live("click", function(){		
			if(finish) return false;
			finish = 1;	
			clearInterval(IntervalGallery);	
			$('#loader_wrapper').css({'display':'block'});
			refresh_index = 1;
			$('.menu_left_a.active').removeClass('active');
			$(this).addClass('active');
			check_url = $(this).attr('href');
			setLocation(check_url);
			ajax_linck_menu_left();
			return false;
		});
		
		$('.dishes_slider_link').live("click", function(){
			if(finish) return false;
			finish = 1;	
				
			$('#loader_wrapper').css({'display':'block'});
			refresh_index = 1;
			if($(this).attr('data-direction')=='to_left'){horizontal_linck_check_val_slider = 1;}
			else{horizontal_linck_check_val_slider = 0;}
			check_url = $(this).attr('href');
			setLocation(check_url);
			ajax_linck_dishes_slider();
			return false;											
		});

		function setLocation(curLoc){
		  try {
		   if(page_back_var == 0) history.pushState(null, null, curLoc);
		   return false;
		  } catch(e) {}
		  location.hash = '#' + curLoc;
		}
		
		var string_template = $('.horizontal_content_slide').attr('data-template');
		eval(string_template+'()');
		$('#loader_wrapper').css({'display':'none', 'background-color':'transparent'});
		var page_back_var = 0;
		
		all_rax();
		
		//********************************************************************************************************************
		//back button
		//********************************************************************************************************************
		
		var resized_v = 0;
		setTimeout(function(){
			resized_v = 1;
			$(window).bind("popstate", pageBack);
			//window.addEventListener("hashChange", pageBack, false);
			$(window).bind('hashchange', function() {pageBack();});
		}, 100);
		
		function pageBack(){
			clearInterval(IntervalGallery);	
			page_back_var = 1;
			current_url = window.location.toString();
			base_url = window.location.protocol + '//' + window.location.hostname + '/';
			hash_url = window.location.hash;
			if(hash_url == ''){check_url = current_url.replace(base_url, '');}
			else{check_url = hash_url.replace('#', '');}
	
			if($('a[href="'+check_url+'"]').length>0) $('a[href="'+check_url+'"]').click();
			else{
				if(check_url==''){
					$('header nav ul li a').eq(0).click();
				}
				else{
					listings_val = 0;
					$('#loader_wrapper').css({'display':'block'});
					refresh_index = 1;
					horizontal_linck_check_val = 0;
					$('.linck_check.active').removeClass('active');
					ajax_linck_horizontal();
				}
			}
			return false;
		}
		
		//********************************************************************************************************************
		//mousewheel
		//********************************************************************************************************************
		
		var finish_wheel = 0;
		$('#content_block').mousewheel(function(event, delta) {
			if($(window).height()<$(document).height()) return false;	
			if($('#menu_wrapper').length > 0) return false;
			if(finish_wheel) return false;	
			finish_wheel = 1;
			var val_wheel;								   
			if (delta < 0) {val_wheel = parseInt($('.linck_check.active').attr('data-val')) + 1;}
			else if (delta > 0) {val_wheel = parseInt($('.linck_check.active').attr('data-val')) - 1;}
			if(val_wheel<0 || val_wheel==$('.linck_check[data-val]').length){val_wheel = 0; finish_wheel = 0; return false;}
			$('.linck_check[data-val="'+val_wheel+'"]').click();
			event.preventDefault();
		});

	});

	//input script
	$('input[type="text"], textarea').live("focus", function(){
        def_val = $(this)[0].defaultValue;
        if ($(this).val() == def_val) $(this).val('');
    });
    
    $('input[type="text"], textarea').live("blur", function(){
        def_val = $(this)[0].defaultValue;
        if ($(this).val() == '') $(this).val(def_val);
    });
	
	//click on tag
	$('.styled_tag a').live("click", function(){
		var next_tag = parseInt($('nav a.active').attr('data-val')) + 1;
		$('nav a').eq(next_tag).click();	  
	});
	

	//google map
	var left_contact = 0;
	var right_contact = 0;
	var check_ad = 0;
	
	$('.open_google_map').live("click", function(){
		var obj = $(this);										 
		if(check_ad == 0){										 
			map_nav(obj);
		}
		else{
			if(left_contact==1){$('#map_canvas_wrapper').animate({'left':'-100%'}, 1000, function(){map_nav(obj);});}
			else{$('#map_canvas_wrapper').animate({'left':'100%'}, 1000, function(){map_nav(obj);});}
			$('.open_google_map.active').removeClass('active');
			infowindow.close();
			infowindow1.close();
		}
		
	});
	
	function map_nav(obj){
		if(obj.hasClass('address_left')){
			$('#map_canvas_wrapper').css({'left':'-100%'});
			left_contact = 1;
			right_contact = 0;
		}
		else{
			$('#map_canvas_wrapper').css({'left':'100%'});
			left_contact = 0;
			right_contact = 1;
		}
		
		$('.open_google_map.active').removeClass('active');
		obj.addClass('active');
		var val_act = $('.open_google_map').index(obj);
		var coord1 = obj.attr('data-lng_val');
		var coord2 = obj.attr('data-lat_val');
		var location = new google.maps.LatLng(coord2,coord1);
		if(val_act==0){
			moveto_region(location, 15);
			infowindow.open(map,marker);
		}
		if(val_act==1){
			moveto_region(location, 15);
			infowindow1.open(map,marker1);
		}
		$('#map_canvas_wrapper').animate({'left':'0%'}, 1000);
		check_ad = 1;
	}
	
	$('#close_map').live("click", function(){								
		if(left_contact==1){$('#map_canvas_wrapper').animate({'left':'-100%'}, 1000);}
		else{$('#map_canvas_wrapper').animate({'left':'100%'}, 1000);}
		$('.open_google_map.active').removeClass('active');
		infowindow.close();
		infowindow1.close();
		check_ad = 0;
	});
		
	var m_h, map, marker, marker1, marker2, infowindow, infowindow1, infowindow2;

	var contentString = '<h2>Midtown</h2> <p>370 Oakwood Ave.<br/><i>Toronto, ON M6E 2W3, </i><br/><b>416-658-9577</b></p>'
	
	var contentString1 = '<h2>North</h2> <p>3737 Major Mackenzie Dr.W<br/><i>Woodbridge, ON , L4H 0A2</i><br/><b>905-832-2918</b></p>'

	function moveto_region(location,zoom_level) {
		map.setZoom(zoom_level);
		map.setCenter(location);
	}

	function initialize() {

		var myLatlng = new google.maps.LatLng(43.653226,-79.383184);
		var myLatlng_center = new google.maps.LatLng(43.653226,-79.383184);
		
		var myLatlng = new google.maps.LatLng(43.68772,-79.438941);
		var myLatlng1 = new google.maps.LatLng(43.844751,-79.558525);

		var mapOptions = {
			zoom: 15,
			
			panControl: true,
			panControlOptions: {
				position: google.maps.ControlPosition.LEFT_BOTTOM
			},
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE,
				position: google.maps.ControlPosition.LEFT_BOTTOM
			},
			streetViewControl: true,
			streetViewControlOptions: {
				position: google.maps.ControlPosition.LEFT_BOTTOM
			},
			
			center: myLatlng_center,
			mapTypeId: google.maps.MapTypeId.ROADMAP

		}
		map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		
		infowindow = new google.maps.InfoWindow({
			content: contentString
		});

		marker = new google.maps.Marker({
			position: myLatlng,
			map: map
		});
		
		infowindow1 = new google.maps.InfoWindow({
			content: contentString1
		});

		marker1 = new google.maps.Marker({
			position: myLatlng1,
			map: map
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
			infowindow1.close();
		});
		
		google.maps.event.addListener(marker1, 'click', function() {
			infowindow1.open(map,marker1);
			infowindow.close();
		});
		
			
	}
	
	//submitting form
	
	$('.form_out input[type="submit"]').live("click", function(){
						   
		$('.error_class').removeClass('error_class');						   
		msg = 'The following fields should be filled:';
        error = 0;
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		
		var pattern_q = new RegExp(/^[0-9]+$/);
		
		var pattern_ph = new RegExp(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);

		if ($.trim($('.form_out input[name="name"]').val()) == '*name') {error = 1; $('.form_out input[name="name"]').addClass('error'); msg = msg +  '\n - Name';}
        if (!pattern.test($.trim($('.form_out input[name="email"]').val()))) {error = 1; $('.form_out input[name="email"]').addClass('error'); msg = msg +  '\n - Email';}
		if (!pattern_ph.test($.trim($('.form_out input[name="phone"]').val()))) {error = 1; $('.form_out input[name="phone"]').addClass('error'); msg = msg +  '\n - Phone (xxx-xxx-xxxx)';}
		
		if (!pattern_q.test($.trim($('.form_out input[name="number_guests"]').val()))) {error = 1; $('.form_out input[name="number_guests"]').addClass('error'); msg = msg +  '\n - Number Of Guests (numbers only)';}

		if ($.trim($('.form_out input[name="select_date"]').val()) == '*select date') {error = 1; $('.form_out input[name="select_date"]').addClass('error'); msg = msg +  '\n - Select Date';}
		
        if (error){
			$('.error_popup p').html(msg);
			$('.form_out').fadeOut(1000);
			$('.error_popup').fadeIn(1000);
			setTimeout(function(){				
				$('.error').addClass('error_class').removeClass('error');
				$('.form_out').fadeIn(1000);
				$('.error_popup').fadeOut(1000);
			}, 4000);
			return false;
        }else{
            url = 'send_mail.php';
            name = $('.form_out input[name="name"]').val();
			email = $('.form_out input[name="email"]').val();
			phone = $('.form_out input[name="phone"]').val();
			number_guests = $('.form_out input[name="number_guests"]').val();
			select_date = $('.form_out input[name="select_date"]').val();
			var text = $('.form_out textarea[name="text"]').val();
			if(text=='message') text='';

            $.post(url,{'name':name,'email':email,'phone':phone,'number_guests':number_guests,'select_date':select_date,'text':text},function(data){
	        	$('.form_out').fadeOut(1000);
				$('.thank_you_popup').fadeIn(1000);
				setTimeout(function(){
					$('.form_out').fadeIn(1000);
					$('.thank_you_popup').fadeOut(1000, function(){window.location.reload();});
				}, 4000);
			});
			return false;
        }
	  	return false;
	});

});

//share///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CalculatePosition(tp_width, tp_height){
	tp_left = parseInt((screen.availWidth/2) - (tp_width/2));
	tp_top = parseInt((screen.availHeight/2) - (tp_height/2));
	return "width=" + tp_width + ",height=" + tp_height + ",status,resizable,left=" + tp_left + ",top=" + tp_top + "screenX=" + tp_left + ",screenY=" + tp_top;
}

var OpenShareWindow_pinterestEvent = false;
function OpenShareWindow(_social, _width, _height){
	
	var _url;
	var current_url = window.location.toString();
	var base_url = window.location.protocol + '//' + window.location.hostname + '/';
	var hash_url = window.location.hash;
	if(hash_url == ''){_url = current_url;}
	else{_url = base_url + hash_url.replace('#', '');}
	
	_url = escape(_url);

	_media = window.location.protocol + '//' + window.location.hostname + '/' + $('.background').attr('src');
	switch(_social){
		case 'f':
			window.open('http://www.facebook.com/sharer.php?u='+_url,'sharer',CalculatePosition(_width,_height));
		break;
		case 't':
			window.open('http://twitter.com/home?status='+_url,'sharer',CalculatePosition(_width,_height));
		break;
		case 'p':
			window.open('http://pinterest.com/pin/create/bookmarklet/?url=' + _url + '&media=' + _media,'sharer',CalculatePosition(_width,_height));
		break;
	}
	return false;
}

	
	