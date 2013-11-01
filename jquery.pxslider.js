/*
 * jQuery pxSlider v1.2
 * Author: Javier Otero
 * http://www.thepixellary.com/
 *
 * Copyright 2013 ThePixellary
 * Free to use under the GPLv2 license.
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 */
(function($) {

	$.pxSlider = function(element, options) {
		var defaults = {
			speed: 500,
			currentSlide: 0,
			slideWidth: 960,
			slideHeight: 'auto',
			slidesCount: 0,	
			slideStart: 0, //TO-DO
			pagination: true,
			auto: false,  
			autoTimer: 5000,  
			effect: 'scroll', //TO-DO		
			circular: false, 
			prevButton: 'px-left', 		
			nextButton: 'px-right', 		
			pager: 'px-thumbs', //TO-DO		
			onSlideBefore: function() {},
			onSlideAfter: function() {},
			onSlideLoaded: function() {}  //TO-DO
		}

		var plugin = this;

		plugin.settings = {}

		var $element = $(element),
		element = element;

		plugin.init = function() {
			plugin.settings = $.extend({}, defaults, options);

			plugin.settings.slidesCount = $element.children().size();

			$element
				.wrapAll('<div class="px-slider-wrapper"></div>')
				.wrapAll('<div class="px-slider-container"></div>');
			var wrapper = $element.parent().parent();

			wrapper	
				.css({ 'width': plugin.settings.slideWidth, 'height': plugin.settings.slideHeight })	
				.prepend('<a href="#" class="px-control" id="'+ plugin.settings.prevButton +'">prev</a>')
				.append('<a href="#" class="px-control" id="'+ plugin.settings.nextButton +'">next</a>')

			if( plugin.settings.pagination ){
				wrapper.append('<div class="px-thumbs"></div>');
				$element.children().each(function(){
					var i = $(this).index();
					$('.px-thumbs', wrapper ).append('<div class="px-thumb-box" data-id="'+ i +'"><a href="#" data-id="'+i+'">'+i+'</a></div>');
				});
				//pager navigation
				$('.px-thumb-box a',wrapper ).click( function(e){
					goToSlide( $(this).data('id') );
					e.preventDefault();
				});
			}

			$element.css({'width': plugin.settings.slideWidth * plugin.settings.slidesCount, 'position':'relative' });

			$element.children().css({'float': 'left','position': 'relative', 'width': plugin.settings.slideWidth });	

			setNavigation(0);
			
			if( plugin.settings.auto ){ 
				//Assign a timer, so it will run periodically
				slideShowInterval = setInterval(function(){
					$('#' + plugin.settings.nextButton, wrapper ).trigger('click');
				}, plugin.settings.autoTimer );
			}

			$('.px-control', wrapper ).bind('click', function(){
				if( plugin.settings.circular ){

					var direction = ($(this).attr('id') == plugin.settings.nextButton )?'next':'prev';
						
					if( plugin.settings.currentSlide == 0 && direction == 'prev'){
						goToSlide( plugin.settings.slidesCount-1 );
					}else if( plugin.settings.currentSlide == plugin.settings.slidesCount-1  && direction == 'next'){
						goToSlide( 0 );
					}else{
						var newposition = ($(this).attr('id')==plugin.settings.nextButton) ? plugin.settings.currentSlide+1 : plugin.settings.currentSlide-1;
						goToSlide( newposition );
					}
				} else {
					if( plugin.settings.currentSlide >= 0 && plugin.settings.currentSlide < plugin.settings.slidesCount){
						var newposition = ($(this).attr('id')==plugin.settings.nextButton) ? plugin.settings.currentSlide+1 : plugin.settings.currentSlide-1;
						goToSlide( newposition );
					}
				}
				return false;
			});
		}

		var sliderAuto = function(){
			var wrapper = $element.parent().parent();
			//$('.px-control #' + plugin.settings.nextButton, wrapper ).trigger('click');
			alert('99');
		}

		plugin.goToSlide = function(index) {           
			goToSlide(index);
		}

		var goToSlide = function( index ){
			if( index >= 0 && index < plugin.settings.slidesCount){
				plugin.settings.onSlideBefore(plugin.settings.currentSlide);
				plugin.settings.currentSlide = index;
				$element.animate({
					'marginLeft' : plugin.settings.slideWidth*(-plugin.settings.currentSlide)
				}, plugin.settings.speed, 'swing', plugin.settings.onSlideAfter(index) );
				setNavigation(plugin.settings.currentSlide);
			}
		}

		var setNavigation = function( index ){
			var wrapper = $element.parent().parent();
			$('a.px-control' , wrapper ).removeClass('disabled');
			
			if( !plugin.settings.circular ){ //we don't want to hide prev/next if we want circular slider
				
				if(index == 0){ // Hide left arrow if index is first slide
					$('#'+ plugin.settings.prevButton , wrapper).addClass('disabled');
				}
				if(index == plugin.settings.slidesCount-1){ // Hide right arrow if index is last slide
					$('#'+ plugin.settings.nextButton, wrapper).addClass('disabled'); 
				}
			}
			
			if( plugin.settings.pagination ){
				// pager
				$('.px-thumb-box a', wrapper).removeClass('current');
				$('.px-thumb-box a[data-id='+index+']', wrapper ).addClass('current');
			}
		}				

		plugin.init();
	}

	$.fn.pxSlider = function(options) {
		return this.each(function() {
			if (undefined == $(this).data('pxSlider')) {
				var plugin = new $.pxSlider(this, options);
				$(this).data('pxSlider', plugin);
			}
		});
	}

})(jQuery);
