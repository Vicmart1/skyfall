var max_horizontal_offset = 100;
var duration = 5;
var max_iterations = 1;
var animation_timing = 'cubic-bezier(.98,0,1,.5)';
var activated = false;

function animate(obj) {
  if(!obj.hasClass('.excluded')) {
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
    ++iterations <= max_iterations ? animate(obj) : 0;

    return iterations;
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
