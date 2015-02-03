jquery.pxslider
===============

jquery really simple slideshow for learning porpouses

For a demo visit:

[http://oterox.synology.me/demos/jquery.pxslider/demo/](demo)

Written by: Javier Otero 

##Main Features
- Lightweight
- Optional pagination
- Circular
- Auto-scroll
- Events: onSlideBefore, onSlideAfter
- Public methods: goToSlide

##Installation

###Step 1: Link required files

First and most important, the jQuery library needs to be included (no need to download - link directly from Google). Next, download the package from this site and link the pxSlider CSS file (for the theme) and the pxSlider Javascript file.

```html
<!-- jQuery library (served from Google) -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<!-- pxSlider Javascript file -->
<script src="/js/jquery.pxslider.js"></script>
<!-- pxSlider CSS file -->
<link href="/lib/jquery.pxslider.css" rel="stylesheet" />
```

###Step 2: Create HTML markup

Create a `<div class="pxslider">` element, with a `<li>` for each slide. Slides can contain images, video, or any other HTML content!

```html
<div class="pxslider">
  <div><img src="/images/pic1.jpg" /></div>
  <div><img src="/images/pic2.jpg" /></div>
  <div><img src="/images/pic3.jpg" /></div>
  <div><img src="/images/pic4.jpg" /></div>
</div>
```

###Step 3: Call the pxSlider

Call .pxSlider() on `<div class="pxslider">`. Note that the call must be made inside of a $(document).ready() call, or the plugin will not work!

```javascript
$(document).ready(function(){
  $('.pxslider').pxSlider();
});
```
Sample call with parameters:
```javascript
	$('#home-slider').pxSlider({
	    slideWidth: 960,
	    speed: 500,
	    pagination: false,
		onSlideBefore: function( currentIndex ){
			console.log('starting animation... index before animation: ' + currentIndex );
		},
		onSlideAfter: function( currentIndex ){
			console.log('animation finished... index after animation: ' + currentIndex );
		}
	});
```

##Configuration options

###General

**mode**  
Type of transition between slides
```
default: 'horizontal'  
options: 'horizontal', 'vertical', 'fade'
```

**speed**  
Slide transition duration (in ms)
```
default: 500  
options: integer
```
				
**currentSlide**  
Current slide index
```
default: 0  
options: integer
```

**slideWidth**  
Slide width
```
default: 960  
options: integer
```

**slidesCount**  
Number of slides
```
default: 0  
options: integer
```

**slideStart (to-do)**  
Slide index that first shows
```
default: 0  
options: integer
```

**pagination**  
Shows the pagination controls
```
default: true  
options: boolean
```

**auto**  
Enables the slide auto scroll
```
default: false  
options: boolean
```

**autoTimer**  
Timer for the autoscroll
```
default: 6000  
options: integer
```

**effect (to-do)**  
Chooses the slide animation effect
```
default: scroll  
options: string
```

**circular**  
Makes the carousel infinite
```
default: false  
options: boolean
```

**prevButton**  
ID for the prev button
```
default: 'px-left'  
options: string
```

**nextButton**  
ID for the next button
```
default: 'px-right'  
options: string
```

**onSlideBefore**  
Event that fires Before the animation starts
```javascript
	$('#pxslider').pxSlider({
		onSlideBefore: function( currentIndex ){
			//do something
		}
	});
```

**onSlideAfter**  
Event that fires After the animation ends
```javascript
	$('#pxslider').pxSlider({
		onSlideAfter: function( currentIndex ){
			//do something
		}
	});
```

**onSlideLoaded**  
Event that fires After the slides are loaded
```javascript
	$('#pxslider').pxSlider({
		onSlideLoaded: function(){
			//do something
		}
	});
```
