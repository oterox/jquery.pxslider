(function($){
	$.fn.pxslider = function( option ) {
		
		var defaults = {  
			slideWidth: 730,				
			onSlideBefore: function() {},
			onSlideAfter: function() {}
		};  

		var options = $.extend(defaults, option),

			currentPosition = 0,			//current position of the slideshow

			slides = $('.pxslide'),

			numberOfSlides = slides.length;		

		// Wrap all .slides with #slideInner div
		slides.wrapAll('<div id="slideInner"></div>')
				
		$('#slideInner').css('width', options.slideWidth * numberOfSlides);

		$('.slider')
			.prepend('<a href="#" class="pxcontrol" id="pxleftControl">left</a>')
			.append('<a href="#" class="pxcontrol" id="pxrightControl">right</a>');
 
		setNavigation(currentPosition);

		$('.pxcontrol').bind('click', function(){

			if( currentPosition >= 0 && currentPosition < numberOfSlides){

				var newposition = ($(this).attr('id')=='pxrightControl') ? currentPosition+1 : currentPosition-1;

				gotoslide( newposition );

			}
			
			return false;

		});

		$(document).keydown(function(e) {

			var code = (e.keyCode ? e.keyCode : e.which);

			if(code == 39 && (numberOfSlides - currentPosition) > 0){
				
				gotoslide( currentPosition+1 );

			}else if(code == 37 && currentPosition>0 ){
							
				gotoslide( currentPosition-1 );

			}

		});

		function gotoslide(position){

			if( position >= 0 && position < numberOfSlides){
				
				options.onSlideBefore();
				
				currentPosition = position;

				$('#slideInner').animate({

					'marginLeft' : options.slideWidth*(-currentPosition)

				}, 500, options.onSlideAfter );

				setNavigation(currentPosition);

			}
		}

		// setNavigation: Hides and shows controls depending on currentPosition
		function setNavigation(position){

			$('#pxleftControl').removeClass('disabled');
			$('#pxrightControl').removeClass('disabled');

			// Hide left arrow if position is first slide
			if(position == 0){ 

				$('#pxleftControl').addClass('disabled');

			}
			
			// Hide right arrow if position is last slide
			if(position == numberOfSlides-1){

				$('#pxrightControl').addClass('disabled'); 

			}
		}

	}

})(jQuery);