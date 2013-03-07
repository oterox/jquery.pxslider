jquery.pxslider
===============

jquery really simple slideshow for learning porpouses

For complete documentation visit:

[http://pixellarydev.eu](http://pixellarydev.eu)

Written by: Javier Otero 


##Installation

###Step 1: Link required files

First and most important, the jQuery library needs to be included (no need to download - link directly from Google). Next, download the package from this site and link the pxSlider CSS file (for the theme) and the pxSlider Javascript file.

```html
<!-- jQuery library (served from Google) -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<!-- pxSlider Javascript file -->
<script src="/js/jquery.pxslider.min.js"></script>
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

Call .pxslider() on `<div class="pxslider">`. Note that the call must be made inside of a $(document).ready() call, or the plugin will not work!

```javascript
$(document).ready(function(){
  $('.pxslider').pxSlider();
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