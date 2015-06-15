var max_horizontal_offset = 100; //Determines how far left or right objects may travel//
var duration = 5; //For how long should the objects fall (affects speed)//
var max_iterations = 1; 
/**
Determines which divs will be affected. Divs who have max_iterations or less generations of div children will be animated 
   -setting this to 0 only animates divs with no div children
   -setting this to -1 animates every div
**/
var animation_timing = 'cubic-bezier(.98,0,1,.5)'; //Determines the style of animation timing//

var activated = false; //Do not modify//

function animate(obj) {
  if(!obj.hasClass('excluded')) {
    obj.css('-webkit-transition', 'top ' + duration + 's ' + animation_timing + ', left ' + duration + 's ease-in');
    obj.css('-moz-transition', 'top ' + duration + 's ' + animation_timing + ', left ' + duration + 's ease-in');
    obj.css('-ms-transition', 'top ' + duration + 's ' + animation_timing + ', left ' + duration + 's ease-in');
    obj.css('-o-transition', 'top ' + duration + 's ' + animation_timing + ', left ' + duration + 's ease-in');
    obj.css('transition', 'top ' + duration + 's ' + animation_timing + ', left ' + duration + 's ease-in');

	  obj.css('top', (obj.offset().top + ($('body').height() * ((Math.random() + 2) * 2))) + 'px');
    obj.css('left', ((Math.random() * max_horizontal_offset) - (max_horizontal_offset/2)) + 'px');
  }
}

function lockScroll(){
  $html = $('html');
  $body = $('body');
  var initWidth = $body.outerWidth();
  var initHeight = $body.outerHeight();

  var scrollPosition = [
    self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
    self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
  ];

  $html.data('scroll-position', scrollPosition);
  $html.data('previous-overflow', $html.css('overflow'));
  $html.css('overflow', 'hidden');
  window.scrollTo(scrollPosition[0], scrollPosition[1]);

  var marginR = $body.outerWidth()-initWidth;
  var marginB = $body.outerHeight()-initHeight;
  $body.css({'margin-right': marginR,'margin-bottom': marginB});
}

function iterateChildren(obj) {
  var iterations = 0;
  var current_iterations;

  if(!obj.has('div').length) {
    animate(obj);
    return 0;
  } else {
    obj.children('div').each(function () {
      iterations = Math.max(iterateChildren($(this)), iterations);
    });
    (++iterations <= max_iterations || max_iterations == -1) ? animate(obj) : 0;

    return iterations;
  }
}

function appendClass() {
    if(!activated) {
      activated = true;
      $('body').children('div').each(function () {
        iterateChildren($(this));
      });
      lockScroll();
    }
  }

$('.activate').click(
	function() {
    if(!activated) {
      activated = true;
      $('body').children('div').each(function () {
        iterateChildren($(this));
      });
      lockScroll();
    }
	}
);
