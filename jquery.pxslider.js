(function($) {

	$.pxSlider = function(element, options) {
		var defaults = {
			speed: 500,
			currentSlide: 0,
			slideWidth: 960,
			slidesCount: 0,	
			slideStart: 0, //TO-DO
			pagination: true,
			auto: false,  //TO-DO
			effect: 'scroll', //TO-DO		
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
				.css({ 'width': plugin.settings.slideWidth  })	
				.prepend('<a href="#" class="px-control" id="px-left">prev</a>')
				.append('<a href="#" class="px-control" id="px-right">next</a>')

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

			$('.px-control', wrapper ).bind('click', function(){
				if( plugin.settings.currentSlide >= 0 && plugin.settings.currentSlide < plugin.settings.slidesCount){
					var newposition = ($(this).attr('id')=='px-right') ? plugin.settings.currentSlide+1 : plugin.settings.currentSlide-1;
					goToSlide( newposition );
				}
				return false;
			});
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
			$('#px-left', wrapper ).removeClass('disabled');
			$('#px-right', wrapper ).removeClass('disabled');
			// Hide left arrow if index is first slide
			if(index == 0){ 
				$('#px-left', wrapper).addClass('disabled');
			}

			// Hide right arrow if index is last slide
			if(index == plugin.settings.slidesCount-1){
				$('#px-right', wrapper).addClass('disabled'); 
			}

			// pager
			$('.px-thumb-box a', wrapper).removeClass('current');
			$('.px-thumb-box a[data-id='+index+']', wrapper ).addClass('current');
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
